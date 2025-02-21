from .views import MessageCreateAPIView
from django.urls import path

urlpatterns = [
    path('', MessageCreateAPIView.as_view(), name='messages'),
    # Add more URL patterns as needed for other API endpoints


]
