from rest_framework import serializers

from .models import Product, Category, ProductImage, Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'slug', 'is_sub', 'sub_category']
        

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'order']


class ProductListSerializer(serializers.ModelSerializer):
    
    category = CategorySerializer(read_only = True)
    
    class Meta:
        model = Product
        fields = ['id', 'category', 'title', 'description', 'price', 'image', 'is_available', 'attributes']
        

class ProductDetailSerializer(serializers.ModelSerializer):
    
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'category', 'title', 'description', 'price', 'image', 'is_available', 'attributes', 'images', 'date_created']
        