from django.db import models

# Create your models here.
class Song(models.Model):
    name = models.CharField(max_length=50)
    duration =  models.FloatField()
    album_image = models.ImageField(upload_to="images/", null=True, blank=True)
    isfavourite = models.BooleanField(default=False)
    album_song = models.FileField(upload_to="audio/")
