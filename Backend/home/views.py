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
from myprofile.models import UserDetail


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