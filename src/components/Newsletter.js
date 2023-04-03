import React from 'react'
import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send';
import { Mobile } from '../responsive';

const Container = styled.div`
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex-direction: column;
    /* background-color: rgba(153, 204, 255, 0.7); */
    background: linear-gradient(to bottom right, #4F7CAC, #C4B7CB);
    ${Mobile({height: "250px", padding: "0px 8px"})}
`

const Title = styled.h1`
    font-size: 3.5rem;
    margin-bottom: 0px;
    text-transform: uppercase;
    ${Mobile({fontSize: "2rem"})}
`

const Desc = styled.p`
margin-top: 0px;
    font-size: 1.5rem;
    text-align: center;
    ${Mobile({fontSize: "1.2rem"})}
`

const InputContainer = styled.div`
    width: 50%;
    height: 50px;
    background-color: white;
    display: flex;
    flex-direction: row;
    ${Mobile({width: "80%", height: "40px"})}
`

const Input = styled.input`
    flex: 5;
    outline: none;
    border: none;
    font-size: 1.2rem;
    padding-left: 12px;
`

const Button = styled.button`
    flex: 1;
    background-color: teal;
    border: none;
    color: whitesmoke;
    transition: 0.5s ease;
    cursor: pointer;
    &:hover {
        color: white;
    }
`

const Newsletter = () => {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Desc>Stay in touch to get the latest offers and deals. 
            <br></br>
            Sign up to the newsletter now
        </Desc>
        <InputContainer>
            <Input placeholder='Email'/>
            <Button><SendIcon></SendIcon></Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter