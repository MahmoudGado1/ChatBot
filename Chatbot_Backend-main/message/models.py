from django.db import models


class Message(models.Model):
    chat = models.ForeignKey('chat.Chat', on_delete=models.CASCADE, related_name='messages')
    question = models.TextField(max_length=8000, blank=True)  
    response = models.TextField(max_length=8000, null=True, blank=False)

    def __str__(self) -> str:
        return self.chat.name + ' ' + self.question
    


