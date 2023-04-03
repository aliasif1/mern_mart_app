import styled from "styled-components"
import Navbar from "../components/Navbar"
import { Mobile } from "../responsive"
import { useCartContext } from '../hooks/useCartContext';
import { Link, useNavigate } from "react-router-dom";
import ShippingModal from "../components/ShippingModal";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Snackbar } from "@mui/material";

const Container = styled.div`
    padding: 24px;
    ${Mobile({padding: "10px"})}
`

const CartDetails = styled.div`
    margin: 24px 0px;
    display: flex;
    gap: 12px;
    align-items: flex-start;

    @media only screen and (max-width: 800px){
        flex-direction: column;
        align-items: stretch;
    }

    ${Mobile({flexDirection: "column", alignItems:"stretch"})}
`
const CartItems = styled.div`
    flex: 2;
`
const CartSummary = styled.div`
    flex: 1;
    padding: 12px;
    border: 0.5px solid gray;
    border-radius: 12px;
    background-color: white;
`
const Product = styled.div`
    display: flex;
    padding: 12px 0px;
    border-bottom: 0.5px solid gray;
    ${Mobile({flexDirection: "column", alignItems: "center"})}
`
const ProductImageContainer = styled.div`
    height: 120px;
    width: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 0.5px solid gray;
`
const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`
const ProductInfoContainer = styled.div`
    flex: 1;
    padding: 0px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${Mobile({flexDirection: "column", padding: "12px"})}
`
const ProductDescription = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`
const PriceDescription = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    ${Mobile({padding: "10px 0px"})}
`
const Detail = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`
const Key = styled.div`
    font-weight: 400;
`
const Value = styled.div``

const Color = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${props => props.bg};
`

const Title = styled.h1`
    margin: 0px;
    font-weight: 300;
    font-size: 2.5rem;
    text-align: left;
    ${Mobile({fontSize: "1.5rem"})}
`
const ShoppingOptions = styled.div`
    margin-top: 12px;
    display: flex;
    justify-content: flex-start;
    gap: 24px;
    ${Mobile({gap:"10px"})}
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
const Quantity = styled.div`
    display: flex;
    align-items: center;
`

const Block = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border-radius: 12px;
    background-color: transparent;
    border: 1px solid gray;
    color: black;
    font-size: 1.8rem;
    font-weight: bold;
    opacity: 0.8;
    &:hover {
        cursor: pointer;
        opacity: 1;
        background-color: whitesmoke;
    }
`
const Amount = styled.span`
    font-size: 1.2rem;
    padding: 0px 12px;
`

const ProductPrice = styled.div`
    text-align: center;
    font-size: 1.5rem;
`

const SummaryTitle = styled.div`
    text-align: center;
    font-size: 1.5rem;
    font-weight: 400;
`
const SummaryDescription = styled.div`
    padding: 12px 0px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`
const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
`


const Cart = () => {
    const cart = useCartContext();
    const {user} = useAuthContext();
    const [showShippingModal, setShowShippingModal] = useState(false);
    const navigate = useNavigate();
    const [showLoginSnackbar, setShowLoginSnackbar] = useState(false);

    const onCheckout = () => {
        if(!user){
            return setShowLoginSnackbar(true);
        }
        setShowShippingModal(true);
    }

    const closeShippingModal = async (shippingDetails) => {
        // if the user didnt cancelled but placed order
        if(shippingDetails){
            //save to db
            try{
                const orderData = {products: cart.cartProducts, ...shippingDetails, amount: cart.totalPrice, shipTo: shippingDetails.name, address: shippingDetails.address}
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": 'Bearer ' + user.token
                    },
                    body: JSON.stringify(orderData)
                });
            }
            catch(e){
                console.log(e.message);
            }

            // clear the cart
            cart.dispatch({
                type: 'EMPTY_CART',
                payload: []
            })
            setShowShippingModal(false);
            navigate("/orders");
        }
        setShowShippingModal(false);
    }

    const updateCart = (kind, item) => {
        if(kind === 'increase'){
            cart.dispatch({
                type: 'INCREASE_PRODUCT_COUNT_BY_ONE',
                payload: item
            });
        }
        else if(kind === 'decrease'){
            if(item.quantity > 1){
                cart.dispatch({
                    type: 'DECREASE_PRODUCT_COUNT_BY_ONE',
                    payload: item
                });
            }
            else{
                cart.dispatch({
                    type: 'REMOVE_PRODUCT',
                    payload: item
                });    
            }
        }
        else if(kind === 'remove'){
            cart.dispatch({
                type: 'REMOVE_PRODUCT',
                payload: item
            });
        }
     }
    return (
    <div>
        <Navbar />
        <Snackbar
            open={showLoginSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            message="You must be logged in to place an order" 
            onClose={() => {setShowLoginSnackbar(false)}}
        />
        <Container>
            <Title>Your Cart {cart.numItems === 0 && 'is Empty'}</Title>
            <ShoppingOptions>
                <Link to={'/'}><Button bg="offWhite" color="black" border="0.5px solid gray">Continue Shopping</Button></Link>
                {
                cart.numItems > 0 &&  
                <Button bg="teal" color="white" border="none" onClick={onCheckout}>Checkout Now</Button>
                } 
            </ShoppingOptions>
            <CartDetails>
                {cart.numItems > 0 &&
                <CartItems>
                    {
                    cart.cartProducts.map(item => (
                    <Product key={`${item._id}${item._color}${item._size}`}>
                        <ProductImageContainer>
                        <Image src={item.img} />
                        </ProductImageContainer>
                        <ProductInfoContainer>
                            <ProductDescription>
                                <Detail>
                                    <Key>Product Name:</Key>
                                    <Value>{item.title}</Value>
                                </Detail>
                                <Detail>
                                    <Key>Size:</Key>
                                    <Value>{item.size}</Value>
                                </Detail>
                                <Detail>
                                    <Key>Color:</Key>
                                    <Color bg={item.color}/>
                                </Detail>
                            </ProductDescription>
                            <PriceDescription>
                                <Quantity>
                                    <Block onClick={() => updateCart('decrease', item)}>-</Block>
                                    <Amount>{item.quantity}</Amount>
                                    <Block onClick={() => updateCart('increase', item)}>+</Block>
                                </Quantity>
                                <ProductPrice>${item.quantity * item.price}</ProductPrice>
                            </PriceDescription>
                        </ProductInfoContainer>
                    </Product>
                    ))
                    }
                </CartItems>
                }
                {
                cart.numItems > 0 && 
                <CartSummary>
                    <SummaryTitle>Cart Summary</SummaryTitle>
                    <SummaryDescription>
                        <SummaryItem>
                            <Key>Subtotal:</Key>
                            <Value>${cart.totalPrice}</Value>
                        </SummaryItem>
                        <SummaryItem>
                            <Key>Shipping:</Key>
                            <Value>$10.00</Value>
                        </SummaryItem>
                        <SummaryItem>
                            <Key>Discount:</Key>
                            <Value>$10.00</Value>
                        </SummaryItem>
                        <hr></hr>
                        <SummaryItem>
                            <Key>Total:</Key>
                            <Value>${cart.totalPrice}</Value>
                        </SummaryItem>
                        <Button bg="teal" color="white" border="none" onClick={onCheckout}>Checkout Now</Button> 
                    </SummaryDescription>
                </CartSummary>
                }
            </CartDetails>
        </Container>
        {showShippingModal && <ShippingModal closeShippingModal={closeShippingModal}/>}
    </div>
  )
}

export default Cart
