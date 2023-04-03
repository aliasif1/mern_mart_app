import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import styled from 'styled-components';
import { Mobile } from '../responsive';
import { useAuthContext } from '../hooks/useAuthContext';
import Order from '../components/Order';
import { Link } from 'react-router-dom';

const Container = styled.div`
    padding: 24px;
    ${Mobile({padding: "10px"})}
`

const Title = styled.h1`
    margin: 0px;
    font-weight: 300;
    font-size: 2.5rem;
    text-align: left;
    ${Mobile({fontSize: "1.5rem"})}
`

const Button = styled.button`
    font-size: 1rem;
    padding: 12px 24px;
    background-color: ${(props => props.bg)};
    border: ${(props => props.border)};
    color: ${(props => props.color)};
    opacity: 0.8;
    border-radius: 8px;
    transition: 0.5s ease;
    &:hover {
        cursor: pointer;
        opacity: 1;
    }
    ${Mobile({padding: "10px"})}
`

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useAuthContext();

    useEffect(() => {
        const getOrders = async () =>{
            try{
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/find/${user.id}`, {
                    headers: {
                        "authorization": 'Bearer ' + user.token
                    },
                });
                const json = await res.json();   
                if(res.ok){
                    setIsLoading(false);
                    setOrders(json);
                }
            }
            catch(e){
                console.log(e.message);
            }
        } 
        user && getOrders();
    }, [user])
    
    return(
        <div>
            <Navbar />
            <Container>
                <Title>Your Orders</Title>
                <Link to={'/'}><Button bg="offWhite" color="black" border="0.5px solid gray">Continue Shopping</Button></Link>
                {isLoading && <h4>Loading</h4>}
                {orders.length === 0 ? <h3>No orders Found</h3> : orders.map((order) => <Order key={order._id} order={order} />)}
            </Container>
        </div>
    )
}

export default Orders;