from .views import ChatListCreateAPIView, ChatDetailAPIView
from django.urls import path

urlpatterns = [
   path('', ChatListCreateAPIView.as_view(), name='chat_list_create'),  # Replace 'chat_list_create' with your API endpoint name
   path('<int:pk>/', ChatDetailAPIView.as_view(), name='chat_detail'),
       # Replace 'chat_detail' with your API endpoint name


]
