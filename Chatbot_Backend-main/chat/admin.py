from django.contrib import admin
from .views import Chat
from message.models import Message


class MessageTabularInlineAdmin(admin.TabularInline):
    model = Message
    extra = 1


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    inlines = [MessageTabularInlineAdmin]