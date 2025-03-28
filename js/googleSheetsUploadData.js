document.addEventListener('DOMContentLoaded', function() {

  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.querySelector('.catalog-grid-container');

  if (!resultsContainer) {
    console.error('Элемент с классом "catalog-grid-container" не найден на странице');
    return;
  }

  searchForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    filterProducts(searchTerm);
  });

  let allProducts = [];

  async function loadProducts() {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/1DqloAEOGkDMqudEEB3rSFgWVTvnIuyJtu9uJERqo4Wg/values/productsList?key=AIzaSyAdHF7Odd1Zn4aXpK9Z2bV6SUoFD3Iceh0`;
      const response = await fetch(url);
      const data = await response.json();
      
      const [headers, ...rows] = data.values;
      allProducts = rows.map(row => {
        const product = {};
        headers.forEach((header, index) => {
          product[header.toLowerCase()] = row[index];
        });
        return product;
      });
      
      displayProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      resultsContainer.innerHTML = '<p>Произошла ошибка при загрузке товаров. Пожалуйста, попробуйте позже.</p>';
    }
  }

  function filterProducts(searchTerm) {
    if (!searchTerm) {
      displayProducts(allProducts);
      return;
    }
    
    const filtered = allProducts.filter(product => {
      return (product.name && product.name.toLowerCase().includes(searchTerm)) || 
             (product.tags && product.tags.toLowerCase().includes(searchTerm));
    });
    
    displayProducts(filtered);
  }

  function displayProducts(products) {
    if (!products.length) {
      resultsContainer.innerHTML = '<p>Товары не найдены. Попробуйте изменить поисковый запрос.</p>';
      return;
    }
    
    resultsContainer.innerHTML = products.map(product => {
      const priceNum = parseInt(product.price) || 0;
      const discountNum = parseInt(product.action) || 0;
      const hasDiscount = discountNum > 0;
      const finalPrice = hasDiscount ? Math.round(priceNum * (1 - discountNum / 100)) : Math.round(priceNum);
      
      return `
      <div class="product-card">
        <div class="game-image">
          <a href="#">
            ${product.image ? `<img src="${product.image}" alt="${product.name}">` : '<div class="no-image">Нет изображения</div>'}
          </a>
        </div>
        <a href="#">
          <p class="game-name">${product.name || 'Без названия'}</p>
        </a>
        ${hasDiscount ? `
          <div class="old-price-container">
            <span class="old-price">${priceNum.toFixed(2)}&nbsp;₽</span>
            <span class="discount">-${discountNum}%</span>
          </div>
        ` : ''}
        <div class="price-cart">
          <span class="price">${finalPrice.toFixed(2)}&nbsp;₽</span>
          <div class="card-button"></div>
        </div>
      </div>
      `;
    }).join('');
  }

  loadProducts();
});