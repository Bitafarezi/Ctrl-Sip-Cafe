from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser

# Create your models here.

class CustomUserManager(BaseUserManager):
    
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("This field cannot be empty")

        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    
    def create_superuser(self, phone_number, password=None, **extra_fields):

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(phone_number, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None
    phone_number = models.CharField(max_length=13, unique=True, verbose_name='Phone Number')
    
    # We specified that the login field for the user is phone number
    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ([])
    
    def __str__(self):
        return self.phone_number