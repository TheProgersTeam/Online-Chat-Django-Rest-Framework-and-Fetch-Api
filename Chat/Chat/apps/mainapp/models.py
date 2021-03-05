from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    message_text = models.CharField(max_length=50, null=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, db_index=True)
