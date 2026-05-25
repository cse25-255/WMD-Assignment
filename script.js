
//  PRODUCT PAGE PAGINATION 
// This variable tracks which page of products we're on 
let currentPage = 1;

// Function to show a specific page of products
function showPage(pageNum) {
    // Hide ALL products on pages 1, 2, and 3
    let allProducts = document.querySelectorAll('.page-1, .page-2, .page-3');
    allProducts.forEach(product => {
        product.style.display = 'none';
    });
    
    // Show ONLY the products on the selected page
    let selectedPage = document.querySelectorAll('.page-' + pageNum);
    selectedPage.forEach(product => {
        product.style.display = 'block';
    });
    
    // Update the pagination buttons (change which button looks "active")
    for (let i = 1; i <= 3; i++) {
        let btn = document.getElementById('btn-' + i);
        if (btn) {
            if (i === pageNum) {
                btn.classList.add('active');  // Highlight current page button
            } else {
                btn.classList.remove('active'); // Remove highlight from others
            }
        }
    }
    
    // Update current page number
    currentPage = pageNum;
}

// Function to go to the NEXT page
function nextPage() {
    if (currentPage < 3) {  // Check if we're NOT on the last page
        showPage(currentPage + 1);
    }
}

// Function to go to the PREVIOUS page
function prevPage() {
    if (currentPage > 1) {  // Check if we're NOT on the first page
        showPage(currentPage - 1);
    }
}

// ===== SERVICES PAGE PAGINATION =====
// Similar to products, but services only have 2 pages
let currentServicesPage = 1;

