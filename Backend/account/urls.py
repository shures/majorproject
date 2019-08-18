from django.urls import path
from . import views

urlpatterns = [
    path("login", views.login),
    path("signUp", views.sign_up),
    path("verifyAccount", views.verifyAccount),

]