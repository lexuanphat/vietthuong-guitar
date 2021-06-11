let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Gói Combo 2B bộ trống Pearl Export EXX725FP',
        tag: 'img_product-item-drum_4',
        price: 27.070,
        inCart: 0

    },
]
for (let i = 0; i<carts.length; i++){
    carts[i].addEventListener('click', ()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers)
    if(productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('ProductsInCart');
    cartItems = JSON.parse(cartItems)
    
    if(cartItems != null){
        if(cartItems[product.tag]==undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }


    localStorage.setItem('ProductsInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem("ProductsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".product-cart");
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <i class="fa fa-times-circle btn-remove"></i>
                    <img src="./img/${item.tag}.jpg">
                    <span>${item.name}</span>
                </div>
                <div class="price">$${item.price},00</div>
                <div class="quantily">
                    <i class="fa fa-caret-left"></i>
                    <span>${item.inCart}</span>
                    <i class="fa fa-caret-right"></i>
                </div>
                <div class="total">
                    $${item.inCart * item.price},00
                </div>
            `;

        });
        productContainer.innerHTML += `
        <div class="basketTotal">
            <h4 class="basketTotalTilte">
                Tổng cộng: 
            </h4>
            <h4 class="basketTotalprice">
                $${cartCost},00
            </h4>
        </div>
        `;
        
    }
}


onLoadCartNumbers();
displayCart();