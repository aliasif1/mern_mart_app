import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Mobile } from '../responsive'

const Container = styled.div`
    flex: 1;
    height: 70vh;
    position: relative;
    ${Mobile({flex: "auto", height: "30vh"})}
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
`
const InfoContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
`
const Title = styled.h1`
    margin-bottom: 24px;
    ${Mobile({fontSize: "1.8rem"})}
`
const Button = styled.button`
    font-size: 1.2rem;
    padding: 12px 24px;
    font-weight: bold;
    border: none;
    background-color: white;
    color: gray;
    cursor: pointer;
    transition: 0.5s ease;
    &:hover {
        color: black;
    }
    ${Mobile({fontSize: "1rem"})}
`

const Category = ({item}) => {
    const navigate = useNavigate()
  return (
    <Container onClick={() => navigate(`/products/${item.category}`)}>
        <Image src={item.image} />
        <InfoContainer>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
        </InfoContainer>
    </Container>
  )
}

export default Category