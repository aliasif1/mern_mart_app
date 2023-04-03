import { useRef } from 'react'
import styled from 'styled-components'
import { Mobile } from '../responsive'
import { useOnLogin } from '../hooks/useOnLogin'
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

const Login = () => {
    const [error, setError, isLoading, onLogin] = useOnLogin();
    const emailRef = useRef();
    const passwordRef = useRef();
    const handleLogin = async () => {
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        if(!email || !password){
            setError('All fields must be filled');
            return;
        }
        await onLogin({email, password});
        emailRef.current.value = ''
        passwordRef.current.value = ''
    }
    return (
    <Container>
        <Card>
            <Title>User Login</Title>
            <Form onSubmit={handleLogin}>
                <Input ref={emailRef} placeholder="Email"/>
                <Input type='password' ref={passwordRef} placeholder="Password"/>
                <Button onClick={handleLogin} type="submit">Login</Button>
                {error && <Error> {error} </Error>}
            </Form>
            <Switch>Need a new account? <Link className='link' to="/register"><NavPill>Register</NavPill></Link></Switch>
            <Switch>Login Later? <Link className='link' to="/"><NavPill>Visit Shop</NavPill></Link></Switch>
        </Card>
    </Container>
  )
}

export default Login