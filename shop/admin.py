from django.contrib import admin
from .models import Product, ProductImage, Category

# Register your models here.

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3  

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
    prepopulated_fields = {'slug': ('title',)}
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}