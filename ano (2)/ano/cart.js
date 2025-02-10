document.addEventListener('DOMContentLoaded', () => {
    const cartIcons = document.querySelectorAll('.cart-icon');

    cartIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.preventDefault();
            const productElement = event.target.closest('.pro');
            
            // Extract product details
            const productName = productElement.querySelector('.des h5').textContent;
            const productPrice = productElement.querySelector('.des h4').textContent;
            const productBrand = productElement.querySelector('.des span').textContent;

            // Create a product object
            const product = {
                name: productName,
                price: productPrice,
                brand: productBrand
            };

            // Get current cart from localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Add product to cart
            cart.push(product);

            // Save updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Provide feedback to the user
            alert(`${productName} has been added to your cart!`);
        });
    });
});