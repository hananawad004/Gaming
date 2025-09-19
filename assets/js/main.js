const nav = document.querySelector(".navbar");
const section = document.querySelector(".sections ");


//change background fron transparent to black 
window.addEventListener("scroll", (e) => {
    if (window.scrollY > section.offsetTop) {
        nav.classList.add("bg-black");
        nav.classList.remove("bg-transparent");
    }
})

//add modal
const showModal = () => {
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalImg = document.querySelector('.modal_img');
    const modalName = document.querySelector('.modal_name');
    const modalColors = document.querySelector('.modal_colors');
    const modalCurrentPrice = document.querySelector('.modal_price .current_price');
    const modalOldPrice = document.querySelector('.modal_price .old_price');
    const rightArrow = document.querySelector('.arrow-right');
    const leftArrow = document.querySelector('.arrow-left');
    const closeBtn = document.querySelector('.close-btn');

    let current = 0;

    const hideModal = () => {
        modalOverlay.classList.remove('show');
    }

    const products = productCards.map(card => ({
        img: card.querySelector('.product-image')?.src || '',
        name: card.querySelector('.product-name')?.textContent || '',
        colors: Array.from(card.querySelectorAll('.product-colors .dropdown-item')).map(c => c.textContent),
        prices: {
            current: card.querySelector('.new-price')?.textContent || '',
            old: card.querySelector('.old-price')?.textContent || ''
        }
    }));

    const showProduct = (index) => {
        if(index < 0) index = products.length - 1;
        if(index >= products.length) index = 0;
        current = index;

        const product = products[current];
        modalImg.src = product.img;
        modalName.textContent = product.name;
        modalCurrentPrice.textContent = product.prices.current;
        modalOldPrice.textContent = product.prices.old;

        modalColors.innerHTML = `
          <div class="dropdown">
            <button class="w-100 border-gray bg-transparent subfont dropdown-toggle" type="button" data-bs-toggle="dropdown">
              Choose Color
            </button>
            <ul class="dropdown-menu w-100">
              ${product.colors.map(color => `<li><button class="dropdown-item">${color}</button></li>`).join('')}
            </ul>
          </div>
        `;

        modalOverlay.classList.add('show');
    }

    productCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            showProduct(index);
        });
    });

    rightArrow.addEventListener('click', () => {
        showProduct(current + 1);
    });
    leftArrow.addEventListener('click', () => {
        showProduct(current - 1);
    });

    closeBtn.addEventListener('click', hideModal);

    modalOverlay.addEventListener('click', (e) => {
        if(e.target === modalOverlay) hideModal();
    });
}

showModal();
