export const initialState = {
  cart: [],
  user: null,
  selectedItems: []
};

export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === action.item.id);
      let newCart = [...state.cart];

      if (itemIndex >= 0) {
        // Item already exists in cart, increase quantity
        newCart[itemIndex] = {
          ...newCart[itemIndex],
          quantity: newCart[itemIndex].quantity + 1
        };
      } else {
        // Item does not exist in cart, add it with quantity 1
        newCart = [...state.cart, { ...action.item, quantity: 1 }];
      }

      return {
        ...state,
        cart: newCart
      };
    }
    case 'SET_SELECTED_ITEMS': {
      return {
        ...state,
        selectedItems: action.items
      }
    }
    case 'REMOVE_FROM_CART': {
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
      return {
        ...state,
        cart: newCart,
      };
    }
    case 'SET_USER': {
      return {
        ...state,
        user: action.user,
      }
    }
    default:
      return state;
  }
};

export default reducer;
