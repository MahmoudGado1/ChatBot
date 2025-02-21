from django.shortcuts import render
from .serializers import MessageSerializer
from rest_framework import generics, permissions
from .models import Message
from django.shortcuts import render
from .serializers import MessageSerializer
from rest_framework import generics, permissions
from .models import Message



class MessageCreateAPIView(generics.CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        question = serializer.validated_data['question']
        user = self.request.user
        
        # hanlde model
       
        

        ai_reply = 'دا هي الرد علي السؤال حسام الجنايني'
        print(ai_reply)
        serializer.save(response=ai_reply)