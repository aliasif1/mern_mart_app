import React, {useEffect, useReducer} from 'react';

export const AuthContext = React.createContext();

const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state;
    }
}

const AuthContextProviderComponent = (props) => {
    const [state, dispatch] = useReducer(authReducer, {user: null})
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            dispatch({
                type: 'LOGIN',
                payload: user
            })
        }
    },[])
    return(
        <AuthContext.Provider value={{...state, dispatch}} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProviderComponent;