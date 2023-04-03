import styled from 'styled-components'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import {Mobile} from '../responsive'
import { useNavigate, Link } from 'react-router-dom';
import { useCartContext } from '../hooks/useCartContext';
import {useAuthContext} from '../hooks/useAuthContext';
import {useLogout} from '../hooks/useOnLogout';

const Container = styled.div`
    height: 60px;
    background-color: #eeeeee;
    box-shadow: 1px 2px lightgray;
    ${Mobile({height: "50px"})}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${Mobile({padding: "10px 0px"})}
`
const Left = styled.div`
    flex: 1;
    font-size: 2rem;
    font-weight: 400;
    cursor: pointer;
    ${Mobile({fontSize: "1.5rem"})}
`
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ${Mobile({justifyContent: "center"})}
`

const MenuItem = styled.span`
    margin-left: 10px;
    &:hover {
        cursor: pointer;
    }
    ${Mobile({fontSize: "0.9rem"})}
`

const Navbar = () => {
    const navigate = useNavigate();
    const {numItems} = useCartContext(); 
    const {user} = useAuthContext();

    const [onLogout] = useLogout();

    return (
    <Container>
        <Wrapper>
            <Left onClick={() => navigate(`/`)}>MernMart</Left>
            <Right>
                {!user && 
                    <>
                    <Link className='link' to='/login'><MenuItem>Login</MenuItem></Link>
                    <Link className='link' to='/register'><MenuItem>Register</MenuItem></Link>
                    </>
                }
                {user && 
                    <>
                    <Link className='link' to='/profile'><MenuItem>{user.username}</MenuItem></Link>
                    <Link className='link' to='/orders'><MenuItem>Orders</MenuItem></Link>
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </>
                }
                <MenuItem>
                    <Link className='link' to={'/cart'}>
                        <Badge badgeContent={numItems} showZero color="primary">
                            <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                        </Badge>
                    </Link>
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar