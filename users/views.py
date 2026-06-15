from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView, View

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


class UserLoginView(LoginView):
    template_name = "users/login.html"

    def get_success_url(self):
        return reverse_lazy("menu") 