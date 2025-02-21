from django.shortcuts import render
from .serializers import ChatSerializer,ChatDetailsSerializer
from .models import Chat
from rest_framework import generics, permissions, parsers


class ChatListCreateAPIView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Chat.objects.filter(user=user)


class ChatDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatDetailsSerializer 
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Chat.objects.filter(user=user)