from django.urls import path
from .views import RegisterView, UserLoginView, UserLogoutView

urlpatterns = [
    path('register/', RegisterView.as_callable(), name='register'),
    path('login/', UserLoginView.as_callable(), name='login'),
    path('logout/', UserLogoutView.as_callable(), name='logout'),
]