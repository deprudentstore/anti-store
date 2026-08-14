from rest_framework import serializers
from .models import (
    Category, Product, ProductImage, Testimonial,
    BlogPost, NewsletterSubscriber, Customer, Order, OrderItem,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    gallery = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'description', 'price',
            'compare_at_price', 'stock', 'is_featured', 'is_signature',
            'image', 'gallery', 'created_at',
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'customer_name', 'quote', 'avatar', 'rating']


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'body', 'cover_image', 'published_at']


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email']


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']


class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    customer_name = serializers.CharField(write_only=True)
    customer_email = serializers.EmailField(write_only=True)
    customer_phone = serializers.CharField(write_only=True, required=False, allow_blank=True)
    customer_address = serializers.CharField(write_only=True, required=False, allow_blank=True)
    customer_city = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Order
        fields = [
            'id', 'status', 'total', 'items', 'payment_reference',
            'customer_name', 'customer_email', 'customer_phone',
            'customer_address', 'customer_city', 'created_at',
        ]
        read_only_fields = ['id', 'status', 'created_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        customer, _ = Customer.objects.get_or_create(
            email=validated_data.pop('customer_email'),
            defaults={
                'name': validated_data.pop('customer_name'),
                'phone': validated_data.pop('customer_phone', ''),
                'address': validated_data.pop('customer_address', ''),
                'city': validated_data.pop('customer_city', ''),
            },
        )
        for k in ['customer_name', 'customer_phone', 'customer_address', 'customer_city']:
            validated_data.pop(k, None)

        order = Order.objects.create(customer=customer, **validated_data)
        total = 0
        for item in items_data:
            OrderItem.objects.create(order=order, **item)
            total += item['price'] * item['quantity']
        order.total = total
        order.save()
        return order
