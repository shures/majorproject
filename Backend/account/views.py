from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
    HTTP_203_NON_AUTHORITATIVE_INFORMATION,
)
from rest_framework.response import Response
from django.contrib.auth.models import User
from emailverifier import Client
from emailverifier import exceptions
import nexmo
import random
import datetime
from account.models import Verify
from django.core.mail import send_mail
from myprofile.models import UserDetail
from app.models import BusinessCategory
now = datetime.datetime.now()


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def verifyAccount(request):
    email = request.data.get("email")
    code = request.data.get("code")
    user = User.objects.filter(email=email, last_name=code).update(last_name="0000")
    if user >= 1:
        user = User.objects.filter(email=email)
        for item in user:
            user_detail = UserDetail(user_id=item.id, file_name='', addr="", quote1="", quote2="", quote3="", site="")
            user_detail.save()
        return Response({"success": ""}, HTTP_200_OK)
    else:
        return Response({"fail": "can not update"})

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if email is None or password is None:
        return Response(status=HTTP_204_NO_CONTENT)
    user = authenticate(username=email, password=password)
    if not user:
        return Response(status=HTTP_203_NON_AUTHORITATIVE_INFORMATION)
    token, _ = Token.objects.get_or_create(user=user)
    request.session['user_id'] = user.id
    return Response({'token': token.key, 'username': user.username, 'fn': user.first_name, 'id': user.id}, status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def sign_up(request):
    error = []
    email = request.data.get("email")
    password = request.data.get("password")
    full_name = request.data.get("fullName")
    username = request.data.get("username")

    verification_code = ''
    if not validateFullName(full_name):
        error.append("* full name must be >5 characters !")
    else:
        if not validatePassword(password):
            error.append("* something wrong with password")
        else:
            if not validateUsername(username):
                error.append("* Username is not valid or already exits !")
            else:
                message = validateEmail(email)
                if not message.isdigit() and not len(message) == 4:
                    error.append(message)
                else:
                    verification_code = message
    if len(error) < 1:
        print("success here.....")
        user = User.objects.create_user(email=email, first_name=full_name, last_name=verification_code,
                                        username=username, password=password)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"email": email}, status=HTTP_200_OK)
    else:
        return Response({"error": error}, status=HTTP_200_OK)

def validateEmail(email):
    print("i am email")
    if len(email) == 10 and email.isdigit():
        print("phone")
        return validatePhone(email)
    else:
        client = Client('at_mMeTEJCIsEHnsAhHHp93G5JCG2aLR')
        data = ''
        try:
            data = client.get(email)
        except exceptions.HttpException:
            # If you get here, it means service returned HTTP error code
            pass
        except exceptions.GeneralException:
            # If you get here, it means you cannot connect to the service
            pass
        except exceptions.UndefinedVariableException:
            # If you get here, it means you forgot to specify the API key
            pass
        except exceptions.InvalidArgumentException:
            # If you get here, it means you specified invalid argument
            # (options should be a dictionary)
            pass
        except:
            pass
        if data != '':
            # print("Email address: " + data.email_address)
            # print("Format: " + str(data.format_check))
            # print("DNS: " + str(data.dns_check))
            # print("SMTP: " + str(data.smtp_check))
            # print("Catch all: " + str(data.catch_all_check))
            # print("Disposable: " + str(data.disposable_check))
            # print("Free: " + str(data.free_check))
            # print("Last audit date: " + str(data.audit.audit_updated_date))

            User.objects.filter(email=email).exclude(last_name="0000").delete()
            row = User.objects.filter(email=email, last_name="0000")
            if not row.exists():
                verification_code = str(random.randint(1, 9999))
                send_mail(
                    'Verification',
                    'Please verify your account with this code' + verification_code,
                    'shures.nepali@gmail.com',
                    [email],
                    fail_silently=False,
                )
                return verification_code
            else:
                return "*email already exists !!"
        else:
            return "*email is not valid"

def validatePassword(password):
    if 8 <= len(password) <= 50:
        return True

def validateFullName(full_name):
    if 5 <= len(full_name) <= 20:
        return True

def validateUsername(username):
    if 5 <= len(username) <= 20:
        is_space = False
        if ' ' in username:
            is_space = True
        else:
            is_space = False
        if is_space is False:
            row = User.objects.filter(username=username)
            if not row.exists():
                return True

def validatePhone(email):
    print("i am on phone")
    User.objects.filter(email=email).exclude(last_name="0000").delete()
    row = User.objects.filter(email=email, last_name="0000")
    if not row.exists():
        verification_code = str(random.randint(1, 9999))
        client = nexmo.Client(key='081c7a33', secret='MzjB8RFZMgCf1M0a')
        response = client.send_message({
                'from': 'Tasbiralaya',
                'to': '977'+email,
                'text': 'your verification code is' + verification_code
        })
        response = response['messages'][0]
        if response['status'] == '0':
            return verification_code
        else:
            return "*phone number not valid !!"
    else:
        return "*Phone number already in use !!"
        # https: // www.nexmo.com / blog / 2017 / 06 / 22 / send - sms - messages - python - flask - dr /

@csrf_exempt
@api_view(["POST"])
def switch_to_business(request):
    user_id = request.data.get("userId")
    category = request.data.get("category")
    print(category)
    name = request.data.get("name")
    username = request.data.get("username")
    user = User.objects.filter(id=user_id).update(first_name=name, username=username)
    UserDetail.objects.filter(user_id=user_id).update(isBusiness=1, category=category)
    return Response(status=HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
def getCategory(request):
    data = []
    user_id = request.data.get("userId")
    category = BusinessCategory.objects.all()
    for item in category:
        data.append({"id": item.id, "category": item.category})
    return Response({"data": data}, status=HTTP_200_OK)