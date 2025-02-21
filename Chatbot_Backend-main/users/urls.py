from django.urls import path
from .views import LoginView, RegisterView,UserProfileView,PasswordResetView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),

]
