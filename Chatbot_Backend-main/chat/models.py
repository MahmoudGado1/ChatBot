from django.db import models

class Chat(models.Model):
    TYPE = [
        ('type_1', 'Type_1'),
        ('type_2', 'Type_2'),
        ('type_3', 'Type_3'),
        ('type_4', 'Type_4'),
    ]
    user = models.ForeignKey("users.User", related_name="user1_chats", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    type = models.CharField(max_length=50,choices=TYPE)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.name