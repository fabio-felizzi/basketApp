export const BASKET_LOADING      = 'BASKET_LOADING';
export const BASKET_LOADED       = 'BASKET_LOADED';
export const BASKET_UPDATED      = 'BASKET_UPDATED';
export const BASKET_CLEARED      = 'BASKET_CLEARED';
export const BASKET_ITEM_INC     = 'BASKET_ITEM_INC';
export const BASKET_ITEM_DEC     = 'BASKET_ITEM_DEC';
export const BASKET_ITEM_REMOVED = 'BASKET_ITEM_REMOVED';

export function loadBasket() {
    return async (dispatch, _, config) => {
        dispatch({ type: BASKET_LOADING });

        const response = await fetch(config.cartApi, { method: 'POST', body: JSON.stringify({}) });
        const basket = await response.json();

        dispatch({
            type: BASKET_LOADED,
            ...basket,
        });
    };
}

export function updateBasket(cartItems, cartId) {
    return async (dispatch, _, config) => {
        const latestBasketItem = cartItems[cartItems.length -1];
        const response = await fetch(`${config.cartApi}/${cartId}/item/${latestBasketItem.id}`, { method: 'POST', body: JSON.stringify({ "quantity": 1 }) });
        const basket = await response.json();

        if (cartItems != null) {
            dispatch({
                type: BASKET_UPDATED,
                ...basket,
            });
        }
    };
}

export function clearBasket(cartId) {
    return async (dispatch, _, config) => {
        const response = await fetch(`${config.cartApi}/${cartId}/clear`, { method: 'POST', body: JSON.stringify({}) });
        const basket = response && response.status === 204 ? {
                cartId,
                cartItems: {},
            } : {};
        
        dispatch({
            type: BASKET_CLEARED,
            ...basket,
        });
    };
}

export function incQuantity(cartId, itemId) {
    return async (dispatch, _, config) => {
        const response = await fetch(`${config.cartApi}/${cartId}/item/${itemId}/increment`, { method: 'POST', body: JSON.stringify({}) });
        const basket = await response.json();

        dispatch({
            type: BASKET_ITEM_INC,
            ...basket,
        });
    };
}

export function decQuantity(cartId, itemId) {
    return async (dispatch, _, config) => {
        const response = await fetch(`${config.cartApi}/${cartId}/item/${itemId}/decrement`, { method: 'POST', body: JSON.stringify({}) });
        const basket = await response.json();

        dispatch({
            type: BASKET_ITEM_DEC,
            ...basket,
        });
    };
}


export function deleteBasketItem(cartId, itemId) {
    return async (dispatch, _, config) => {
        const response = await fetch(`${config.cartApi}/${cartId}/item/${itemId}`, { method: 'DELETE', body: JSON.stringify({}) });
        const basket = await response.json();
        
        dispatch({
            type: BASKET_ITEM_REMOVED,
            ...basket,
        });
    };
}
