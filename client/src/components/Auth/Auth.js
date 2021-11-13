import React,{useState} from 'react'
import { Avatar,Button,Paper,Grid, Typography,Container, TextField } from '@material-ui/core'
import useStyle from './styles'
import LockOutLinedIcon from "@material-ui/icons/LockOutlined"
import Input from './Input';
import GoogleLogin from "react-google-login";
import Icon from './icon';
import {useDispatch} from "react-redux";
import { useHistory } from 'react-router';
import {signin,signup} from '../../actions/auth'

const initalState={firstName:'',lastName:'',password:'',email:'', confirmPassword:''};

const Auth = () => {
    const classes=useStyle();

    const dispatch=useDispatch();

    const history=useHistory();

    const [isSignup, setIsSignUp] = useState(false);


    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState( initalState)

    const handleShowPassword =()=>setShowPassword((prevShowPassword)=>!prevShowPassword)

    const switchMode=()=>{
        setIsSignUp((prevIsSignUp)=> !prevIsSignUp);
        handleShowPassword(false);
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(formData);

        if(isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }
    }

    const handleChange=(e)=>{

        setFormData({...formData,[e.target.name]:e.target.value})

    }
    const googleFailure=()=>{
        console.log("Google sign in was un successful");
    }

    const googleSuccess=async(res)=>{
        const result =res?.profileObj; //undifind 
        const token =res?.tokenId;

        try {
            dispatch({type:"AUTH", data:{result,token}});
            history.push('/')
        } catch (error) {
            console.log(error);
            
        }

    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up': 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup&& (
                                <>
                                 <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                 <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text":"password"} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {
                            isSignup ? 'Sign Up': 'Sign In '
                        }
                    </Button>
                    <GoogleLogin
                    clientId="595797779088-91a23e04cqvgmarpb7ukbh554i7alhl6.apps.googleusercontent.com"
                    render={(renderProps)=>(
                        <Button
                        className={classes.googleButton} 
                        color="primary"
                        fullWidth 
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled} 
                        startIcon={<Icon/>}
                        variant="contained"
                        >
                            Google SignIn 
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    />
             
                    <Grid container justify="flex-end" >
                        <Grid item >
                            <Button onClick={switchMode}>
                            {
                                isSignup ? 'Already have an account sign in ' : "Don't have an account? Sign up"
                            }
                                </Button>

                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth