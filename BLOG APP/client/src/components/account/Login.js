import React, { useState } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api';

const StyledBox = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow:2px 3px 2px 3px rgb(0 0 0/0.3);  
`;

const Image = styled('img')({
    width: 300,
    height: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
})

const Wraper = styled(Box)`
padding:25px 35px;
display:flex;
flex:1;
flex-direction: column;
& >div,& >button, & > p {
    margin-top:20px;
};
`

const LoginButton = styled(Button)`
text-transform:none;
background: #FF7F24;
color:#fff;
height:48px;
border-radius:2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
color:#878787;
font-size:15px;
`;

const SignupInitialValues = {
    name: '',
    username: '',
    password: ''
}

const Login = () => {
    const imageURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqudb9uSCP_Fls2k-VlqWI5vBH6uCwzEQceA&usqp=CAU';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(SignupInitialValues);

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }


    const signupUser = async() => {
      let resp =  await API.userSignup(signup);
    }
    return (
        <StyledBox>
            <Box>
                <Image src={imageURL} alt='Login' />

                {
                    account === 'login' ?

                        <Wraper>
                            <TextField variant="standard" label="Enter Username" />
                            <TextField variant="standard" label="Enter Password" />
                            <LoginButton variant="contained" >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()}>Create New User</SignupButton>
                        </Wraper>
                        :

                        <Wraper>
                            <TextField variant="standard" label="Enter Name" name='name' onChange={(e) => onInputChange(e)} />
                            <TextField variant="standard" label="Enter username" name='username' onChange={(e) => onInputChange(e)} />
                            <TextField variant="standard" label="Enter Password" name='password' onChange={(e) => onInputChange(e)} />

                            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wraper>
                }
            </Box>
        </StyledBox>
    );
};

export default Login;
