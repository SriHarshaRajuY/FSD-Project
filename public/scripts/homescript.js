// Product data
const newProducts = [
    {
        id: 1,
        name: "Money Plant Golden",
        image: "./public/images/new-products/p6.jpg",
        rating: 4.5,
        price: 10,
        originalPrice: 14.50
    },
    {
        id: 2,
        name: "Growing round Plastic pot",
        image: "./public/images/new-products/p7.jpg",
        rating: 4.5,
        price: 10,
        originalPrice: 14.50
    },
    {
        id: 3,
        name: "Spinach Seeds",
        image: "./public/images/new-products/p5.jpg",
        rating: 4.5,
        price: 5,
        originalPrice: 7.60
    },
    {
        id: 4,
        name: "Pruning Secateur",
        image: "./public/images/new-products/p1.jpg",
        rating: 4.5,
        price: 10,
        originalPrice: 14.50
    },
    {
        id: 5,
        name: "Onex Pebbles - 1Kg",
        image: "./public/images/new-products/p3.jpg",
        rating: 4.5,
        price: 10,
        originalPrice: 14.50
    },
    {
        id: 6,
        name: "Parijat Tree",
        image: "./public/images/new-products/p4.jpg",
        rating: 4.5,
        price: 10,
        originalPrice: 14.50
    },
    {
        id: 7,
        name: "Fungo Gaurd - 500ml",
        image: "./public/images/new-products/p2.jpg",
        rating: 4.5,
        price: 10,
        originalPrice: 14.50
    },
    {
        id: 8,
        name: "Coco Husk Block - 5kg",
        image: "./public/images/new-products/p8.jpg",
        rating: 4.5,
        price: 10,
        originalPrice: 14.50
    }
];

const bestProducts = [
    {
        id: 1,
        name: "Bonsai",
        image: "public/images/best-products/s1.jpg"
    },
    {
        id: 2,
        name: "Indoor",
        image: "public/images/best-products/s2.jpg"
    },
    {
        id: 3,
        name: "Areca Palm",
        image: "public/images/best-products/s3.jpg"
    },
    {
        id: 4,
        name: "Seeds",
        image: "public/images/best-products/s4.jpg"
    }
];

/* Home Slider */
var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
});

/* About Section Slideshow */
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    
    if (slides.length > 0) {
        slides[slideIndex-1].style.display = "block";
    }
    
    setTimeout(showSlides, 3000);
}

// Function to create star rating HTML
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
    }

    return starsHTML;
}

// Render new products
function renderNewProducts() {
    const newProductsContainer = document.querySelector('.product .box-container');
    if (newProductsContainer) {
        newProductsContainer.innerHTML = newProducts.map(product => `
            <div class="box" data-product-id="${product.id}">
                <div class="icons">
                    <a href="#" class="fas fa-heart"></a>
                    <a href="#" class="fas fa-share"></a>
                    <a href="#" class="fas fa-eye"></a>
                </div>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="stars">
                    ${createStarRating(product.rating)}
                </div>
                <div class="quantity">
                    <span>Quantity</span>
                    <input type="number" min="1" max="50" value="1">
                </div>
                <div class="price">
                    $${product.price} <span>$${product.originalPrice}</span>
                </div>
                <a href="#" class="btn">Add to Cart</a>
            </div>
        `).join('');
    }
}

// Render best products
function renderBestProducts() {
    const bestProductsContainer = document.querySelector('.sell .box-container');
    if (bestProductsContainer) {
        bestProductsContainer.innerHTML = bestProducts.map(product => `
            <div class="box" data-product-id="${product.id}">
                <div class="image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="content">
                    <h3>${product.name}</h3>
                    <div class="icons">
                        <i class="fas fa-shopping-cart"></i>
                        <i class="fas fa-heart"></i>
                        <i class="fas fa-eye"></i>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Handle product actions
function handleProductAction(action, productId) {
    switch (action) {
        case 'favorite':
            console.log(`Added product ${productId} to favorites`);
            break;
        case 'share':
            console.log(`Sharing product ${productId}`);
            break;
        case 'view':
            console.log(`Viewing product ${productId} details`);
            break;
        case 'cart':
            console.log(`Added product ${productId} to cart`);
            break;
    }
}

// Handle add to cart
function handleAddToCart(productId, quantity) {
    console.log(`Added ${quantity} of product ${productId} to cart`);
}

// Initialize products and add event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Render products
    renderNewProducts();
    renderBestProducts();

    // Add event listeners
    document.querySelectorAll('.box').forEach(box => {
        // Handle quantity changes
        const quantityInput = box.querySelector('input[type="number"]');
        if (quantityInput) {
            quantityInput.addEventListener('change', (e) => {
                const value = parseInt(e.target.value);
                if (value < 1) e.target.value = '1';
                if (value > 50) e.target.value = '50';
            });
        }

        // Handle icon clicks
        box.querySelectorAll('.icons a, .icons i').forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                const action = e.target.classList.contains('fa-heart') ? 'favorite' :
                            e.target.classList.contains('fa-share') ? 'share' :
                            e.target.classList.contains('fa-eye') ? 'view' :
                            e.target.classList.contains('fa-shopping-cart') ? 'cart' : null;
                
                if (action) {
                    const productId = box.getAttribute('data-product-id');
                    handleProductAction(action, productId);
                }
            });
        });

        // Handle add to cart button
        const addToCartBtn = box.querySelector('.btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = box.getAttribute('data-product-id');
                const quantity = box.querySelector('input[type="number"]')?.value || '1';
                handleAddToCart(productId, parseInt(quantity));
            });
        }
    });
});