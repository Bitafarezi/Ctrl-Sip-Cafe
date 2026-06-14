from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, *extra_fields):
        if not phone_number:
            raise ValueError('Users must have an phone number')
        
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)