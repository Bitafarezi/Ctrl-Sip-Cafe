from rest_framework import serializers

from .models import Product, Category, ProductImage, Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'slug', 'is_sub', 'sub_category']