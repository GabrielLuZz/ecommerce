showProductsInVitrine()

let luminosidade = document.querySelector('header > img');

let ul = document.querySelector('header nav ul');

let search = document.querySelector('aside form button');

let main = document.querySelector('main');

let area = document.querySelector('.cart section:nth-child(2)');

let cartOpener = document.querySelector('.cart-opener span:nth-child(2)');

let cartCloser = document.querySelector('.cart-header span');

let menuOpener = document.querySelector('.menu-opener img');




luminosidade.addEventListener('click', lightDark);

ul.addEventListener('click', (e) => {
    if (e.path[0].nodeName === "LI") {
        let products = getProductsByCategory(e.target.getAttribute('data-category'));
        showProductsInVitrine(products);

        let currentSelected = document.querySelector('.selected');
        currentSelected.classList.remove('selected');

        e.target.classList.add('selected')

    }
});

search.addEventListener('click', (e) => {
    e.preventDefault();

    let value = document.querySelector('aside form input').value;

    if (value.length > 0) {
        let products = getProductsByName(value);
        showProductsInVitrine(products);
    }

});

main.addEventListener('click', (e) => {

    if (e.path[0].nodeName === "BUTTON") {
        addCart(e.path[2]);
    }

    let menu = document.querySelector('header nav ul');
    menu.classList.remove('open')
});

area.addEventListener('click', (e) => {

    if (e.path[0].className === 'cart--item-qtmais') {
        let titulo = e.path[2].children[1].children[0].innerText;

        increaseAmount(titulo);
    }

    if (e.path[0].className === 'cart--item-qtmenos') {
        let titulo = e.path[2].children[1].children[0].innerText;

        decreaseAmount(titulo);
    }

    if (e.path[0].innerText === 'Remover produto') {
        removeCart(e.path[1])
    }
});

cartOpener.addEventListener('click', toggleCart);

cartCloser.addEventListener('click', toggleCart);

menuOpener.addEventListener('click', toggleMenu);