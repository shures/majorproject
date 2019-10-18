from django.urls import path
from . import views


urlpatterns = [
    path("follow", views.follow),
    path("isFollowing", views.isFollowing),
    path("get_follower", views.get_follower),
    path("get_following", views.get_following),
    path("getPost", views.getPost),
    path('handleLike', views.handleLike),
    path('handleComment', views.handleComment),
    path("fileupload", views.file_upload),
    path("postUpload", views.postUpload),
    path("search_key", views.search_key),
    path("getUserDetails", views.get_user_data),
]