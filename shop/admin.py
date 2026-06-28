from django.contrib import admin
from .models import Product, ProductImage, Category, Comment

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
    
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'created_at', 'is_active')
    
    list_filter = ('is_active', 'created_at')
    
    search_fields = ('text', 'user__username', 'product__name')
    
    actions = ['approve_comments']

    def approve_comments(self, request, queryset):
        queryset.update(is_active=True)
    approve_comments.short_description = "Approve selected comments"