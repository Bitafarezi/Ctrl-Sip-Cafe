from django.db import models

# Create your models here.

# temporary model to avoid django error
class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name="Product Name")

    def __str__(self):
        return self.name