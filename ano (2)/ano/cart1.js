document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('#cart-items');
    const checkoutButton = document.querySelector('#checkout-btn');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + parseFloat(item.price.slice(1)) * item.quantity, 0).toFixed(2);
    };

    const updateCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    };

    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<h2>Your Cart Is Empty</h2>';
            checkoutButton.disabled = true;
            checkoutButton.textContent = 'Proceed to Checkout ($0)'; // Set default text when the cart is empty
            return;
        }

        cart.forEach((product, index) => {
            if (!product.quantity) product.quantity = 1;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-brand">${product.brand}</div>
                </div>
                <div class="quantity-controls">
                    <button class="decrease-btn" data-index="${index}">-</button>
                    <span>${product.quantity}</span>
                    <button class="increase-btn" data-index="${index}">+</button>
                </div>
                <div class="product-price">$${(parseFloat(product.price.slice(1)) * product.quantity).toFixed(2)}</div>
                <button class="remove-btn" data-index="${index}">🗑️</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        checkoutButton.disabled = false;
        checkoutButton.textContent = `Proceed to Checkout ($${calculateTotal()})`;
    };

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('increase-btn')) {
            const index = event.target.dataset.index;
            cart[index].quantity++;
            updateCart();
        } else if (event.target.classList.contains('decrease-btn')) {
            const index = event.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                updateCart();
            }
        } else if (event.target.classList.contains('remove-btn')) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });

    renderCartItems();
});
