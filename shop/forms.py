from django import forms
from .models import Comment

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text', 'rating']
        widgets = {
            'text': forms.Textarea(attrs={
                'class': 'form-control form-boho', 
                'placeholder': 'Write your review here...', 
                'rows': 4
            }),
            'rating': forms.Select(attrs={
                'class': 'form-select form-boho-text'}, 
                choices=[(i, f"{i} Stars") for i in range(1, 6)])
        }