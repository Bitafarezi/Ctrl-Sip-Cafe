import os
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from .models import ProductImage  

@receiver(post_delete, sender=ProductImage)
def delete_image_on_record_delete(sender, instance, **kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)

@receiver(pre_save, sender=ProductImage)
def delete_old_image_on_image_update(sender, instance, **kwargs):
    if not instance.pk:
        return False

    try:
        old_image_record = ProductImage.objects.get(pk=instance.pk)
    except ProductImage.DoesNotExist:
        return False

    old_image = old_image_record.image
    new_image = instance.image

    if old_image and old_image != new_image:
        if os.path.isfile(old_image.path):
            os.remove(old_image.path)