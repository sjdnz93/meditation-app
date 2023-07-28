from django.db import models

# Create your models here.

class Meditation(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    genre = models.CharField(max_length=10)
    length = models.CharField(max_length=10)
    thumbnail = models.URLField()
    url = models.URLField()
    owner = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='videos'
    )