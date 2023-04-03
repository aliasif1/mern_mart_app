import React from 'react'
import styled from 'styled-components'
import { Mobile } from '../responsive';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    cursor: pointer;
    padding: 8px;
    height: 320px;
    width: 320px;
    /* background-color: rgba(50, 168, 151, 0.2); */
    background: linear-gradient(to bottom right, #92dbf3, #ffffff);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    ${Mobile({height: "160px", width: "160px"})}
`

const ImageContainer = styled.div`
    height: 80%;
    width: 80%;
    border-radius: 50%;
    overflow: hidden;
`

const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`
const InfoContainer = styled.div`
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 16px;
`
const Price = styled.span`
    font-size: 1.2rem;    
    font-weight: 400;
`

const Button = styled.button`
    background-color: teal;
    border: none;
    padding: 8px 40px;
    color: gray;
    border-radius: 8px;
    font-size: 1.2rem;
    transition: 0.5s ease;
    cursor: pointer;
    color: white;
    font-weight: 400;
    opacity: 0.8;
    cursor: pointer;
    transition: 0.5s ease;
    &:hover {
        opacity: 1;
    }
    ${Mobile({padding: "2px 8px"})}
`

const Product = ({item}) => {
    const navigate = useNavigate();
    return (
    <Container onClick={() => navigate(`/product/${item._id}`, {state: item})}>
        <ImageContainer>
            <Image src={item.img}/>
        </ImageContainer>
        <InfoContainer>
            <Price>${item.price}</Price>
            <Button>Shop</Button>
        </InfoContainer>
    </Container>
  )
}

export default Product
