import React,{useState,useEffect} from "react";
import { AppBar,Avatar,Button,Toolbar,Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import memoriesText from '../../images/memories-Text.png'
import memoriesLogo from '../../images/memories-Logo.png'
import useStyle from './styles'
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { useHistory, useLocation } from "react-router";
import Location from "react-router-dom"



const Navbar = () => {
    const classes=useStyle();

    const dispatch=useDispatch();

    const history=useHistory();

    const location=useLocation();

    const [user,setuser]=useState(JSON.parse(localStorage.getItem('profile')));

    console.log(user);

    useEffect(()=>{
        const token=user?.token;

        //JWT ...
        if(token){
            const decodedToken=decode(token);
            if(decodedToken.exp*1000<new Date().getTime()) logout();
        }


        setuser(JSON.parse(localStorage.getItem('profile')));

    },[location])

    const logout =()=>{
        dispatch({type:'LOGOUT'});
        history.push('/')
        setuser(null);
    }

    return ( 
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
            <img src={memoriesText} alt="memories" height="45"/>
              <img className={classes.image} src={memoriesLogo} alt="memories" height="40"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user? (
                        <div className={classes.profile} >
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Log Out </Button>
                        </div>
                    ):(
                        <Button component={Link} to="/auth" variant="contained" color="primary"> SignIn</Button>
                    )
                }
            </Toolbar>
      </AppBar>
     );
}
 
export default Navbar;