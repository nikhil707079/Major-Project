//javascript
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    });
}
if (close) {
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    });
}
// Redirect to the product details page
const redirect = (bigImg, smallImg1, smallImg2, smallImg3, brand, productName, price) => {
    const details = {
        bigImg,
        smallImg1,
        smallImg2,
        smallImg3,
        brand,
        productName,
        price,
    };
    localStorage.setItem("Detail", JSON.stringify(details));
    window.location.href = "./Singal-page.html";
};

document.addEventListener("DOMContentLoaded", function () {
    const productDetails = JSON.parse(localStorage.getItem("Detail"));

    if (productDetails) {
        const spage = document.getElementById("spage");
        spage.innerHTML = `<div class="image">
                <img src="${productDetails.bigImg}" alt="" id="mainImg" class="mainImg">
                <div id="smallImages">
                    <div class="small-image">
                        <img class="sImg" src="${productDetails.smallImg1}" width="100%" alt="">
                    </div>
                    <div class="small-image">
                        <img class="sImg" src="${productDetails.smallImg2}" width="100%" alt="">
                    </div>
                    <div class="small-image">
                        <img class="sImg" src="${productDetails.smallImg3}" width="100%" alt="">
                    </div>
                </div>
            </div>
            <div class="productDetails">
                <h4>${productDetails.brand}</h4>
                <h3>${productDetails.productName}</h3>
                <h6>Rs. ${productDetails.price}</h6>
                <select name="select size" id="size">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
                <div class="addTocart">
                    <input type="number" max="10" min="1" value="1" id="quantity">
                    <button class="cartButton btn">Add To Cart</button>
                </div>
                <h4 id="details">Product Details:</h4>
                <p>Stylish and comfortable, this shirt, jeans, and shoe ensemble complements a classic watch, creating a versatile and fashionable outfit for any occasion.</p>
            </div>`;

        // Scripts for changing images in product details page
        var mainImg = document.getElementById("mainImg");
        var smallImgs = document.getElementsByClassName("sImg");

        smallImgs[0].onclick = function () {
            mainImg.src = smallImgs[0].src;
        };
        smallImgs[1].onclick = function () {
            mainImg.src = smallImgs[1].src;
        };
        smallImgs[2].onclick = function () {
            mainImg.src = smallImgs[2].src;
        };

        // Add to cart function
        const addToCart = () => {
            const productDetails = JSON.parse(localStorage.getItem("Detail"));
            let cartDetails = JSON.parse(localStorage.getItem("cart") || "[]");

            if (productDetails) {
                const size = document.getElementById("size").value;
                const quantity = parseInt(document.getElementById("quantity").value);
                const productToAddInCart = {
                    bigImg: productDetails.bigImg,
                    productName: productDetails.productName,
                    price: productDetails.price,
                    size: size,
                    quantity: quantity,
                };

                cartDetails.push(productToAddInCart);
                localStorage.setItem("cart", JSON.stringify(cartDetails));
                alert("Added to cart");
                window.location.href = "./Cart-page.html"; // Updated to match the correct filename
            }
        };

        const selectCart = document.getElementsByClassName("cartButton");
        selectCart[0].addEventListener("click", addToCart);
    }
});

// Checkout page
document.addEventListener("DOMContentLoaded", () => {
    const addedProducts = JSON.parse(localStorage.getItem("cart") || "[]");
    const checkout = document.getElementById("cardItem");
    const cartTotal = document.getElementsByClassName("cartAdd");
  
    if (!checkout || !cartTotal.length) {
        console.error("Cart elements not found");
        return;
    }

    if (addedProducts.length === 0) {
        checkout.innerHTML = "<tr><td colspan='7'>Cart Empty</td></tr>";
        cartTotal[0].innerHTML = `
            <h3>Cart Total</h3>
            <table>
                <tr><td>Cart Subtotal</td><td>Rs. 0</td></tr>
                <tr><td>Shipping Charge</td><td>Free</td></tr>
                <tr><td><strong>Total Amount</strong></td><td><strong>0</strong></td></tr>
            </table>
            <button id="cartButton" disabled>Place Order</button>
        `;
        return;
    }

    // Render cart rows
    checkout.innerHTML = addedProducts.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        return `<tr>
            <td><img src="${item.bigImg}" width="50" alt="${item.productName}"></td>
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>${item.size}</td>
            <td>Rs. ${item.price}</td>
            <td>Rs. ${itemTotal}</td>
            <td style="cursor: pointer" onclick="remove(${index})"><i class="far fa-times-circle"></i></td>
        </tr>`;
    }).join("");

    // Calculate total
    const totalAmount = addedProducts.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    // Display totals
    cartTotal[0].innerHTML = `
        <h3>Cart Total</h3>
        <table>
            <tr><td>Cart Subtotal</td><td>Rs. ${totalAmount}</td></tr>
            <tr><td>Shipping Charge</td><td>Free</td></tr>
            <tr><td><strong>Total Amount</strong></td><td><strong>Rs. ${totalAmount}</strong></td></tr>
        </table>
        <button id="cartButton" onclick="placeOrder()">Place Order</button>
    `;
});

// Remove item
function remove(index) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}

// Place order
function placeOrder() {
    localStorage.removeItem("cart"); // Only clear cart, not all localStorage
    alert("Order Placed Successfully!");
    window.location.href = "./INDEX.HTML";
}
