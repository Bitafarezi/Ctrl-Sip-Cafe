from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.views import LoginView
from django.contrib.auth import logout
from .forms import CustomUserCreationForm, UserProfileCreationForm

# 1. Registration View
class RegisterView(View):
    template_name = 'users/register.html'

    def get(self, request):
        user_form = CustomUserCreationForm()
        profile_form = UserProfileCreationForm()
        return render(request, self.template_name, {
            'user_form': user_form,
            'profile_form': profile_form
        })

    def post(self, request):
        user_form = CustomUserCreationForm(request.POST)
        profile_form = UserProfileCreationForm(request.POST, request.FILES)

        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            return redirect('login')

        return render(request, self.template_name, {
            'user_form': user_form,
            'profile_form': profile_form
        })


class UserLoginView(LoginView):
    template_name = 'users/login.html'

# 3. Logout View
class UserLogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('login')