import {
    BASKET_LOADED,
    BASKET_UPDATED,
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
                items: action.cartItems,
            }
        default:
            return state;
    }
}

export default basketReducer;
