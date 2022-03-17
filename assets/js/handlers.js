let cart = [];

function lightDark() {
    let blackStyle = document.getElementById('modo');
    if (!blackStyle) {
        let head = document.querySelector('head');
        let link = document.createElement('link');
        link.setAttribute('href', 'assets/css/indexBlack.css');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('id', 'modo');
        head.appendChild(link);

        luminosidade.setAttribute('src', 'assets/images/sol.png');
    } else {
        let head = document.querySelector('head');
        head.removeChild(blackStyle);

        luminosidade.setAttribute('src', 'assets/images/lua.png');
    }
}

function getProductsByCategory(category) {
    if (category.toLowerCase() === 'todos') {
        return products;
    } else {
        return products.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
}

function getProductsByName(name) {
    return products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
}

function showProductsInVitrine(filtered) {
    let vitrine = document.querySelector('main');
    vitrine.innerHTML = '';

    for (let i = 0; i < filtered.length; i++) {
        let product = document.createElement('article');

        product.classList.add('card');

        product.innerHTML = `
        <section class="first-part">
        <img src="${filtered[i].img}" alt="">
        </section>
        <section class="second-part">
            <div>${filtered[i].category}</div>
            <h2 lang="en">${filtered[i].name}</h2>
            <p>${filtered[i].description}</p>
            <span>R$ ${filtered[i].price.toFixed(2)}</span>
            <button>Adicionar ao carrinho</button>
        </section>`;

        vitrine.appendChild(product);
    }
}

function createObjectProduct(product) {
    let childsProduct = product.childNodes;
    [, image] = childsProduct[1].childNodes;
    [, div, , h2, , p, , span] = childsProduct[3].childNodes;

    console.log(span.innerText)

    let number = '';

    for (let i = 0; i < span.innerText.length; i++) {

        if (span.innerText[i] === '.') {
            break;
        }

        if (!isNaN(span.innerText[i]) && span.innerText[i] !== ' ') {
            number += span.innerText[i];
        }
    }

    let object = {
        img: image.getAttribute('src'),
        category: div.innerText,
        name: h2.innerText,
        description: p.innerText,
        price: number,
        inCart: 0
    }

    return object;
}

function addCart(product) {

    if (product.inCart === 0) {
        cart.push(product);
    }

    updateCart();

}

function removeCart(product) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === product.name) {
            cart.splice(i, 1);
        }
    }

    updateCart()
}

function showProductsInCart() {
    if (cart.length > 0) {
        let areaCart = document.querySelector('.cart-products-full');
        areaCart.innerHTML = '';

        for (let i = 0; i < cart.length; i++) {
            let item = document.createElement('div');

            item.classList.add('item');

            item.innerHTML = `
            <div class="picture">
                <img src="${cart[i].img}" alt="">
            </div>
            <div class="info">
                <h2>${cart[i].name}</h2>
                <span>R$ ${cart[i].price.toFixed(2)}</span>
                <button>Remover produto</button>
            </div>
            <div class="cart--item--qtarea">
                <button class="cart--item-qtmenos">-</button>
                <div class="cart--item--qt">${cart[i].inCart}</div>
                <button class="cart--item-qtmais">+</button>
            </div>`;

            areaCart.appendChild(item);
        }
    }

}

function updateCart() {

    if (cart.length === 0) {
        let areaCart = document.querySelector('.cart-products-full');
        let cartInfos = document.querySelector('.cart-infos');

        let h2 = document.createElement('h2');
        let small = document.createElement('small');

        h2.innerText = 'Carrinho Vázio';
        small.innerText = 'Adicione itens';

        areaCart.appendChild(h2);
        areaCart.appendChild(small);

        areaCart.classList.remove('cart-products-full');
        areaCart.classList.add('cart-products-without');

        cartInfos.style.display = 'none';

    }

    if (cart.length === 1) {
        let areaCart = document.querySelector('.cart-products-without');
        let cartInfos = document.querySelector('.cart-infos');

        areaCart.innerHTML = '';
        areaCart.classList.remove('cart-products-without');
        areaCart.classList.add('cart-products-full');

        cartInfos.style.display = 'flex';

    }

    showProductsInCart()

    let amount = document.querySelector('.amount .second');
    let total = document.querySelector('.total .second');
    let cartOpener = document.querySelector('.cart-opener span');
    let somaTotal = 0;
    let somaAmount = 0;

    for (let i = 0; i < cart.length; i++) {
        somaTotal += parseInt(cart[i].price);
        somaAmount += cart[i].inCart;
    }

    amount.innerText = somaAmount;
    cartOpener.innerText = somaAmount;
    total.innerText = `R$ ${somaTotal.toFixed(2)}`;
}

function increaseAmount(product) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === product.name) {
            cart[i].inCart++;
        }
    }

    updateCart();
}

function decreaseAmount() {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === product.name) {
            cart[i].inCart--;
        }
    }

    updateCart();
}

function showMenu() {
    let menu = document.querySelector('header nav ul');
    menu.classList.toggle('open')
}

function toggleCart() {

    if (cart.length > 0) {
        let areaCart = document.querySelector('.cart');
        let main = document.querySelector('main');

        areaCart.style.transition = 'width 1s';

        setTimeout(() => {
            areaCart.classList.toggle('openCart')

            main.classList.toggle('close')
        }, 100)


        setTimeout(() => {
            areaCart.style.transition = 'none';
        }, 1100)

    }
}