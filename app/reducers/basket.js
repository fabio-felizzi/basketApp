import {
    BASKET_LOADED,
    BASKET_UPDATED,
    BASKET_CLEARED,
    BASKET_ITEM_INC,
    BASKET_ITEM_DEC,
    BASKET_ITEM_REMOVED
} from '../actions/basket';

function basketReducer(state={ items: {} }, action) {
    switch(action.type) {
        case BASKET_LOADED:
            return {
                ...state, 
                id: action.cartId,
                items: action.cartItems,
            }
        case BASKET_UPDATED:
            return {
                ...state,
                id: action.cartId,
                items: action.cartItems,
            }
        case BASKET_CLEARED:
            return {
                ...state,
                id: action.cartId,
                items: action.cartItems,
            }
        case BASKET_ITEM_INC:
            return {
                ...state,
                id: action.cartId,
                items: action.cartItems,
            }
        case BASKET_ITEM_DEC:
            return {
                ...state,
                id: action.cartId,
                items: action.cartItems,
            }
        case BASKET_ITEM_REMOVED:
            return {
                ...state,
                id: action.cartId,
                items: action.cartItems,
            }
        default:
            return state;
    }
}

export default basketReducer;
