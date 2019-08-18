from django.db import models
from django.contrib.auth.models import User


class UserDetail(models.Model):
    user = models.ForeignKey(User, on_delete=None)
    file_name = models.CharField(max_length=50)
    addr = models.CharField(max_length=50)
    quote1 = models.CharField(max_length=255)
    quote2 = models.CharField(max_length=255)
    quote3 = models.CharField(max_length=255)
    site = models.CharField(max_length=50)
