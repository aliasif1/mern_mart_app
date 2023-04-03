import React from 'react'
import styled from 'styled-components'
import ModalContainer from './ModalContainer'
import { Mobile } from '../responsive'
import { useRef } from 'react'
import { useState } from 'react'

const Modal = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgba(100,100,100,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  background-color: white;
  padding: 24px;
  width: 80%;
  max-width:600px;
  border-radius: 12px;
`

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 400;
    text-align: center;
    ${Mobile({fontSize: "1.5rem"})}
`

const SubTitle = styled.h3`
    font-weight: 400;
`

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`
const Input = styled.input`
    font-size: 1.2rem;
    padding: 12px 8px;
    border: none;
    background-color: whitesmoke;
    border-radius: 8px;
    ${Mobile({fontSize: "1rem"})}
`
const Button = styled.button`
    font-size: 1.2rem;
    padding: 12px;
    background-color: ${(props) => props.bg};
    border: none;
    color: white;
    width: 100%;
    opacity: 0.8;
    border-radius: 8px;
    transition: 0.5s ease;
    &:hover {
        cursor: pointer;
        opacity: 1;
    }
    ${Mobile({fontSize: "1rem"})}
`

const Error = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: red;
    text-align: center;
`

const ShippingModal = ({closeShippingModal}) => {
  const nameRef = useRef();
  const addressRef = useRef();
  const mobileRef = useRef();
  const [error, setError] = useState();

  const placeOrder = () => {
    setError('');
    const name = nameRef.current.value.trim()
    if (!name) {
      return setError('Name cannot be empty')
    }
    const address = addressRef.current.value.trim()
    if (!address) {
      return setError('Address cannot be empty')
    }
    const mobile = mobileRef.current.value.trim()
    closeShippingModal({name, address});
  }

  const cancelOrder = () => {
    closeShippingModal(false);
  }

  return (
    <ModalContainer>
      <Modal>
        <Card>
            <Title>Shiping Details</Title>
            <SubTitle>SHIP TO:</SubTitle>
            <Form onSubmit={placeOrder}>
                <Input ref={nameRef} placeholder="Name"/>
                <Input ref={addressRef} placeholder="Address"/>
                <Input ref={mobileRef} placeholder="Mobile"/>
                <SubTitle>Payment Method: Cash on Delivery</SubTitle>
                <Button bg="teal" type="submit" onClick={placeOrder}> Place Order</Button>
                <Button bg="red" type="submit" onClick={cancelOrder}>Cancel</Button>
                {error && <Error>{error}</Error>}
            </Form>
        </Card>
      </Modal>
    </ModalContainer>
  )
}

export default ShippingModal
