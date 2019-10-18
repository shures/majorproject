from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.files.storage import FileSystemStorage
from .models import UserDetail


@csrf_exempt
@api_view(["POST"])
def uploadPP(request):
    file_name = ''
    file = request.FILES["file"]
    user_id = request.data.get("userId")
    fs = FileSystemStorage()
    fs.save(file.name, file)

    if fs.exists(file.name):
        name = fs.get_available_name(file.name)
        fs.save(name, file)
        file_name = name
    else:
        fs.save(file.name, file)
        file_name = file.name

    UserDetail.objects.filter(user_id=user_id).update(file_name=file_name)
    return Response(status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
def edit_profile(request):
    user_id = request.data.get("userId")
    addr = request.data.get("addr")
    quote1 = request.data.get("quote1")
    quote2 = request.data.get("quote2")
    quote3 = request.data.get("quote3")
    site = request.data.get("site")

    UserDetail.objects.filter(user_id=user_id).update(addr=addr, quote1=quote1, quote2=quote2, quote3=quote3, site=site)
    return Response(status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
def get_profile(request):
    data = {}
    user_id = request.data.get("userId")
    # origin = request.data.get("from")
    # if origin == "userProfile":
    #     user = User.objects.filter(id=user_id)
    #     for item in user:
    #         data["name"] = item.first_name
    #         data["username"] = item.username

    user_detail = UserDetail.objects.filter(user_id=user_id)
    for item in user_detail:
        data["addr"] = item.addr,
        data["quote1"] = item.quote1,
        data["quote2"] = item.quote2,
        data["quote3"] = item.quote3,
        data["site"] = item.site,
        data["profilePic"] = item.file_name
    return Response({"data": data}, status=HTTP_200_OK)
