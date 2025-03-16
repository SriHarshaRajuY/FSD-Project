document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("product-form");
    const productList = document.getElementById("product-list");
    const topSales = document.getElementById("top-sales");
    const recentSales = document.getElementById("recent-sales");
    const productModal = document.getElementById("product-modal");
    const overlay = document.getElementById("overlay");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    const modalQuantity = document.getElementById("modal-quantity");
    const modalSold = document.getElementById("modal-sold");
    const modalDescription = document.getElementById("modal-description");
    const closeBtn = document.querySelector(".close");
    const addToCartBtn = document.getElementById("add-to-cart");
    const buyNowBtn = document.getElementById("buy-now");
    const cartCount = document.getElementById("cart-count");

    let products = [];
    let currentCartCount = 0;

    // Sample data for top and recent sales
    const sampleProducts = [
        { 
            id: "t1",
            name: "Organic Fertilizer", 
            price: "$15", 
            image: "/public/images/sell-us/t1.jpg", 
            quantity: "10", 
            sold: "6", 
            type: "top", 
            description: "Organic fertilizer made from natural ingredients, perfect for healthy plant growth." 
        },
        { 
            id: "t2",
            name: "Indoor Plant", 
            price: "$30", 
            image: "/public/images/sell-us/t2.jpg", 
            quantity: "7", 
            sold: "8", 
            type: "top", 
            description: "Beautiful indoor plant that adds greenery to your home or office." 
        },
        { 
            id: "t3",
            name: "Gardening Tool Set", 
            price: "$50", 
            image: "/public/images/sell-us/t3.jpg", 
            quantity: "5", 
            sold: "9", 
            type: "top", 
            description: "A complete set of high-quality gardening tools for all your gardening needs." 
        },
        { 
            id: "t4",
            name: "Succulent Plant", 
            price: "$20", 
            image: "/public/images/sell-us/t4.jpg", 
            quantity: "3", 
            sold: "7", 
            type: "top", 
            description: "Low-maintenance succulent plant, ideal for beginners." 
        },
        { 
            id: "t5", // New item for Top Sales
            name: "Garden Gloves", 
            price: "$10", 
            image: "/public/images/sell-us/t5.jpg", 
            quantity: "20", 
            sold: "5", 
            type: "top", 
            description: "Durable garden gloves for comfortable gardening." 
        },
        { 
            id: "r1",
            name: "Garden Watering Can", 
            price: "$12", 
            image: "/public/images/sell-us/r1.jpg", 
            quantity: "15", 
            sold: "2", 
            type: "recent", 
            description: "Durable and stylish watering can for your garden." 
        },
        { 
            id: "r2",
            name: "Flower Seeds Pack", 
            price: "$8", 
            image: "/public/images/sell-us/r2.jpg", 
            quantity: "20", 
            sold: "3", 
            type: "recent", 
            description: "A pack of assorted flower seeds to grow a colorful garden." 
        },
        { 
            id: "r3",
            name: "Compost Soil Bag", 
            price: "$18", 
            image: "/public/images/sell-us/r3.jpg", 
            quantity: "10", 
            sold: "4", 
            type: "recent", 
            description: "Nutrient-rich compost soil for healthy plant growth." 
        },
        { 
            id: "r4",
            name: "Cactus Mini Pot", 
            price: "$25", 
            image: "/public/images/sell-us/r4.jpg", 
            quantity: "5", 
            sold: "5", 
            type: "recent", 
            description: "A cute mini pot with a cactus, perfect for small spaces." 
        },
        { 
            id: "r5", // New item for Recent Sales
            name: "Garden Pruner", 
            price: "$14", 
            image: "/public/images/sell-us/r5.jpg", 
            quantity: "12", 
            sold: "3", 
            type: "recent", 
            description: "Sharp and durable garden pruner for trimming plants." 
        }
    ];

    // Function to create a product card
    function createProductCard(product) {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <p>Sold: ${product.sold}</p>
            <button class="details-btn">View Details</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        // Attach event listeners
        productDiv.querySelector(".details-btn").addEventListener("click", () => showProductDetails(product));
        productDiv.querySelector(".edit-btn").addEventListener("click", () => editProduct(product));
        productDiv.querySelector(".delete-btn").addEventListener("click", () => deleteProduct(product));

        return productDiv;
    }

    // Function to show product details in modal
    function showProductDetails(product) {
        modalImg.src = product.image;
        modalTitle.textContent = product.name;
        modalPrice.textContent = `Price: ${product.price}`;
        modalQuantity.textContent = `Available Quantity: ${product.quantity}`;
        modalSold.textContent = `Sold: ${product.sold}`;
        modalDescription.textContent = `Description: ${product.description}`;

        // Store current product for cart/buy actions
        addToCartBtn.setAttribute('data-product-id', product.id);
        buyNowBtn.setAttribute('data-product-id', product.id);

        // Show modal and overlay
        productModal.classList.add("active");
        overlay.classList.add("active");
    }

    // Function to edit a product
    function editProduct(product) {
        const newName = prompt("Enter new product name:", product.name);
        const newPrice = prompt("Enter new price:", product.price);
        const newQuantity = prompt("Enter new quantity:", product.quantity);
        const newSold = prompt("Enter new sold count:", product.sold);
        const newDescription = prompt("Enter new description:", product.description);

        if (newName && newPrice && newQuantity && newSold && newDescription) {
            // Update product properties
            product.name = newName;
            product.price = newPrice;
            product.quantity = newQuantity;
            product.sold = newSold;
            product.description = newDescription;

            // Re-render products
            renderProducts();
        }
    }

    // Function to delete a product
    function deleteProduct(product) {
        if (confirm("Are you sure you want to delete this product?")) {
            if (product.type === "available") {
                // Remove from user-added products
                products = products.filter(p => p.id !== product.id);
            } else {
                // Remove from sample products
                const index = sampleProducts.findIndex(p => p.id === product.id);
                if (index !== -1) {
                    sampleProducts.splice(index, 1);
                }
            }
            // Re-render products
            renderProducts();
        }
    }

    // Function to add to cart
    function addToCart() {
        currentCartCount++;
        cartCount.textContent = currentCartCount;
        closeModal();
    }

    // Function to close modal
    function closeModal() {
        productModal.classList.remove("active");
        overlay.classList.remove("active");
    }

    // Function to render all products
    function renderProducts() {
        // Clear existing products
        productList.innerHTML = "";
        topSales.innerHTML = "";
        recentSales.innerHTML = "";

        // Render user-added products
        products.forEach(product => {
            const productCard = createProductCard(product);
            productList.appendChild(productCard);
        });

        // Render sample products
        sampleProducts.forEach(product => {
            const productCard = createProductCard(product);
            if (product.type === "top") {
                topSales.appendChild(productCard);
            } else if (product.type === "recent") {
                recentSales.appendChild(productCard);
            }
        });
    }

    // Handle form submission
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("product-name").value;
        const price = `$${document.getElementById("product-price").value}`;
        const quantity = document.getElementById("product-quantity").value;
        const imageFile = document.getElementById("product-image").files[0];
        const description = `This is a ${name}. It is a high-quality product perfect for your garden.`;

        if (name && price && quantity && imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newProduct = {
                    id: Date.now().toString(),
                    name: name,
                    price: price,
                    image: e.target.result,
                    quantity: quantity,
                    sold: "0",
                    type: "available",
                    description: description
                };

                products.push(newProduct);
                renderProducts();
                productForm.reset();
            };
            reader.readAsDataURL(imageFile);
        }
    });

    // Event Listeners
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    addToCartBtn.addEventListener("click", addToCart);
    buyNowBtn.addEventListener("click", addToCart); // Same action for simplicity

    // Initial render
    renderProducts();
});