from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.utils import timezone

from .models import Order, OrderItem
from cart.utils.cart import Cart


@login_required
@require_POST  
def create_order(request):
    cart = Cart(request)
    if len(cart) == 0:
        return redirect('cart:show_cart')
        
    order = Order.objects.create(user=request.user)
    for item in cart:
        OrderItem.objects.create(
            order=order, 
            product=item['product'],
            price=int(float(item['price'])), 
            quantity=item['quantity']
        )
        
    from shop.models import Notification
    Notification.objects.create(
        message=f"🛒 New Order from {request.user.full_name} - Price: ${order.get_total_price}"
    )
    
    return redirect('orders:checkout', order_id=order.id)


@login_required
def checkout(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user) 
    context = {'title': 'Checkout', 'order': order}
    return render(request, 'checkout.html', context)


@login_required
@require_POST  
def fake_payment(request, order_id):
    cart = Cart(request)
    cart.clear()
    
    order = get_object_or_404(Order, id=order_id, user=request.user)
    order.status = True
    order.save()
    return redirect('orders:user_orders')


@login_required
def user_orders(request):
    orders = request.user.orders.all()
    context = {'title': 'Orders', 'orders': orders}
    return render(request, 'user_orders.html', context)