import { useAuthContext } from "./useAuthContext";
import { useCartContext } from "./useCartContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch: cartDispatch} = useCartContext();
    const onLogout = () => {
        // clear the task context state
        // cartDispatch({
        //     type: 'EMPTY_CART',
        //     payload: []
        // });

        // remove from auth context
        dispatch({
            type: 'LOGOUT'
        });
        //remove from local storage
        localStorage.removeItem('user');
    }
    return [onLogout];
}