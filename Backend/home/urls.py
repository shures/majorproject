from django.urls import path
from . import views


urlpatterns = [
    path("search_key", views.search_key),
    path("getUserDetails", views.get_user_data),
]