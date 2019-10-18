import base64
import datetime

from app.models import Post
from app.models import PostComment
from app.models import PostLike
from app.models import Trending
from app.models import UserActivityLog
from app.models import ViewCount
from django.contrib.auth.models import User
from django.core.files.storage import FileSystemStorage
from django.db.models import F
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from myprofile.models import UserDetail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
)

from . import models

now = datetime.datetime.now()


@api_view(['POST'])
def follow(request):
    user_id = request.data.get("local_id")
    data = ''
    user = User.objects.get(id=request.data.get("local_id"))
    row = models.Follow.objects.filter(follower=request.data.get("local_id"), followed=request.data.get("remote_id"))
    if row.exists():
        row.delete()
        data = False
    else:
        f = models.Follow(follower=User.objects.get(id=request.data.get("local_id")),
                          followed=User.objects.get(id=request.data.get("remote_id")))
        f.save()

        # # activity log update ======================================================
        # user_detail = UserDetail.objects.get(user_id=user_id)
        # if user_detail.isBusiness:
        #     user_activity = UserActivityLog(action="follow", post_category=user_detail.category, user_id=user_id,
        #                                     post_id=0)
        #     user_activity.save()
        # # end of activity log update ===============================================
        data = True
    return Response({"data": data}, status=HTTP_200_OK)


@api_view(['POST'])
def isFollowing(request):
    data = ""
    row = models.Follow.objects.filter(follower=request.data.get("local_id"), followed=request.data.get("remote_id"))
    if row.exists():
        data = True
    else:
        data = False
    print(request.data.get("remote_id"))
    return Response({"data": data}, status=HTTP_200_OK)


@api_view(['POST'])
def getPost(request):
    data = []
    user_id = request.data.get("userId")
    p = Post.objects.all()
    for item in p:
        is_liked = False
        like = PostLike.objects.filter(post_id=item.id, user_id=user_id)
        if like.exists():
            is_liked = True
        comment_set = []
        comments = item.postcomment_set.all()
        for comment in comments:
            comment_set.append({"comment": comment.comment, "username": comment.user.username})
        data.append({"id": item.id,
                     "caption": item.caption,
                     "content": item.content,
                     "date": item.date,
                     "likeCount": item.likes,
                     "commentCount": item.comments,
                     "username": item.user.username,
                     "fn": item.user.first_name,
                     "isLiked": is_liked,
                     "comments": comment_set,
                     "viewCount": item.viewCount})

        # ===================Trending Algorithm =============================
        post_uploaded_timestamp = float(item.date)
        now_timestamp = float(datetime.datetime.now().timestamp())
        one_day_timestamp = 86400
        time_elapsed = now_timestamp - post_uploaded_timestamp
        if item.isBusiness and time_elapsed <= one_day_timestamp:
            row = ViewCount.objects.filter(user_id=user_id, post_id=item.id)
            if not row.exists():
                view_count = ViewCount(user_id=user_id, post_id=item.id)
                view_count.save()
                Post.objects.filter(id=item.id).update(viewCount=F('viewCount') + 1)
                like_count = item.likes
                comment_count = item.comments
                view_count = item.viewCount + 1
                point = (view_count + (like_count * 1.25) + (comment_count * 1.50)) / time_elapsed

                trending_count = Trending.objects.all().count()
                # if trending_count > 50:
                #     Trending.objects.all().aggregate(Max('point')).delete()

                row = Trending.objects.filter(post_id=item.id)
                if row.exists():
                    row.update(point=point)
                else:
                    trending = Trending(point=point, post_id=item.id)
                    trending.save()

                if datetime.datetime.now().timestamp() > float(item.date)+86400:
                    Trending.objects.filter(post_id=item.id).delete()

    return Response({"posts": data}, status=HTTP_200_OK)

