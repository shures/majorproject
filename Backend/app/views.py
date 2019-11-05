import base64
import datetime
from app.models import Post
from app.models import PostComment
from app.models import PostLike
from app.models import Trending
from app.models import UserActivityLog
from app.models import ViewCount
from app.models import SearchHistory
from app.models import Follow
from app.models import ViewCount
from app.models import PostSave
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
    request.session['abc'] = "hello"
    data = []
    user_id = request.data.get("userId")
    # p = Post.objects.all()
    f = Follow.objects.filter(follower_id=user_id)
    for user in f:
        p = Post.objects.filter(user_id=user.followed.id).order_by("-id")
        for item in p:
            is_liked = False
            like = PostLike.objects.filter(post_id=item.id, user_id=user_id)
            if like.exists():
                is_liked = True
            comment_set = []
            comments = item.postcomment_set.all()
            for comment in comments:
                comment_set.append({"comment": comment.comment, "username": comment.user.username})

            user_detail = UserDetail.objects.get(user_id=item.user.id)
            pp = ''
            if user_detail.file_name != "":
                pp = user_detail.file_name
                print(pp)

            time = 0
            post_uploaded_timestamp = float(item.date)
            now_timestamp = float(datetime.datetime.now().timestamp())
            time_elapsed = now_timestamp - post_uploaded_timestamp
            if time_elapsed < 60:
                time = str(int(time_elapsed)) + " " + "seconds ago"
            elif 60 < time_elapsed < 3600:
                time = str(int(time_elapsed / 60)) + " " + "minutes ago"
            elif 3600 < time_elapsed < 84600:
                time = str(int((time_elapsed / 60) / 60)) + " " + "hours ago"
            elif time_elapsed > 84600:
                time = str(int(((time_elapsed / 60) / 60) / 24)) + " " + "days ago"
            # compare the id with the id of last item in data
            data.append({"id": item.id,
                         "caption": item.caption,
                         "content": item.content,
                         "date": time,
                         "likeCount": item.likes,
                         "commentCount": item.comments,
                         "username": item.user.username,
                         "fn": item.user.first_name,
                         "isLiked": is_liked,
                         "comments": comment_set,
                         "viewCount": item.viewCount,
                         "isBusiness": item.isBusiness,
                         "pp": pp,
                         "addr": user_detail.addr})

            row = ViewCount.objects.filter(user_id=user_id, post_id=item.id)
            if not row.exists() and item.isBusiness:
                view_count = ViewCount(user_id=user_id, post_id=item.id)
                view_count.save()
                Post.objects.filter(id=item.id).update(viewCount=F('viewCount') + 1)

            # ===================Trending Algorithm =============================
            post_uploaded_timestamp = float(item.date)
            now_timestamp = float(datetime.datetime.now().timestamp())
            one_day_timestamp = 86400
            time_elapsed = now_timestamp - post_uploaded_timestamp
            if item.isBusiness and time_elapsed <= one_day_timestamp:
                like_count = item.likes
                comment_count = item.comments
                view_count = item.viewCount + 1
                point = (view_count + (like_count * 1.25) + (comment_count * 1.50)) / time_elapsed

                # trending_count = Trending.objects.all().count()
                # if trending_count > 50:
                #     Trending.objects.all().aggregate(Max('point')).delete()

                row = Trending.objects.filter(post_id=item.id)
                if row.exists():
                    row.update(point=point)

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

        data = False
    else:
        p = PostLike(post_id=request.data.get("postId"), user_id=request.data.get("userId"))
        p.save()
        Post.objects.filter(id=request.data.get("postId")).update(likes=F('likes') + 1)

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

    return Response({"data": user_id}, status=HTTP_200_OK)


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
    trending = Trending(point=0, post_id=p.id)
    trending.save()
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
    userId = request.data.get("userId")
    print(userId)
    data = []
    if key != "":
        if key is not None:
            try:
                users = User.objects.filter(username__contains=key)
            except User.DoesNotExist:
                users = None
            if users is not None:
                for user in users:
                    isAlready = SearchHistory.objects.filter(user_id=userId, search_user_id=user.id)
                    if not isAlready.exists():
                        a = UserDetail.objects.get(user_id=user.id)
                        if a.isBusiness:
                            b = SearchHistory(user_id=userId, search_user_id=user.id)
                            b.save()
                    data.append({'username': user.username, 'fn': user.first_name, 'id': user.id})

    return Response({"data": data}, status=HTTP_200_OK)


