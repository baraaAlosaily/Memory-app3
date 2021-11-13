import React,{useState} from "react";
import useStyle from './styles'
import {Card,CardActions,CardContent,CardMedia,Button,Typography,ButtonBase} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from'@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deletePost,likePost } from "../../../actions/posts";

const Post = ({post,setCurrentId}) => {
    const classes=useStyle();
    const dispatch=useDispatch();
    const user=JSON.parse(localStorage.getItem('profile'));
    const history=useHistory();
    const [likes, setLikes] = useState(post?.likes);

    const userId=user?.result.googleId||user?.result?._id;
    const hasLikePost=post?.likes?.find((like) => like === (userId));

    const handleClick=async()=>{
      dispatch(likePost(post._id));

      if(hasLikePost){
        setLikes(post.likes.filter((id)=>id!==(userId)))
      }else{
        setLikes([...post.likes,userId])
      }
    };

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

      const openPost=(e)=>{
        history.push(`/posts/${post._id}`)
      }

    return ( 
        <Card className={classes.card} raised elevation={8}>
        { (user?.result?.googleId==post?.creator||user?.result?._id==post?.creator)&&
           <div className={classes.overlay2}>
               <Button style={{color:'white'}} size="small" onClick={()=>setCurrentId(post._id)}>
                   <MoreHorizIcon fontSize="default"/>
               </Button>
           </div>
           }
          <ButtonBase 
          className={classes.cardAction}
          onClick={openPost}
          >
           <CardMedia className={classes.media} image={post.slectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title}/>
           <div className={classes.overlay}>
               <Typography variant="h6">{post.name}</Typography>
               <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
           </div>
           <div className={classes.details}>
           <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>           </div>
           <CardContent>
           <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
           <Typography className={classes.title} component="p" color="textSecondary" >{post.message}</Typography>
            </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleClick}>
                   <Likes/>
                </Button>
                { (user?.result?.googleId==post?.creator||user?.result?._id==post?.creator)&&
                (  <Button size="small" color="primary" onClick={()=>{dispatch(deletePost(post._id))}}>
                      <DeleteIcon fontSize="small"/>
                      
                  </Button>)
                }
            </CardActions>
        
        </Card>
     );
}
 
export default Post;