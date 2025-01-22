import { getCartLength } from "./getCartLength.js";
import successToast from "../assets/utility/successToast.js";

document.addEventListener("DOMContentLoaded", () => {

  const getCart = () => JSON.parse(localStorage.getItem("myCart")) || [];
  const updateCart = (cart) => localStorage.setItem("myCart", JSON.stringify(cart));
  const getFoodList = () => JSON.parse(localStorage.getItem("FoodList")) || [];

  getCartLength();

  const addToCart = () => {
    const foodItems = document.querySelectorAll(".foodItem");
    const FoodList = getFoodList();

    if (!FoodList.length) {
      alert("FoodList not found in localStorage!");
      return;
    }

    foodItems.forEach((item) => {
      const id = item.id;
      if (!id) {
        console.error("ID not found for food item!");
        return;
      }

      item.addEventListener("click", (e) => {
        const cart = getCart();
        const foodQuantity = item.querySelector(".foodQuantity");
        let quantity = parseInt(foodQuantity.getAttribute("data-quantity")) || 1;

        if (e.target.classList.contains("increaseQuantity")) {

          quantity++;
        } else if (e.target.classList.contains("decreaseQuantity")) {
          quantity--;
          if (quantity < 1) {
            alert("Enter a valid quantity");
            return;
          }
        }

        foodQuantity.innerHTML = quantity;
        foodQuantity.setAttribute("data-quantity", quantity);

        if (e.target.classList.contains("addToCart")) {
          const productInCart = cart.find((product) => product._id === id);

          if (productInCart) {
            successToast("Product added to cart!");
            productInCart.quantity += quantity;
          } else {
            const productToAdd = FoodList.find((product) => product._id === id);
            if (productToAdd) {
              cart.push({ ...productToAdd, quantity });
            } else {

              console.error("Product not found in FoodList!");
              return;
            }
          }

          updateCart(cart);
          getCartLength();
          console.log("Cart updated:", cart);
        }
      });
    });
  };

  addToCart();
});
