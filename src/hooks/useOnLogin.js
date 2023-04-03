import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useOnLogin = () => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useAuthContext();
    const onLogin = async ({email, password}) => {
        try{
            setIsLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });
            setIsLoading(false);
            const json = await res.json();
            if (!res.ok) {
                setError(json.error)
            }
            else{
                // Clear the error
                setError(null)
                // save to local storage 
                localStorage.setItem('user', JSON.stringify(json));
                // save to context
                dispatch({
                    type: 'LOGIN',
                    payload: json
                })
            }
        }
        catch(e){
            setIsLoading(false)
            setError(e.message)
        }
    }

    return [error, setError, isLoading, onLogin]

}
