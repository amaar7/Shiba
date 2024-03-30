// Import menu and buttonsData from db.js
import { menu, buttonsData } from './db.js';

const productContainer = document.getElementById('product-container');
const categoryButtons = document.querySelectorAll('button[data-category]');

// Function to display products based on category
function displayProducts(category) {
    productContainer.innerHTML = '';
    const filteredProducts = category === 'All' ? menu : menu.filter(item => item.category === category);
    filteredProducts.forEach(item => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'flex', 'p-4', 'cursor-pointer');
        productCard.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="w-24 h-auto mr-4 rounded-lg">
            <div class="flex flex-col justify-between">
                <div>
                    <h3 class="text-lg font-semibold">${item.title}</h3>
                    <p class="text-sm">${item.desc}</p>
                </div>
                <p class="text-sm font-medium">KSh${item.price.toFixed(2)}</p> <!-- Replaced $ with KSh -->
            </div>
        `;
        productCard.addEventListener('click', () => {
            showProductDetails(item);
        });
        productContainer.appendChild(productCard);
    });
}

// Function to display detailed product information
function showProductDetails(product) {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fixed', 'top-0', 'left-0', 'right-0', 'bottom-0', 'bg-black', 'bg-opacity-50', 'flex', 'justify-center', 'items-center', 'z-50');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content', 'bg-white', 'p-4', 'rounded-lg', 'overflow-auto', 'relative'); // Add relative positioning
    modalContent.innerHTML = `
        <button class="close-btn absolute top-0 right-0 m-2 bg-gray-300 rounded-full w-6 h-6 flex justify-center items-center hover:bg-gray-400">&times;</button>
        <img src="${product.img}" alt="${product.title}" class="w-full h-auto mb-2 object-cover rounded-lg"> <!-- Ensure the image fills its container -->
        <h3 class="text-lg font-semibold">${product.title}</h3>
        <p class="text-sm">${product.desc}</p>
        <p class="text-sm font-medium">KSh${product.price.toFixed(2)}</p>
    `;

    modalContent.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}


// Function to handle button clicks
function handleButtonClick(event) {
    const category = event.target.dataset.category;
    displayProducts(category);
}

// Add event listeners to category buttons
categoryButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Initial display of all products
displayProducts('All');