@api_view(['POST'])
def handleLike(request):
    user_id = request.data.get("userId")
    post_id = request.data.get("postId")
    data = ''
    row = PostLike.objects.filter(post_id=post_id, user_id=user_id)
    if row.exists():
        row.delete()
        Post.objects.filter(id=request.data.get("postId")).update(likes=F('likes') - 1)

        # activity log update =========================================================
        user_detail = UserDetail.objects.get(user_id=user_id)
        if user_detail.isBusiness:
            UserActivityLog.objects.get(action="like", user_id=user_id,
                                        post_id=post_id).delete()
        # end of activity log update ==================================================

        data = False
    else:
        p = PostLike(post_id=request.data.get("postId"), user_id=request.data.get("userId"))
        p.save()
        Post.objects.filter(id=request.data.get("postId")).update(likes=F('likes') + 1)

        # activity log update ======================================================
        user_detail = UserDetail.objects.get(user_id=user_id)
        if user_detail.isBusiness:
            user_activity = UserActivityLog(action="like", post_category=user_detail.category, user_id=user_id,
                                            post_id=post_id)
            user_activity.save()
        # end of activity log update ===============================================

        data = True

        # trending algorithm =======================================================
        item = Post.objects.get(id=post_id)
        post_uploaded_timestamp = float(item.date)
        now_timestamp = float(datetime.datetime.now().timestamp())
        one_day_timestamp = 86400
        time_elapsed = now_timestamp - post_uploaded_timestamp
        if item.isBusiness and time_elapsed <= one_day_timestamp:
            like_count = item.likes
            comment_count = item.comments
            view_count = item.viewCount
            point = (view_count + (like_count * 1.25) + (comment_count * 1.50)) / time_elapsed

            # trending_count = Trending.objects.all().count()
            # if trending_count > 50:
            #     Trending.objects.all().aggregate(Max('point')).delete()

            row = Trending.objects.filter(post_id=item.id)
            if row.exists():
                row.update(point=point)
            else:
                trending = Trending(point=point, post_id=item.id)
                trending.save()

            if datetime.datetime.now().timestamp() > float(item.date) + 86400:
                Trending.objects.filter(post_id=item.id).delete()

    # end of trending algorithm

    return Response({"data": data}, status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
def handleComment(request):
    user_id = request.data.get("userId")
    post_id = request.data.get("postId")
    p = PostComment(post_id=post_id, user_id=user_id,
                    comment=request.data.get("comment"), likes=0)
    p.save()
    Post.objects.filter(id=request.data.get("postId")).update(comments=F('comments') + 1)

    # activity log update ======================================================
    user_detail = UserDetail.objects.get(user_id=user_id)
    if user_detail.isBusiness:
        user_activity = UserActivityLog(action="comment", post_category=user_detail.category, user_id=user_id,
                                        post_id=post_id)
        user_activity.save()
    # end of activity log update ===============================================

    # trending algorithm =======================================================
    item = Post.objects.get(id=post_id)
    post_uploaded_timestamp = float(item.date)
    now_timestamp = float(datetime.datetime.now().timestamp())
    one_day_timestamp = 86400
    time_elapsed = now_timestamp - post_uploaded_timestamp
    if item.isBusiness and time_elapsed <= one_day_timestamp:
        like_count = item.likes
        comment_count = item.comments
        view_count = item.viewCount
        point = (view_count + (like_count * 1.25) + (comment_count * 1.50)) / time_elapsed

        # trending_count = Trending.objects.all().count()
        # if trending_count > 50:
        #     Trending.objects.all().aggregate(Max('point')).delete()

        row = Trending.objects.filter(post_id=item.id)
        if row.exists():
            row.update(point=point)
        else:
            trending = Trending(point=point, post_id=item.id)
            trending.save()

        if datetime.datetime.now().timestamp() > float(item.date) + 86400:
            Trending.objects.filter(post_id=item.id).delete()

    return Response(status=HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
def file_upload(request):
    is_business = False
    user_id = request.data.get("userId")
    caption = request.data.get("caption")
    file = request.FILES["file"]
    file_name = ''
    fs = FileSystemStorage()
    if fs.exists(file.name):
        name = fs.get_available_name(file.name)
        fs.save(name, file)
        file_name = name
    else:
        fs.save(file.name, file)
        file_name = file.name

    if file.name.endswith('.mp4'):
        img_data = base64.b64decode(request.data.get("thumb"))
        new_filename = 'media/thumbnails/' + file_name.replace("mp4", "png")
        with open(new_filename, 'wb') as f:
            f.write(img_data)

        UserDetail.objects.get(user_id=user_id)
        if UserDetail.isBusiness:
            is_business = True

    p = Post(user_id=user_id, caption=caption, content=file_name, likes=0, comments=0,
             date=datetime.datetime.now().timestamp(), isBusiness=is_business)
    p.save()
    return Response(status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
def postUpload(request):
    user_id = request.data.get("user_id")
    caption = request.data.get("caption")
    file_name = request.data.get("fileName")
    p = Post(userId=user_id, caption=caption, content=file_name, likes=0, comments=0,
             date=now.strftime("%Y-%m-%d %H:%M:%S"))
    p.save()
    return Response(status=HTTP_200_OK)


@api_view(['POST'])
def get_follower(request):
    data = []
    user_id = request.data.get("userId")
    row = models.Follow.objects.filter(followed=user_id)
    if row.exists():
        for item in row:
            user_detail = UserDetail.objects.get(user_id=item.follower.id)
            if user_detail.file_name != "":
                pp = user_detail.file_name
            else:
                pp = "default_profile.png"
            data.append({"id": item.follower_id, "name": item.follower.first_name, "username": item.follower.username,
                         "pp": pp})
    else:
        data = ""
    return Response({"data": data}, status=HTTP_200_OK)


@api_view(['POST'])
def get_following(request):
    data = []
    user_id = request.data.get("userId")
    row = models.Follow.objects.filter(follower=user_id)
    if row.exists():
        for item in row:
            user_detail = UserDetail.objects.get(user_id=item.followed.id)
            if user_detail.file_name != "":
                pp = user_detail.file_name
            else:
                pp = "default_profile.png"
            data.append({"id": item.followed_id, "name": item.followed.first_name, "username": item.followed.username,
                         "pp": pp})
    else:
        data = ""
    return Response({"data": data}, status=HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def search_key(request):
    key = request.data.get("search_key")
    data = []
    if key != "":
        if key is not None:
            try:
                users = User.objects.filter(username__contains=key)
            except User.DoesNotExist:
                users = None

            if users is not None:
                for user in users:
                    data.append({'username': user.username, 'fn': user.first_name, 'id': user.id})

    return Response({"data": data}, status=HTTP_200_OK)

@csrf_exempt
@api_view(["GET"])
def get_user_data(request):
    user = UserDetail.objects.get(id=request.user.id)
    return Response({"file_name": user.file_name}, status=HTTP_200_OK)