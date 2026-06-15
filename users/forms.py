from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import CustomUser, UserProfile



class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('phone_number')

    def clean_phone_number(self):

        phone_number = self.cleaned_data.get('phone_number')

        if not phone_number.isdigit():
            raise forms.ValidationError("Phone number must be number")

        if len(phone_number) < 11 or len(phone_number) > 13:
            raise forms.ValidationError("Phone number length is not elven")

        return phone_number

