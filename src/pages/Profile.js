import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Mobile } from '../responsive'
import { useAuthContext } from '../hooks/useAuthContext'
import Navbar from '../components/Navbar'
import {useLogout} from '../hooks/useOnLogout';

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

const Item = styled.div`
    display: flex;
    padding: 10px 0px;
`

const Key = styled.span`
    font-size: 1.2rem;
    font-weight: 400;
    width: 120px;
`

const Value = styled.span`
    font-size: 1.2rem;
    font-weight: 300;
`

const Button = styled.button`
    margin-top: 20px;
    font-size: 1rem;
    padding: 12px 24px;
    background-color: red;
    border: none;
    color: white;
    opacity: 0.8;
    border-radius: 8px;
    transition: 0.5s ease;
    &:hover {
        cursor: pointer;
        opacity: 1;
    }
    ${Mobile({padding: "10px"})}
`

const Profile = () => {
    const {user} = useAuthContext();
    const [profile, setProfile] = useState(null);
    const [onLogout] = useLogout();

    useEffect(() => {
        const getProfile = async () =>{
            try{
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`, {
                    headers: {
                        "authorization": 'Bearer ' + user.token
                    },
                });
                const json = await res.json();   
                if(res.ok){
                    setProfile(json);
                }
            }
            catch(e){
                console.log(e.message);
            }
        } 
        user && getProfile();
    }, [user])
    
    const deleteAccount = async () => {
        try{
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`, {
                method: "delete",
                headers: {
                    "authorization": 'Bearer ' + user.token
                },
            });
            const json = await res.json();   
            if(res.ok){
                onLogout();
            }
        }
        catch(e){
            console.log(e.message);
        }
    }

    return(
        <div>
            <Navbar />
            <Container>
                <Title>Your Profile</Title>
                <Item>
                    <Key>Username:</Key>
                    <Value> {profile && profile.username}</Value>
                </Item>
                <Item>
                    <Key>Email:</Key>
                    <Value>{profile && profile.email}</Value>
                </Item>
                <Button onClick={deleteAccount}>Delete Account</Button>
            </Container>
        </div>
    )
}

export default Profile;