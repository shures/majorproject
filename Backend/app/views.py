from .models import Follow
from app.models import PostLike
from app.models import PostComment
from django.db.models import F
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import base64
import filetype
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
    HTTP_203_NON_AUTHORITATIVE_INFORMATION,
)
from rest_framework.response import Response
from django.core.files.storage import FileSystemStorage
from app.models import Post
import datetime
import os
import random
from django.contrib.auth.models import User
from app.models import PostLike
now = datetime.datetime.now()


@api_view(['POST'])
def follow(request):
    data = ''
    row = Follow.objects.filter(follower=request.data.get("local_id"), followed=request.data.get("remote_id"))
    if row.exists():
        row.delete()
        data = False
    else:
        f = Follow(follower=request.data.get("local_id"), followed=request.data.get("remote_id"))
        f.save()
        data = True
    return Response({"data": data}, status=HTTP_200_OK)


@api_view(['POST'])
def isFollowing(request):
    data = ""
    row = Follow.objects.filter(follower=request.data.get("local_id"), followed=request.data.get("remote_id"))
    if row.exists():
        data = True
    else:
        data = False
    print(request.data.get("remote_id"))
    return Response({"data": data}, status=HTTP_200_OK)


@api_view(['POST'])
def getFollowers(request):

    row = Follow.objects.filter(followed=request.data.get("userId"))
    if row.exists():
        data = False
    else:

        data = True
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
                      "comments": comment_set})

    return Response({"posts": data}, status=HTTP_200_OK)


@api_view(['POST'])
def handleLike(request):
    data = ''
    row = PostLike.objects.filter(post_id=request.data.get("postId"), user_id=request.data.get("userId"))
    if row.exists():
        row.delete()
        Post.objects.filter(id=request.data.get("postId")).update(likes=F('likes') - 1)
        data = False
    else:
        p = PostLike(post_id=request.data.get("postId"), user_id=request.data.get("userId"))
        p.save()
        Post.objects.filter(id=request.data.get("postId")).update(likes=F('likes') + 1)
        data = True
    return Response({"data": data}, status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
def handleComment(request):
    p = PostComment(post_id=request.data.get("postId"), user_id=request.data.get("userId"), comment=request.data.get("comment"), likes=0)
    p.save()
    Post.objects.filter(id=request.data.get("postId")).update(comments=F('comments') + 1)
    return Response(status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
def file_upload(request):
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
        new_filename = 'media/thumbnails/'+file_name.replace("mp4", "png")
        with open(new_filename, 'wb') as f:
            f.write(img_data)

    p = Post(user_id=user_id, caption=caption, content=file_name, likes=0, comments=0, date=now.strftime("%Y-%m-%d %H:%M"))
    p.save()
    return Response(status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
def postUpload(request):
    user_id = request.data.get("user_id")
    caption = request.data.get("caption")
    file_name = request.data.get("fileName")
    p = Post(userId=user_id, caption=caption, content=file_name, likes=0, comments=0, date=now.strftime("%Y-%m-%d %H:%M"))
    p.save()
    return Response(status=HTTP_200_OK)
