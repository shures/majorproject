from django.urls import path
from . import views

urlpatterns = [
    path("login", views.login),
    path("signUp", views.sign_up),
    path("verifyAccount", views.verifyAccount),
    path("switchToBusiness", views.switch_to_business),
    path("getCategory", views.getCategory),

]