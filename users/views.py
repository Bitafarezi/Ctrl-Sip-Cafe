from django.urls import reverse_lazy
from django.views.generic import CreateView

from .forms import CustomUserCreationForm


class RegisterView(CreateView):
    form_class = CustomUserCreationForm  
    template_name = "users/register.html" 
    success_url = reverse_lazy(
        "login"
    )

    def form_valid(self, form):
        response = super().form_valid(form)
        user = form.instance
        return response