@csrf_exempt
@api_view(["GET"])
def get_user_data(request):
    user = UserDetail.objects.get(id=request.user.id)
    return Response({"file_name": user.file_name}, status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
def trending(request):
    print("trending")
    p = Trending.objects.exclude(point=0).order_by("-point")
    data = []
    tn = 1
    for item in p:
        time = 0
        post_uploaded_timestamp = float(item.post.date)
        now_timestamp = float(datetime.datetime.now().timestamp())
        time_elapsed = now_timestamp - post_uploaded_timestamp
        if time_elapsed < 60:
            time = str(int(time_elapsed)) + " " + "seconds ago"
        elif 60 < time_elapsed < 3600:
            time = str(int(time_elapsed / 60)) + " " + "minutes ago"
        elif 3600 < time_elapsed < 84600:
            time = str(int((time_elapsed / 60) / 60)) + " " + "hours ago"
        elif time_elapsed > 84600:
            Trending.objects.filter(id=item.id).delete()
            continue
        print(item.point)
        print(tn)
        data.append({"id": item.post.id,
                     "caption": item.post.caption,
                     "content": item.post.content,
                     "date": time,
                     "likeCount": item.post.likes,
                     "commentCount": item.post.comments,
                     "username": item.post.user.username,
                     "fn": item.post.user.first_name,
                     "tn": tn})
        tn = tn + 1
    return Response({"posts": data}, status=HTTP_200_OK)


@api_view(['POST'])
def getPostItem(request):
    user_id = request.data.get("userId")
    post_id = request.data.get("postId")
    item = Post.objects.get(id=post_id)
    is_liked = False
    like = PostLike.objects.filter(post_id=item.id, user_id=user_id)
    if like.exists():
        is_liked = True
    comment_set = []
    comments = item.postcomment_set.all()
    for comment in comments:
        comment_set.append({"comment": comment.comment, "username": comment.user.username})
    return Response({"id": item.id,
                     "caption": item.caption,
                     "content": item.content,
                     "date": item.date,
                     "likeCount": item.likes,
                     "commentCount": item.comments,
                     "username": item.user.username,
                     "fn": item.user.first_name,
                     "isLiked": is_liked,
                     "comments": comment_set,
                     "viewCount": item.viewCount}, status=HTTP_200_OK)


@api_view(['POST'])
def sugg(request):
    # get suggestions from like comment view follow and search history
    user_id = request.data.get("userId")
    data = []

    # get suggestions from like
    like_categories = []
    likes = PostLike.objects.filter(user_id=user_id).order_by('-id')[:5]
    for item in likes:
        user_detail = True
        try:
            user = UserDetail.objects.get(user_id=item.post.user_id, isBusiness=True)
        except UserDetail.DoesNotExist:
            user_detail = False
        if user_detail:
            like_categories.append(user.category)
    if len(like_categories) > 0:
        get_users(like_categories, user_id, data)

    # get suggestions from  Comment
    comment_categories = []
    comments = PostComment.objects.filter(user_id=user_id).order_by('-id')[:5]
    for item in comments:
        user_detail = True
        try:
            user = UserDetail.objects.get(user_id=item.post.user_id, isBusiness=True)
        except UserDetail.DoesNotExist:
            user_detail = False
        if user_detail:
            comment_categories.append(user.category)
    if len(comment_categories) > 0:
        get_users(comment_categories, user_id, data)

    # get suggestions from follow
    follow_categories = []
    followed_id = Follow.objects.filter(follower_id=user_id)
    user_detail = True
    for item in followed_id:
        try:
            user = UserDetail.objects.get(user_id=item.followed.id, isBusiness=True)
        except UserDetail.DoesNotExist:
            user_detail = False
        if user_detail:
            follow_categories.append(user.category)
    if len(follow_categories) > 0:
        get_users(follow_categories, user_id, data)

    # get suggestions from searchHistory
    search_categories = []
    searched_id = SearchHistory.objects.filter(user_id=user_id)
    user_detail = True
    for item in searched_id:
        try:
            user = UserDetail.objects.get(user_id=item.search_user.id, isBusiness=True)
        except UserDetail.DoesNotExist:
            user_detail = False
        if user_detail:
            search_categories.append(user.category)
    if len(search_categories) > 0:
        get_users(search_categories, user_id, data)

        # get suggestions from  Veiw
        view_categories = []
        views = ViewCount.objects.filter(user_id=user_id).order_by('-id')[:5]
        for item in views:
            user_detail = True
            try:
                user = UserDetail.objects.get(user_id=item.post.user_id, isBusiness=True)
            except UserDetail.DoesNotExist:
                user_detail = False
            if user_detail:
                view_categories.append(user.category)
        if len(view_categories) > 0:
            get_users(view_categories, user_id, data)
    return Response({"data": data}, status=HTTP_200_OK)


def get_users(categories, user_id, data):
    users = UserDetail.objects.filter(isBusiness=True, category=most_frequent(categories)).order_by("-id")[:3]
    for user in users:
        try:
            follow_check = Follow.objects.get(followed_id=user.user_id, follower_id=user_id)
        except Follow.DoesNotExist:
            follow_check = None
        if follow_check is None:
            if not {"id": user.user.id, "username": user.user.username, "name": user.user.first_name,
                    "pp": user.file_name,
                    "addr": user.addr} in data:
                data.append({"id": user.user.id, "username": user.user.username, "name": user.user.first_name,
                             "pp": user.file_name,
                             "addr": user.addr})


def most_frequent(List):
    counter = 0
    num = List[0]
    for i in List:
        curr_frequency = List.count(i)
        if curr_frequency > counter:
            counter = curr_frequency
            num = i
    return num


@api_view(['POST'])
def getMyPost(request):
    data = []
    user_id = request.data.get("userId")
    p = Post.objects.filter(user_id=user_id)
    for item in p:
        time = 0
        post_uploaded_timestamp = float(item.date)
        now_timestamp = float(datetime.datetime.now().timestamp())
        time_elapsed = now_timestamp - post_uploaded_timestamp
        if time_elapsed < 60:
            time = str(int(time_elapsed)) + " " + "seconds ago"
        elif 60 < time_elapsed < 3600:
            time = str(int(time_elapsed / 60)) + " " + "minutes ago"
        elif 3600 < time_elapsed < 84600:
            time = str(int((time_elapsed / 60) / 60)) + " " + "hours ago"
        data.append({"id": item.id,
                     "caption": item.caption,
                     "content": item.content,
                     "date": time,
                     "likeCount": item.likes,
                     "commentCount": item.comments})

    return Response({"data": data}, status=HTTP_200_OK)


@api_view(['POST'])
def getMySaved(request):
    data = []
    user_id = request.data.get("userId")
    print(user_id)
    p = PostSave.objects.filter(user_id=user_id)
    for item in p:
        data.append({"id": item.post.id,
                     "caption": item.post.caption,
                     "content": item.post.content,
                     "likeCount": item.post.likes,
                     "commentCount": item.post.comments})

    return Response({"data": data}, status=HTTP_200_OK)


@api_view(['POST'])
def savePost(request):
    user_id = request.data.get("userId")
    post_id = request.data.get("postId")
    p = PostSave(post_id=post_id, user_id=user_id)
    p.save()
    return Response({"data": " "}, status=HTTP_200_OK)


@api_view(['POST'])
def pollLike(request):
    noData = False
    try:
        l = PostLike.objects.latest('id')
    except PostComment.DoesNotExist:
        noData = True
    if noData:
        return Response(status=HTTP_200_OK)
    else:
        return Response({"like": l.id, "likeCount": l.post.likes,
                     "likePostId": l.post.id}, status=HTTP_200_OK)

@api_view(['POST'])
def pollComment(request):
    noData = False
    try:
        c = PostComment.objects.latest('id')
    except PostComment.DoesNotExist:
        noData = True
    if noData:
        return Response(status=HTTP_200_OK)
    else:
        return Response({"comment": c.id, "commentCount": c.post.comments,
                     "commentPostId": c.post.id, "commentText": c.comment, "username": c.user.username}, status=HTTP_200_OK)
