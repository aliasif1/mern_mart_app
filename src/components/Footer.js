import React from 'react'
import styled from 'styled-components'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import { Mobile } from '../responsive';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    background-color: whitesmoke;
    margin-top: 16px;
    padding: 12px 20px;
    display: flex;
    gap: 20px;
    ${Mobile({flexDirection: "column", padding: "12px 8px"})}
    
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-left: 1px solid lightgray;
    padding-left: 8px;
    ${Mobile({paddingBottom: "8px", borderLeft: "none", backgroundColor: "#eeeeee"})}
`

const Middle = styled.div`
    flex: 1;
    border-left: 1px solid lightgray;
    padding-left: 8px;
    ${Mobile({display: "None"})}
`

const Title = styled.h3`
`

const LinksContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const LinksItemColumn = styled.div`
    flex: 1;
    flex-direction: column;
`

const LinkItem = styled.div`
    margin: 8px 0px;
`

const A = styled.a`
    text-decoration: none;
    color: black;
    transition: 0.5s ease;
    &:hover {
        cursor: pointer;
        border-bottom: 1px solid black;
    }
`

const Right = styled.div`
    flex: 1;
    border-left: 1px solid lightgray;
    padding-left: 8px;
    ${Mobile({paddingBottom: "8px", borderLeft: "none", backgroundColor: "#eeeeee"})}
`

const Logo = styled.h1`
    margin-bottom: 0px;
`

const Desc = styled.p`
    margin: 0px;
`
const SocialContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
`;

const SocialIcon = styled.div`
    color: white;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    transition: 0.5s ease;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const Info = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

const IconSection = styled.div`
    
`

const DescSection = styled.div`
    flex: 1;
`

const Footer = () => {
    const navigate = useNavigate()
    return (
    <Container>
        <Left>
            <Logo>MernMart</Logo>
            <Desc>With MernMart, you can browse thousands of products from the comfort of your own home and purchase items with just a few taps on your computer or mobile device. Developed with the MERN stack technology</Desc>
            <SocialContainer>
                <SocialIcon><A href='https://github.com/aliasif1' target="_blank" rel="noopener noreferrer"><GitHubIcon style={{color: "white"}}></GitHubIcon></A></SocialIcon>
                <SocialIcon><A href='https://www.linkedin.com/in/asif-ali-mehmuda-273793130/' target="_blank" rel="noopener noreferrer"><LinkedInIcon style={{color: "white"}}></LinkedInIcon></A></SocialIcon>
            </SocialContainer>
        </Left>
        <Middle>
            <Title>Important Links</Title>
            <LinksContainer>
                <LinksItemColumn>
                    <LinkItem><A onClick={() => navigate(`/products/men`)}>Men</A></LinkItem>
                    <LinkItem><A onClick={() => navigate(`/products/women`)}>Women</A></LinkItem>
                    {/* <LinkItem><A>Dress</A></LinkItem>
                    <LinkItem><A>Shoes</A></LinkItem> */}
                </LinksItemColumn>
                <LinksItemColumn>
                    <LinkItem onClick={() => navigate(`/products/dress`)}><A>Dresses</A></LinkItem>
                    {/* <LinkItem><A>Purses</A></LinkItem>
                    <LinkItem><A>Sweaters</A></LinkItem>
                    <LinkItem><A>Sneakers</A></LinkItem> */}
                </LinksItemColumn>
                <LinksItemColumn>
                    <LinkItem><A onClick={() => navigate(`/products/shoes`)}>Shoes</A></LinkItem>
                    {/* <LinkItem><A>Belts</A></LinkItem> */}
                </LinksItemColumn>
            </LinksContainer>
        </Middle>
        <Right>
            <Title>Contact Us</Title>
            <InfoContainer>
                <Info>
                    <IconSection><PersonIcon></PersonIcon></IconSection>
                    <DescSection>Asif Ali Mehmuda</DescSection>
                </Info>
                <Info>
                    <IconSection><EmailIcon></EmailIcon></IconSection>
                    <DescSection><A href='mailto:asif.mehmuda9@gmail.com'> asif.mehmuda9@gmail.com</A></DescSection>
                </Info>
                <Info>
                    <IconSection><InfoIcon></InfoIcon></IconSection>
                    <DescSection><A href='https://aliasif1.github.io/asif_portfolio/' target="_blank" rel="noopener noreferrer">Portfolio Website</A></DescSection>
                </Info>
            </InfoContainer>
        </Right>
    </Container>
  )
}

export default Footer