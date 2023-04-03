import React, {useEffect, useReducer, useState} from 'react';

export const CartContext = React.createContext();

const cartReducer = (state, action) => {
    switch(action.type){
        case 'UPDATE_PRODUCT':
            // check if the product with the same id, color and size is already present in cart.
            const newProduct = action.payload;
            const prevProducts = state.cartProducts;
            const existingProduct = prevProducts.find((product) => product._id === newProduct._id && product.color === newProduct.color && product.size === newProduct.size)
            if(existingProduct) {
                const updatedProducts = prevProducts.map((product) => {
                    if(product._id === newProduct._id && product.color === newProduct.color && product.size === newProduct.size){
                        return {...product, quantity: product.quantity + newProduct.quantity}
                    }
                    return product
                })
                return {cartProducts: updatedProducts}
            }
            return {cartProducts: [...prevProducts, newProduct]}

        case 'DECREASE_PRODUCT_COUNT_BY_ONE': // only from cart screen
            return {cartProducts: state.cartProducts.map((product) => {
                if(product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size){
                     return {...product, quantity: product.quantity -1}
                }
                return product
            })}
        case 'INCREASE_PRODUCT_COUNT_BY_ONE': // only from cart screen
            return {cartProducts: state.cartProducts.map((product) => {
                if(product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size){
                     return {...product, quantity: product.quantity  + 1}
                }
                return product
            })}
        case 'REMOVE_PRODUCT':
            return {cartProducts: state.cartProducts.filter((product) => !(product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size))}

        case 'EMPTY_CART':
            return { cartProducts: []}
            
        default:
            return state
    }
}

const CartContextProviderComponent = (props) => {
    const [state, dispatch] = useReducer(cartReducer, {cartProducts: []})
    const [cartStats, setCartstats] = useState({numItems: 0, totalPrice: 0});
    const updateCartStats = () => {
        const numItems = state.cartProducts.length;
        let totalPrice = 0;
        state.cartProducts.forEach(product => {
            totalPrice+= (product.quantity * product.price); 
        });
        setCartstats({numItems, totalPrice}); 
    }

    useEffect(() => {
        updateCartStats()
    },[state])

    return(
        <CartContext.Provider value={{...state, ...cartStats, dispatch}} >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProviderComponent;