from django.shortcuts import render, get_object_or_404
from .models import Products, Genres, Platforms, ProductGenres, ProductPlatforms, PopularProducts
from django.db.models import Q

def index(request):
    popular_products_links = PopularProducts.objects.select_related('product').prefetch_related(
            'product__productgenres_set__genre',
            'product__productplatforms_set__platform'
        ).all()

    popular_products = [pp.product for pp in popular_products_links]
    context = {
        'popular_products': popular_products,
    }
    return render(request, 'index.html', context)


def search(request):
    query = request.GET.get('q', '')
    genre_id = request.GET.get('genre')
    platform_id = request.GET.get('platform')
    sort_order = request.GET.get('sort')

    # products = Products.objects.all()
    products = Products.objects.all().prefetch_related('productplatforms_set__platform')

    if query:
        products = products.filter(
            Q(name__icontains=query) | Q(action_tags__icontains=query)
        )

    if genre_id:
        products = products.filter(productgenres__genre_id=genre_id)

    if platform_id:
        products = products.filter(productplatforms__platform_id=platform_id)

    if sort_order == 'price_asc':
        products = products.order_by('price')
    elif sort_order == 'price_desc':
        products = products.order_by('-price')

    genres = Genres.objects.all()
    platforms = Platforms.objects.all()

    return render(request, 'search.html', {
        'products': products,
        'genres': genres,
        'platforms': platforms,
    })


def product(request):
    product_id = request.GET.get('id')
    product = get_object_or_404(Products, pk=product_id)

    # жанры и платформы
    genres = ProductGenres.objects.filter(product=product).select_related('genre')
    platforms = ProductPlatforms.objects.filter(product=product).select_related('platform')

    # обработка screenshot_urls
    raw_screens = product.screenshot_urls

    if isinstance(raw_screens, str):
        screenshots = [img.strip() for img in raw_screens.split(',') if img.strip()]
    elif isinstance(raw_screens, list):
        screenshots = raw_screens
    else:
        screenshots = []

    context = {
        'product': product,
        'genres': [g.genre.genre_name for g in genres],
        'platforms': [p.platform.platform_name for p in platforms],
        'screenshots': screenshots,
    }

    return render(request, 'product.html', context)


def cart(request):
    return render(request, 'cart.html')


def discounts(request):
    query = request.GET.get('q', '')

    products = Products.objects.filter(discount_percent__gt=0)

    if query:
        products = products.filter(
            Q(name__icontains=query) | Q(action_tags__icontains=query)
        )

    return render(request, 'discounts.html', {
        'products': products,
    })


def steamWallet(request):
    return render(request, 'steamWallet.html')


def feedback(request):
    return render(request, 'feedback.html')


def privacyPolicy(request):
    return render(request, 'privacyPolicy.html')


def agreement(request):
    return render(request, 'agreement.html')


def contacts(request):
    return render(request, 'contacts.html')


def payment(request):
    return render(request, 'payment.html')


def order(request):
    return render(request, 'order.html')