function showServicesPage(pageNum) {
    // Hide all services on both pages
    let allServices = document.querySelectorAll('.page-1, .page-2');
    allServices.forEach(service => {
        service.style.display = 'none';
    });
    
    // Show services on selected page
    let selectedPage = document.querySelectorAll('.page-' + pageNum);
    selectedPage.forEach(service => {
        service.style.display = 'block';
    });
    
    // Update button styles
    for (let i = 1; i <= 2; i++) {
        let btn = document.getElementById('services-btn-' + i);
        if (btn) {
            if (i === pageNum) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    }
    
    currentServicesPage = pageNum;
}

function nextPageServices() {
    if (currentServicesPage < 2) {
        showServicesPage(currentServicesPage + 1);
    }
}

function prevPageServices() {
    if (currentServicesPage > 1) {
        showServicesPage(currentServicesPage - 1);
    }
}

// ===== SHOPPING CART FUNCTIONS =====
// This function adds a product to the cart (saves to browser's localStorage)

function addToCart(productName, productPrice) {
    // STEP 1: Get existing cart from browser storage (or create empty array)
    let cart = JSON.parse(localStorage.getItem('pharmaCart')) || [];
    
    // STEP 2: Check if this product is already in the cart
    let existing = cart.find(item => item.name === productName);
    
    // STEP 3: If product exists, increase quantity. If not, add new item
    if (existing) {
        existing.qty += 1;  // Add one more
        existing.total = existing.qty * existing.price;  // Recalculate total
    } else {
        cart.push({ 
            name: productName,   // Product name
            price: productPrice, // Price per item
            qty: 1,              // Start with quantity 1
            total: productPrice  // Total price for this item
        });
    }
    
    // STEP 4: Save updated cart back to browser storage
    localStorage.setItem('pharmaCart', JSON.stringify(cart));
    
    // STEP 5: Show confirmation to user
    alert(productName + ' added to cart!');
}

// ===== SERVICE BOOKING FUNCTION =====
// This function saves which service the user wants to book

function bookService(serviceName) {
    // Save the service name to browser storage
    localStorage.setItem('bookingService', serviceName);
    // Send user to the booking page
    window.location.href = 'Booking.html';
}

// ===== CART PAGE FUNCTIONS =====

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('pharmaCart')) || [];
    const tbody = document.getElementById('cartBody');
    
    if (tbody) {
        tbody.innerHTML = '';

        if (cart.length === 0) {
            const emptyMsg = document.getElementById('emptyMsg');
            const cartSummary = document.getElementById('cartSummary');
            const cartTable = document.getElementById('cartTable');
            if (emptyMsg) emptyMsg.style.display = 'block';
            if (cartSummary) cartSummary.style.display = 'none';
            if (cartTable) cartTable.style.display = 'none';
            return;
        }

        const emptyMsg = document.getElementById('emptyMsg');
        const cartSummary = document.getElementById('cartSummary');
        const cartTable = document.getElementById('cartTable');
        if (emptyMsg) emptyMsg.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'flex';
        if (cartTable) cartTable.style.display = 'table';

        let grandTotal = 0;

        cart.forEach((item, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td class="product-info"><span>${item.name}</span></td>
                <td>
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span class="qty">${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </td>
                <td class="price">${item.price.toFixed(2)}</td>
                <td class="total">${item.total.toFixed(2)}</td>
                <td><button onclick="removeItem(${index})" style="background-color:#dc3545;">✕</button></td>
            `;
            tbody.appendChild(row);
            grandTotal += item.total;
        });

        const grandTotalSpan = document.getElementById('grandTotal');
        if (grandTotalSpan) grandTotalSpan.textContent = grandTotal.toFixed(2);
    }
}

function changeQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('pharmaCart')) || [];
    cart[index].qty += change;
    if (cart[index].qty < 1) cart[index].qty = 1;
    cart[index].total = cart[index].qty * cart[index].price;
    localStorage.setItem('pharmaCart', JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('pharmaCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('pharmaCart', JSON.stringify(cart));
    loadCart();
}

// ===== CHECKOUT PAGE FUNCTIONS =====

function loadOrderSummary() {
    let cart = JSON.parse(localStorage.getItem('pharmaCart')) || [];
    const summaryDiv = document.getElementById('orderSummary');
    
    if (summaryDiv) {
        summaryDiv.innerHTML = '';

        if (cart.length === 0) {
            summaryDiv.innerHTML = '<p style="color:#555;">No items in cart. <a href="Products.html" style="color:#198754;">Shop now</a></p>';
            const checkoutTotal = document.getElementById('checkoutTotal');
            if (checkoutTotal) checkoutTotal.textContent = '0.00';
            return;
        }

        let grandTotal = 0;
        cart.forEach(item => {
            let row = document.createElement('div');
            row.className = 'order-item';
            row.innerHTML = `<span>${item.name} x${item.qty}</span><span>P ${item.total.toFixed(2)}</span>`;
            summaryDiv.appendChild(row);
            grandTotal += item.total;
        });

        const checkoutTotal = document.getElementById('checkoutTotal');
        if (checkoutTotal) checkoutTotal.textContent = grandTotal.toFixed(2);
    }
}

function placeOrder() {
    const name = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const option = document.querySelector('input[name="option"]:checked');
    const cart = JSON.parse(localStorage.getItem('pharmaCart')) || [];

    if (!name || !phone || !address || !option) {
        alert('Please fill in all your details before placing the order.');
        return;
    }

    if (!name.value.trim() || !phone.value.trim() || !address.value.trim()) {
        alert('Please fill in all your details before placing the order.');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty. Please add products before placing an order.');
        return;
    }

    // Clear cart after order
    localStorage.removeItem('pharmaCart');

    alert('✅ Order placed successfully!\n\nThank you, ' + name.value.trim() + '!\nYour order will be ' + option.value.toLowerCase() + 'ed to: ' + address.value.trim() + '\nWe will contact you at: ' + phone.value.trim());

    window.location.href = 'index.html';
}

// ===== BOOKING PAGE FUNCTIONS =====

function initBookingPage() {
    // Pre-fill service if coming from Services page
    const preSelected = localStorage.getItem('bookingService');
    if (preSelected) {
        const select = document.getElementById('service');
        if (select) {
            for (let option of select.options) {
                if (option.value === preSelected) {
                    option.selected = true;
                    break;
                }
            }
            localStorage.removeItem('bookingService');
        }
    }
}

function submitBooking() {
    const name = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const date = document.getElementById('bookingDate');
    const time = document.getElementById('bookingTime');

    if (!name || !phone || !service || !date || !time) {
        alert('Please fill in all required fields before confirming your booking.');
        return;
    }

    if (!name.value.trim() || !phone.value.trim() || !service.value || !date.value || !time.value) {
        alert('Please fill in all required fields before confirming your booking.');
        return;
    }

    alert('✅ Booking confirmed!\n\nName: ' + name.value.trim() + '\nService: ' + service.value + '\nDate: ' + date.value + '\nTime: ' + time.value + '\n\nWe will contact you at ' + phone.value.trim() + ' to confirm your appointment.');

    window.location.href = 'index.html';
}

// ===== AUTO-RUN ON PAGE LOAD =====
// This code runs automatically when any page loads

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the Products page (look for product pagination buttons)
    if (document.getElementById('btn-1')) {
        showPage(1);  // Start showing page 1 of products
    }

    // Check if we're on the Services page
    if (document.getElementById('services-btn-1')) {
        showServicesPage(1);  // Start showing page 1 of services
    }

    // Check if we're on the Cart page
    if (document.getElementById('cartBody')) {
        loadCart();
    }

    // Check if we're on the Checkout page
    if (document.getElementById('orderSummary')) {
        loadOrderSummary();
    }

    // Check if we're on the Booking page
    if (document.getElementById('service')) {
        initBookingPage();
    }
});

// Make functions globally available
window.showPage = showPage;
window.nextPage = nextPage;
window.prevPage = prevPage;
window.showServicesPage = showServicesPage;
window.nextPageServices = nextPageServices;
window.prevPageServices = prevPageServices;
window.addToCart = addToCart;
window.bookService = bookService;
window.loadCart = loadCart;
window.changeQty = changeQty;
window.removeItem = removeItem;
window.loadOrderSummary = loadOrderSummary;
window.placeOrder = placeOrder;
window.submitBooking = submitBooking;