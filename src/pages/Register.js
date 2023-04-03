import { useRef } from 'react'
import styled from 'styled-components'
import { useOnRegister } from '../hooks/useOnRegister'
import { Mobile } from '../responsive'
import { Link } from 'react-router-dom'

const Container = styled.div`
    height: 100vh;
    width: 100%;
    background: linear-gradient(to bottom right, #4F7CAC, #C4B7CB);
    display: flex;
    justify-content: center;
    align-items: center;
`
const Card = styled.div`
    background-color: white;
    border: 0.5px solid gray;
    padding: 24px 32px;
    border-radius: 12px;
    width: 80%;
    max-width: 500px;
    ${Mobile({width: "90%"})}
`
const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 200;
    text-align: center;
    ${Mobile({fontSize: "1.5rem"})}
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
const PrivacyStatement = styled.div`
    padding: 0px 24px;
    font-size: 0.8rem;
    letter-spacing: 0.2px;
    word-spacing: 1.2px;
`

const NavPill = styled.span`
    text-decoration: none;
    font-weight: bold;
    color: coral;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`

const Button = styled.button`
    font-size: 1.2rem;
    padding: 12px;
    background-color: teal;
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

const Switch = styled.div`
    font-size: 1rem;
    margin-top: 12px;
    text-align: center;
`

const Error = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: red;
    text-align: center;
`

const Register = () => {
    const [error, setError, isLoading, onRegister] = useOnRegister();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const handleRegister = async () => {
        const username = usernameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();
        if(!username || !email || !password || !confirmPassword){
            setError('All fields must be filled');
            return;
        }
        if(password !== confirmPassword){
            setError('Password and Confirm Password do not match');
            passwordRef.current.value = ''
            confirmPasswordRef.current.value = ''
            return;
        }
        await onRegister({username, email, password});
        usernameRef.current.value = ''
        emailRef.current.value = ''
        passwordRef.current.value = ''
        confirmPasswordRef.current.value = ''
    }
    return (
    <Container>
        <Card>
            <Title>User Registration</Title>
            <Form onSubmit={handleRegister}>
                <Input ref={usernameRef} placeholder="Username"/>
                <Input ref={emailRef} placeholder="Email"/>
                <Input type='password' ref={passwordRef} placeholder="Password"/>
                <Input type='password' ref={confirmPasswordRef} placeholder="Confirm Password"/>
                <PrivacyStatement> By signing up, I agree to my personal data being processed in compliance with the <NavPill>PRIVACY POLICY </NavPill></PrivacyStatement>
                <Button disabled={isLoading} onClick={handleRegister} type="submit">Create Account</Button>
                {error && <Error> {error} </Error>}
            </Form>
            <Switch>Already have an account? <Link className='link' to="/login"><NavPill>Login</NavPill></Link></Switch>
            <Switch>Register Later? <Link className='link' to="/"><NavPill>Visit Shop</NavPill></Link></Switch>
        </Card>
    </Container>
  )
}

export default Register