from django.contrib import admin
from .models import (
    Category, Product, ProductImage, Testimonial,
    BlogPost, NewsletterSubscriber, Customer, Order, OrderItem,
)


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'stock', 'is_featured', 'is_signature', 'is_active']
    list_filter = ['category', 'is_featured', 'is_signature', 'is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['customer_name', 'rating', 'is_active']


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'published_at', 'is_published']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(NewsletterSubscriber)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ['email', 'subscribed_at']


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'status', 'total', 'created_at']
    list_filter = ['status']
    inlines = [OrderItemInline]


admin.site.register(Customer)
admin.site.site_header = 'Anti Furniture Admin'
admin.site.site_title = 'Anti Admin'
admin.site.index_title = 'Store Management'
