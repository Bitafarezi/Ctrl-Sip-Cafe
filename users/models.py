from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser

# Create your models here.


# This model won't create any table in database, it is used only for inheritance
class BaseModel(models.Model):
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Created_date"
    )
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name="Updated_date"
    )

    class Meta:
        abstract = True


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


class CustomUser(AbstractUser, BaseModel):
    username = None
    phone_number = models.CharField(max_length=13, unique=True, verbose_name='Phone_number')
    favorites = models.ManyToManyField("products.Product", blank=True, related_name="favorited_by", verbose_name="Favorite_products")
    
    # We specified that the login field for the user is phone number
    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()
    
    def __str__(self):
        return self.phone_number
    

class UserProfile(BaseModel):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=50, blank=True, null=True, verbose_name="First Name")
    last_name = models.CharField(max_length=50, blank=True, null=True, verbose_name="Last Name")
    display_name = models.CharField(max_length=50, blank=True, null=True, verbose_name="Display Name / Username")
    email = models.EmailField(unique=True, blank=True, null=True)
    image = models.ImageField(upload_to="avatars/", blank=True, null=True, verbose_name="Profile Picture")

    def __str__(self):
        return f"Profile for {self.user.phone_number}"