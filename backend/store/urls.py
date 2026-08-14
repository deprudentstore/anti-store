from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    CategoryViewSet, ProductViewSet, TestimonialViewSet,
    BlogPostViewSet, subscribe_newsletter, OrderCreateView,
)

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)
router.register('testimonials', TestimonialViewSet)
router.register('blog', BlogPostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('newsletter/', subscribe_newsletter, name='newsletter'),
    path('orders/', OrderCreateView.as_view(), name='order-create'),
]
