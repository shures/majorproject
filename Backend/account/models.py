from django.db import models

class Verify(models.Model):
    email = models.EmailField()
    verification_code = models.CharField(max_length=5)