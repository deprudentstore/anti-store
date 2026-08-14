from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Category, Product, Testimonial, BlogPost
from .serializers import (
    CategorySerializer, ProductSerializer, TestimonialSerializer,
    BlogPostSerializer, NewsletterSerializer, OrderCreateSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        featured = self.request.query_params.get('featured')
        signature = self.request.query_params.get('signature')
        if category:
            qs = qs.filter(category__slug=category)
        if featured:
            qs = qs.filter(is_featured=True)
        if signature:
            qs = qs.filter(is_signature=True)
        return qs


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'


@api_view(['POST'])
def subscribe_newsletter(request):
    serializer = NewsletterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Subscribed'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderCreateSerializer
