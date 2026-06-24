from cart.utils.cart import Cart
from shop.models import Category, Notification


def return_cart(request):
    cart = len(list(Cart(request)))
    return {'cart_count': cart}


def return_categories(request):
    categories = Category.objects.all()
    return {'categories': categories}


def return_notifications(request):
    if request.user.is_authenticated:
        notifs = Notification.objects.filter(is_read=False)
        return {
            'notifications': notifs,
            'notif_count': notifs.count(),
        }
    return {}