
// ---------- PRODUCT PAGE PAGINATION ----------
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

// ---------- SERVICES PAGE PAGINATION ----------
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

// ---------- SHOPPING CART FUNCTIONS ----------
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

// ---------- SERVICE BOOKING FUNCTION ----------
// This function saves which service the user wants to book

function bookService(serviceName) {
    // Save the service name to browser storage
    localStorage.setItem('bookingService', serviceName);
    // Send user to the booking page
    window.location.href = 'Booking.html';
}

// ---------- AUTO-RUN ON PAGE LOAD ----------
// This code runs automatically when any page loads

// Check if we're on the Products page (look for product pagination buttons)
if (document.getElementById('btn-1')) {
    showPage(1);  // Start showing page 1 of products
}

// Check if we're on the Services page
if (document.getElementById('services-btn-1')) {
    showServicesPage(1);  // Start showing page 1 of services
}