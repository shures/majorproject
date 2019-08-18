from django.urls import path
from . import views


urlpatterns = [
    path("follow", views.follow),
    path("isFollowing", views.isFollowing),
    path("getFollowers", views.getFollowers),
    path("getPost", views.getPost),
    path('handleLike', views.handleLike),
    path('handleComment', views.handleComment),
    path("fileupload", views.file_upload),
    path("postUpload", views.postUpload),
]