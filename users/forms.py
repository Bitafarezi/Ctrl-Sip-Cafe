from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser, UserProfile

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('phone_number',)

class UserProfileCreationForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'display_name', 'email', 'image')