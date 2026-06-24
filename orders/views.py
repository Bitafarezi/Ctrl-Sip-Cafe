from django.shortcuts import render

# Create your views here.

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from cart.utils.cart import Cart
from .models import Order, OrderItem


@login_required
def checkout(request):
    cart = Cart(request)

    if request.method == 'POST':
        order = Order.objects.create(
            user=request.user,
            total_price=cart.get_total_price()
        )
        for item in cart:
            OrderItem.objects.create(
                order=order,
                product=item['product'],
                quantity=item['quantity'],
                price=item['price']
            )
        cart.clear()
        messages.success(request, 'Order placed successfully!')
        return redirect('orders:order_detail', order_id=order.id)

    context = {'title': 'Checkout', 'cart': cart}
    return render(request, 'checkout.html', context)


@login_required
def order_detail(request, order_id):
    order = Order.objects.get(id=order_id, user=request.user)
    context = {'title': 'Order Detail', 'order': order}
    return render(request, 'order_detail.html', context)