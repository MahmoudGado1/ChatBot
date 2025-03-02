from rest_framework import serializers
from .models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    
    def validate_email(self, value):
        user = User.objects.filter(email=value).first()
        if not user:
            raise serializers.ValidationError("User with this email does not exist")
        return value
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid password")
        token, created = Token.objects.get_or_create(user=user)
        
        data['user'] = user
        data['token'] = token
        
        return data
    
    
    
    
    
class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(max_length=128, write_only=True)
    password2 = serializers.CharField(max_length=128, write_only=True)
    
    class Meta:
        model = User
        fields = ['first_name','last_name','email', 'password1', 'password2']


    def validate_email(self, value):
        user = User.objects.filter(email=value).first()
        if user:
            raise serializers.ValidationError("User with this email already exists")
        return value

    
    def validate(self, data):
        password1 = data.get('password1')
        password2 = data.get('password2')
        
        if password1 != password2:
            raise serializers.ValidationError("Passwords do not match")
        
        return data
    
    
    def create(self, validated_data):
        user = User.objects.create(
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            email=validated_data.get('email')
        )
            
        user.set_password(validated_data.get('password2'))
        user.save()
        
        token, created = Token.objects.get_or_create(user=user)
        
        validated_data['user'] = user
        validated_data['token'] = token
        
        return validated_data
        


class UserSrializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'first_name', 'last_name',"email"]
        read_only_fields = ['email',]


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    old_password = serializers.CharField(max_length=150)
    new_password = serializers.CharField(max_length=150)
    confirm_new_password = serializers.CharField(max_length=150)
    
    def validate(self, data):
        email = data.get('email')
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        confirm_new_password = data.get('confirm_new_password')

        request = self.context.get('request')
        curr_user = request.user if request and request.user.is_authenticated else None

        # Check if user with this email exists
        user = User.objects.filter(email=email).first()
        if not user:
            raise serializers.ValidationError({ "email": ["User with this email does not exist"] })

        # Ensure the logged-in user is the same as the one changing the password
        if not curr_user or user != curr_user:
            raise serializers.ValidationError({ "authorization": ["You are not authorized to perform this action"] })

        # Check old password correctly
        if not user.check_password(old_password):
            raise serializers.ValidationError({ "old_password": ["Invalid old password"] })

        # Check new password confirmation
        if new_password != confirm_new_password:
            raise serializers.ValidationError({ "confirm_new_password": ["New password and confirm password do not match"] })

        # Update password
        user.set_password(confirm_new_password)
        user.save()

        return data