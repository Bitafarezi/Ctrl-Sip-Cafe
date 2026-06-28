import requests
import json
import os
from django.db.models.signals import pre_save, post_delete, post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings

from .models import User 


# signal for managing avatar image
@receiver(post_delete, sender=User)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.avatar:
        if os.path.isfile(instance.avatar.path):
            os.remove(instance.avatar.path)

@receiver(pre_save, sender=User)
def auto_delete_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False

    try:
        old_file = sender.objects.get(pk=instance.pk).avatar
    except sender.DoesNotExist:
        return False

    new_file = instance.avatar
    if not old_file == new_file:
        if old_file and os.path.isfile(old_file.path):
            os.remove(old_file.path)
            
            
# signal for managing welcome email
@receiver(post_save, sender=User)
def send_welcome_email(sender, instance, created, **kwargs):
    if created and instance.email:
        subject = "Welcome to Ctrl Sip Cafe ☕"
        message = (
            f"Hi {instance.full_name} 😃👋🏻,\n\n"
            "Thanks for joining us! Your next coffee is 15% off. "
            "Just show this email on your next visit.\n\n"
            "Cheers,\n"
            "The Ctrl Sip Team"
        )
        
        # Mailtrap web service address
        url = "https://sandbox.api.mailtrap.io/api/send/4743416" # Your inbox id
        
        api_token = "f35243c7575d05697873eacf216efb59" 
        
        headers = {
            "Authorization": f"Bearer {api_token}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "from": {"email": "info@ctrlsip.com", "name": "Ctrl Sip Cafe"},
            "to": [{"email": instance.email}],
            "subject": subject,
            "text": message
        }
        
        try:
            response = requests.post(url, headers=headers, data=json.dumps(payload), timeout=10)
            print("Mailtrap API Response Status:", response.status_code)
            print("Mailtrap API Response Text:", response.text)
        except Exception as e:
            print("Request Error:", e)