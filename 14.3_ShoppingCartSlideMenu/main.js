if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else {
   ready();
}

//________________________________________________________________________________________

// Cart Open/Close
let cartIconHTML = document.querySelector('[data-cart-icon]');
let cartMenuHTML = document.querySelector('[data-cart-menu]');
let cartCloseHTML = document.querySelector('[data-btn-cart-close]');

cartIconHTML.addEventListener('click', OpenCartMenu);

cartCloseHTML.addEventListener('click', function CloseCartMenu(){
    cartMenuHTML.classList.remove('active');
});

function OpenCartMenu(){
    cartMenuHTML.classList.add('active');
};

//________________________________________________________________________________________

// Cart functionality
function ready(){
    updateCartPriceSum(); 

    //  removing product from cart
    let removeFromCartBtnHTML = document.querySelectorAll('[data-btn-delete]');
    for (let i = 0; i < removeFromCartBtnHTML.length; i++){
        let removeCartBtnJS = removeFromCartBtnHTML[i];
        removeCartBtnJS.addEventListener('click', removeCartItemJS);
    };

    // adding product to the cart
    let btnsBuyHTML  = document.querySelectorAll('[data-btn-addToCart]');
    for (let i = 0; i < btnsBuyHTML .length; i++){
        let btnBuyJS = btnsBuyHTML[i];
        btnBuyJS.addEventListener('click', addToCartReadData);
        btnBuyJS.addEventListener('click', OpenCartMenu);
    }; 

    // quantity change
    let quantityInputsHTML = document.querySelectorAll('[data-cart-item-quantity]')
    for (let i = 0; i < quantityInputsHTML.length; i++){
         let quantityInputJS = quantityInputsHTML[i];
         quantityInputJS.addEventListener('change', quantityChange)
    };

    // BuyButton
    // let buyBtnHTML = document.querySelectorAll('[data-btn-buy-cart]');
    // for (let i = 0; i < buyBtnHTML.length; i++){
    //     let buyBtnJS = buyBtnHTML[i];
    //     buyBtnJS.addEventListener('click', BuyNow);
    // };
    let buyBtnHTML = document.querySelectorAll('[data-btn-buy-cart]')[0];
    buyBtnHTML.addEventListener('click', BuyNow);
};

//________________________________________________________________________________________

// Removing product form cart
function removeCartItemJS(event){
    let btnRemoveClicked = event.target;
    btnRemoveClicked.parentElement.remove();
    updateCartPriceSum();
};

//________________________________________________________________________________________

// Adding product to the cart
function addToCartReadData(event){
    let btnAddClicked = event.target;
    let shopProducts = btnAddClicked.parentElement;
    let title = shopProducts.querySelectorAll('[data-product-title]')[0].innerText;
    let price = shopProducts.querySelectorAll('[data-price]')[0].innerText;
    let productImg = shopProducts.querySelectorAll('[data-product-img]')[0].src;

    addProductToCartList(title, price, productImg);
    updateCartPriceSum();
};

function addProductToCartList(title, price, productImg){
    let cartContentNewHTML = document.createElement('div');
    cartContentNewHTML.classList.add('cart-content');
    cartContentNewHTML.dataset.cartContent="";
    
    let cartItemsContainer = document.querySelectorAll('[data-cart-container]')[0];
    let cartItemsNames = cartItemsContainer.querySelectorAll('[data-cart-item-title]');

    for (let i = 0; i < cartItemsNames.length; i++){
        //@ts-ignore
        if (cartItemsNames[i].innerText == title){
            alert('Produkt jest już w koszyku'); 
            return;
        }
    }

    let cartContent = `
        <img src="${productImg}" alt="" class="cart-img">

        <div class="cart-details">
            <div class="cart-item-title" data-cart-item-title="">${title}</div>
            <div class="cart-item-price" data-cart-item-price="">${price}</div>
            <input class="cart-item-quantity" data-cart-item-quantity="" type="number" value="1">

        </div>

        <i class="fas fa-trash btn-delete" data-btn-delete=""></i>
    `;
    cartContentNewHTML.innerHTML = cartContent;
    cartItemsContainer.append(cartContentNewHTML);
    cartContentNewHTML.querySelectorAll('[data-btn-delete]')[0].addEventListener('click', removeCartItemJS);
    cartContentNewHTML.querySelectorAll('[data-cart-item-quantity]')[0].addEventListener('change', quantityChange);
    updateCartPriceSum(); 
};

//________________________________________________________________________________________

// Update CartPriceSum
function updateCartPriceSum(){
    let cartContainerHTML = document.querySelectorAll('[data-cart-container]')[0];
    let cartItemsHTML = cartContainerHTML.querySelectorAll('[data-cart-content]');
    let priceSum = 0;

    for (let i = 0; i < cartItemsHTML.length; i++){
        let cartContent1ItemJS = cartItemsHTML[i];
        let price_1Item = cartContent1ItemJS.querySelectorAll('[data-cart-item-price]')[0];
        let quantity_1Item = cartContent1ItemJS.querySelectorAll('[data-cart-item-quantity]')[0];
        // @ts-ignore
        let quantityValue = quantity_1Item.value;
        // @ts-ignore
        let price = parseFloat(price_1Item.innerText);

        priceSum = priceSum + (price * quantityValue); 
 
        // @ts-ignore
    };
    // @ts-ignore
    document.querySelectorAll('[data-priceSum-price]')[0].innerText = priceSum.toFixed(2) + ' zł';          
 
};

//________________________________________________________________________________________

// Quantity change
function quantityChange(event){ 
    let quantityInput = event.target;
    if (isNaN(quantityInput.value) || quantityInput.value <= 0){
        quantityInput.value = 1;
    }
    updateCartPriceSum(); 
};

//________________________________________________________________________________________

// BuyNow Finish Cart
function BuyNow(){
    alert('Dziękujemy za zakupy');

    let cartContainer = document.querySelector('[data-cart-container]');
    while (cartContainer.hasChildNodes()){
        cartContainer.removeChild(cartContainer.firstChild);
        updateCartPriceSum();
    };
}