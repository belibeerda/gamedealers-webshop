from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('search/', views.search, name='search'),
    path('product/', views.product, name='product'),
    path('cart/', views.cart, name='cart'),
    path('discounts/', views.discounts, name='discounts'),
    path('steamWallet/', views.steamWallet, name='steamWallet'),
    path('feedback/', views.feedback, name='feedback'),
    path('privacyPolicy/', views.privacyPolicy, name='privacyPolicy'),
    path('agreement/', views.agreement, name='agreement'),
    path('contacts/', views.contacts, name='contacts'),
    path('payment/', views.payment, name='payment'),
    path('order/', views.order, name='order'),
]
