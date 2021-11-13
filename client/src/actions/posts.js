import * as api from "../api";
import {CREATE,UPDATE,DELETE,FITCH_ALL,LIKE,FITCH_BY_SEARCH,START_LOADING,END_LOADING,FITCH_POST,COMMENT} from '../constants/actionType'

//Action Creator

export const getPost=(id)=> async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data} =await api.fetchPost(id);
        dispatch({type:FITCH_POST,payload:{post:data}});
        dispatch({type:END_LOADING});

    } catch (error) {
        console.log(error);
    }
};


export const getPosts=(page)=> async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data} =await api.fetchPosts(page);
        dispatch({type:FITCH_ALL,payload:data});
        dispatch({type:END_LOADING});

    } catch (error) {
        console.log(error.message);
    }
};

export const getPostBySearch=(searchQuery)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data:{data}} =await api.fethPostBySearch(searchQuery);
        dispatch({type:FITCH_BY_SEARCH,payload:{data}});
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createPost =(post,history)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data}=await api.createPost(post);
        history.push(`/posts/${data._id}`)
        dispatch({type:CREATE,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost =(id,post)=>async(dispatch)=>{
    try {
        const {data}=await api.updatePost(id,post);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost=(id)=>async(dispatch)=>{
     try {
            await api.deletePost(id);
           dispatch({type:DELETE,payload:id})
    } catch (error) {
        console.log(error);
       }
}

export const likePost=(id)=>async(dispatch)=>{
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
      const { data } = await api.likePost(id, user?.token);
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
}

export const commentPost=(value,id)=>async(dispatch)=>{
    try {
    const {data}= await api.comment(value,id);
    dispatch({type:COMMENT,payload:data})
    return data.comments;
    } catch (error) {
      console.log(error);
    }
}

