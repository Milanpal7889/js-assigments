var data;
var cart = [];
var ProductArray=[]
var newDict={}
var cratArray = [];
var quantity =0

var quantityOrder = document.getElementById("quantity")
var CartId;
var Product_list = document.getElementById("Product-List");
var Products = document.getElementById("products");
var CartProducts = document.getElementById("Cart-products");
var productDiv;


function addtoCart(id) {
  if (newDict.hasOwnProperty(id)) {
    newDict[id] += 1;
    console.log("working", newDict);
  } else {
    newDict[id] = 1; 
    console.log("new product added", newDict);
  }
if (!(cart.includes(id))){
  cart.push(id);
}
  console.log(cart);
  showcart();
}




async function FetchAPI() {
  const response = await fetch("https://fakestoreapi.com/products");
  data = await response.json();
  data.map((res) => {
    
    cratArray.push(res);
    return (
      
      (productDiv = document.createElement("div")),
      ProductArray = data,
      (productDiv.innerHTML = `
      <div id="productBox">
        <img src="${res.image}" alt="${res.title}">
        <h3>${res.title}</h3>
        <p>$ ${res.price}</p>
        <input id="quantity-${res.id}" placeholder="quantity"/>
        <button id="addtocart" onclick="addtoCart(${res.id})">Add To Cart</button>
      </div>
    `;
    
  });
}




function removeFromCart(id) {
  cart.splice(cart.indexOf(id), 1);
  console.log(cart);
  showcart();
}


function showcart() {
  Product_list.innerHTML = "";
  cart.forEach((id) => {
    const product = cratArray.find((product) => product.id === id);
    Product_list.innerHTML += `
      <div id="Cart-productBox">
      <div id ="Cart-product-name">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        </div>
        <p>${product.category}</p>
        <p>$ ${product.price}</p>
        <p>${newDict[id]}</p>
        <p>$ ${product.price*newDict[id]}</p>
        <button id="remove" onclick="removeFromCart(${product.id})">Remove</button>
      </div>
      <hr>`;
  });
}




FetchAPI();

