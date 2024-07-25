export const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  selectedItems: [],
};

export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.item.id
      );
      let newCart = [...state.cart];

      if (itemIndex >= 0) {
        // Item already exists in cart, increase quantity
        newCart[itemIndex] = {
          ...newCart[itemIndex],
          quantity: newCart[itemIndex].quantity + 1,
        };
      } else {
        // Item does not exist in cart, add it with quantity 1
        newCart = [...state.cart, { ...action.item, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(newCart)); // Save to localStorage

      return {
        ...state,
        cart: newCart,
      };
    }
    case "SET_SELECTED_ITEMS": {
      return {
        ...state,
        selectedItems: action.items,
      };
    }
    case "REMOVE_FROM_CART": {
      const index = state.cart?.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      let newCart = [...(state.cart || [])];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as it's not in cart!`
        );
      }
      localStorage.setItem("cart", JSON.stringify(newCart)); // Save to localStorage

      return {
        ...state,
        cart: newCart,
      };
    }
    case "SET_USER": {
      console.log("Action payload:", action.user);
      localStorage.setItem("user", JSON.stringify(action.user)); // Save to localStorage
      return {
        ...state,
        user: action.user,
      };
    }
    case "CLEAR_USER": {
      localStorage.removeItem("user"); // Clear user from localStorage
      return {
        ...state,
        user: null,
      };
    }
    case "CLEAR_CART": {
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: [],
      };
    }
    case "SET_CART": {
      localStorage.setItem("cart", JSON.stringify(action.cart));
      return {
        ...state,
        cart: action.cart,
      };
    }
    default:
      return state;
  }
};

export default reducer;
