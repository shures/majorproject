from django.urls import path
from . import views


urlpatterns = [
    path("uploadPP", views.uploadPP),
    path("editProfile", views.edit_profile),
    path("getProfile", views.get_profile),

]