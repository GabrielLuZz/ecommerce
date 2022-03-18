let cart = [];

function lightDark() {
    let luminosidade = document.querySelector('header > img');
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

function getProductsByCategory(category = 'todos') {
    if (category.toLowerCase() === 'todos') {
        return products;
    } else {
        return products.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
}

function getProductsByName(name) {
    return products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
}

function showProductsInVitrine(filtered = products) {
    let vitrine = document.querySelector('main');
    vitrine.innerHTML = '';

    for (let i = 0; i < filtered.length; i++) {
        let product = document.createElement('article');

        product.classList.add('card');
        product.setAttribute('data-inCart', `${filtered[i].inCart}`)

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

function addCart(product) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].name === product.childNodes[3].childNodes[3].innerText) {
            if (parseInt(product.getAttribute('data-inCart')) === 0) {
                cart.push(products[i]);
                products[i].inCart++;
            }
        }
    }

    updateCart()
}

function removeCart(product) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].name === product.children[0].innerText) {

            cart.splice(cart.findIndex(item => item.name === products[i].name), 1);
            products[i].inCart = 0;
        }
    }

    updateCart()
}

function showProductsInCart(somaAmount) {
    if (somaAmount > 0) {
        let areaCart = document.querySelector('.cart section:nth-child(2)');
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
                <div class="cart--item--qt">${getProductsByName(cart[i].name)[0].inCart}</div>
                <button class="cart--item-qtmais">+</button>
            </div>`;

            areaCart.appendChild(item);
        }
    }



}

function updateCart() {
    let areaCart = document.querySelector('.cart section:nth-child(2)');
    let cartInfos = document.querySelector('.cart-infos');
    let currents = document.querySelectorAll('.card');
    let array = [];

    for (let i = 0; i < currents.length; i++) {
        array.push(products.find(item => item.name === currents[i].children[1].children[1].innerText))
    }

    showProductsInVitrine(array)

    let amount = document.querySelector('.amount .second');
    let total = document.querySelector('.total .second');
    let cartOpener = document.querySelector('.cart-opener span');
    let somaTotal = 0;
    let somaAmount = 0;

    for (let i = 0; i < products.length; i++) {
        somaTotal += parseInt(products[i].price) * products[i].inCart;
        somaAmount += products[i].inCart;
    }

    amount.innerText = somaAmount;
    cartOpener.innerText = somaAmount;
    total.innerText = `R$ ${somaTotal.toFixed(2)}`;



    if (somaAmount === 1) {

        areaCart.innerHTML = '';
        areaCart.classList.remove('cart-products-without');
        areaCart.classList.add('cart-products-full');

        cartInfos.style.display = 'flex';

    }

    if (somaAmount === 0) {
        if (document.querySelector('.openCart')) {
            document.querySelector('.openCart').style.transition = 'width 0.4s';
            document.querySelector('.cart').classList.remove('openCart')
            document.querySelector('main').classList.remove('close')
        }

        setTimeout(() => {
            areaCart.innerHTML = '';

            let h2 = document.createElement('h2');
            let small = document.createElement('small');

            h2.innerText = 'Carrinho Vazio';
            small.innerText = 'Adicione itens';

            areaCart.appendChild(h2);
            areaCart.appendChild(small);

            areaCart.classList.remove('cart-products-full');
            areaCart.classList.add('cart-products-without');

            cartInfos.style.display = 'none';
            document.querySelector('.cart').removeAttribute('style');
        }, 300)


    }

    showProductsInCart(somaAmount)


}

function increaseAmount(name) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].name === name) {
            products[i].inCart++;
        }
    }

    updateCart();
}

function decreaseAmount(name) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].name === name) {
            products[i].inCart--;

            if (products[i].inCart === 0) {
                cart.splice(cart.findIndex(item => item.name === products[i].name), 1);
            }
        }
    }

    updateCart();
}

function toggleMenu() {
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