import { useContext } from "react"
import { CartContext } from "../contexts/CartContext";

export const useCartContext = () => {
    const context = useContext(CartContext)
    if(!context){
        throw "Context is not available";
    }
    return context;
}

