import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import styled from 'styled-components'
import { Mobile } from '../responsive'
import { useLocation } from 'react-router-dom'
import { useCartContext } from '../hooks/useCartContext'

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    ${Mobile({padding: "10px 10px", height: "90vh", flexDirection: "column"})}
`
const ImageContainer = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border-radius: 12px;
    ${Mobile({flex: "0"})}
`
const Image = styled.img`
    width: 100%;
    height: 80vh;
    object-fit: cover;
    border-radius: 12px;
    ${Mobile({height: "30vh"})}
`

const InfoContainer = styled.div`
    flex: 1;
    flex-basis: 0;
    padding: 0px 10px;
`
const Title = styled.h1`
    margin-top: 0px;
    margin-bottom: 12px;
    font-weight: 300;
    font-size: 3rem;
    ${Mobile({padding: "10px 0px", marginBottom:"0px", fontSize: "1.5rem"})}
`
const Desc = styled.p`
    margin-top: 0px;
    margin-bottom: 12px;
    font-size: 1.2rem;
    letter-spacing: 1px;
    word-spacing: 2px;
    line-height: 1.5rem;
    ${Mobile({fontSize: "1rem"})}
`

const Price = styled.div`
    margin-top: 20px;
    font-size: 2.5rem;
    font-weight: 100;
    ${Mobile({fontSize: "1.5rem"})}
`

const FilterContainer = styled.div`
    margin-top: 40px;
    display: flex;
    gap: 20px;
    ${Mobile({justifyContent: "space-between"})}
    ${Mobile({marginTop: "10px"})}
`
const FilterItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`
const FilterTitle = styled.div`
    font-size: 1.2rem;
    ${Mobile({fontSize: "1rem"})}
`
const FilterType = styled.div``

const Color = styled.span`
    display: inline-block;
    margin: 0px 4px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    &:hover {
        cursor: pointer;
    }
    ${Mobile({height: "20px", width: "20px"})}
`

const Select = styled.select`
    padding: 4px;
    font-size: 1rem;
`
const Option = styled.option``

const BuyContainer = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    ${Mobile({justifyContent: "space-between"})}
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
const Button = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 8px;
    color: white;
    background-color: teal;
    padding: 12px 16px;
    transition: 0.5s ease;
    opacity: 0.8;
    &:hover {
        cursor: pointer;
        opacity: 1;
    }
`

const ProductDetail = () => {
    //get the cart context 
    const cart = useCartContext();

    const {state} = useLocation()
    const item = {...state};
    const [color, setColor] = useState(item.colors[0])  // default is the first color in colors array
    const [size, setSize] = useState(item.sizes[0]) // default is the first size in sizes array
    const [quantity, setQuantity] =  useState(1)// default is 1

    const updateQuantity = (kind) => {
        if(kind === 'increase'){
            setQuantity(prevQuantity => prevQuantity + 1);
        }
        if(kind === 'decrease'){
            quantity > 1 && setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    const addToCart = () => {
        const {_id, title, price, img} = item;
        const payload = {_id, title, price, color, img, size, quantity}
        cart.dispatch({
            type: 'UPDATE_PRODUCT',
            payload
        });
    }

    return (
    <div>
        <Navbar />
        <Container>
            <ImageContainer>
                <Image src={item.img} />
            </ImageContainer>
            <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>
                    {item.description}
                </Desc>
                <Price>{`$ ${item.price}`}</Price>
                <FilterContainer>
                    <FilterItem>
                        <FilterTitle>Color</FilterTitle>
                        <FilterType>
                            {item.colors.map(color => <Color key={color} color={color} />)}
                        </FilterType>
                    </FilterItem>
                    <FilterItem>
                        <FilterTitle>Size</FilterTitle>
                        <FilterType>
                            <Select onChange={(e) => setSize(e.target.value)}>
                                {item.sizes.map(size => <Option key={size} value={size}>{size}</Option>)}
                            </Select>
                        </FilterType>
                    </FilterItem>
                </FilterContainer>
                <BuyContainer>
                    <Quantity>
                        <Block onClick={() => updateQuantity('decrease')}>-</Block>
                        <Amount>{quantity}</Amount>
                        <Block onClick={() => updateQuantity('increase')}>+</Block>
                    </Quantity>
                    <Button onClick={addToCart}>Add To Cart</Button>
                </BuyContainer>
            </InfoContainer>
        </Container>
        <Newsletter />
        <Footer />
  </div>
  )
}

export default ProductDetail
