from django.db import models
from django.contrib.auth.models import User


class Application(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=2000)
    version = models.CharField(max_length=255, default='0.1')
    image_src = models.CharField(max_length=400, default='https://www.kindpng.com/picc/m/80-802054_ios-7-contacts-app'
                                                         '-icon-iphone-camera-roll.png')
    is_game = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)





