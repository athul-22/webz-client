import axios from 'axios';
import { SetPosts } from '../redux/postSlice';
import e from 'express';

const API_URL = "http://localhost:8800";

export const API = axios.create({
    baseURL: API_URL,
    responseType:"json",
});

export const apiRequest = async ({url,token, data,method })=>{
    try{
        const result = await API(url,{
            methodl: method|| "GET",
            data:data,
            header:{
                "content-type":"application/json",
                Authorization:token?`Bearer ${token}`: "",
            }
        })
        return result?.data
;
    }catch(error){
        const err = error.response.data;
        console.log(err);
        return { status: err.success, message: err.message}
    }
};

export const handleFileUpload = async(uploadFile)=>{
    const formData = new FormData();
    formData.append("file",uploadFile);
    formData.append("upload_present","webz");

    try { 
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`,
            formData
        );
        return response.data.secure_url;
    }catch(error){
        console.log(error);
        return { status: false, message: error.message };
    }
}


export const fetchPosts = async(token,dispatch, uri, data)=> {
    try{
        const res = await apiRequest({
            url: uri || "/posts",
            token:token,
            methodn:"POST",
            data: data || {},
        })
        dispatch(SetPosts(res?.data));
        return;
    }catch(error){
        console.log(error);
        return;
    }
}

export const likePost = async(uri,token)=> {
    try{
        const res = await apiRequest({
            url: uri,
            token:token,
            methodn:"POST",
        })
        return res;
    }catch(error){
        console.log(error)
    }
}


export const deletePost = async (id, token)=> {
    try {
        const res = await apiRequest({
            url:"/post/"+id,
            token:token,
            method:"DELETE",
        });
        return;
    }catch(error){
        console.log(error);
    }
}

export const getUserInfo = async(token , id)=> {
    try{
        const uri = id === undefined ? "/user/get-user" : "/user/get-user"+id;
        const res = await apiRequest({
            url: uri,
            token:token,
            method:"POST",
        })
        if(res?.message === "Authentication failed"){
            localStorage.removeItem("user");
            window.alert("User session expired. Login again");
            window.location.replace("/login");
        }
        return res?.user;
    }catch(error){
        console.log(error);
    }
}


export const sendFriendRequest = async (token,id)=> {
    try {
        const res = await apiRequest({
            url:"/users/friend-request",
            token: token,
            method:"POST",
            data: {requestTo: id},
        });
       
    } catch(error){
        console.log(error);
    }
}


export const viewUserProfile = async(token,id)=> {
    try {
        const res = await apiRequest({
            url: "/users/profile-view",
            token:token,
            method:"POST",
            data: {id},
        });
        return;
    }catch(error){
        console.log(error);
    }
}