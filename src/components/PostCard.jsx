import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import moment from "moment";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import {MdOutlineDeleteOutline} from 'react-icons/md'
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { postComments } from "../assets/data";

const CommentForm = ({user,id,replyAt,getComments}) => {
    const [loading, setLoading] = useState(false);
    const [errMsg,setErrMsg] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm ({
        mode: "onChange",
    });

    const onSubmit = async() => {};


    
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="w-full border-b  border-[#66666645]">
            <div className="w-full flex items-center gap-2 py-4">
                <img 
                    src={user?.profileUrl ?? NoProfile}
                    alt="userimage"
                    className="w-10 h-10 rounded-full object-cover"
                    />
                    <TextInput
                    name="comment"
                    styles='w-full rounded-full py-3'
                    placeholder={replyAt ? `Reply @${replyAt}` : "Comment this post"}
                    register={register("Comment",{
                        required:"Comment can not be empty",
                    })}
                    errors={errors.comment ? errors.comment.message : ""}
                    />
            </div>
            {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                ></span>
              )}
              <div className='flex items-end justify-end pb-2'>
                   {loading? (<Loading/>) : (
                     <CustomButton
                      title='Submit' 
                      type='submit'
                      containerStyles='bg-[#0444a4] text-white py-1 px-3 rounded-full
                    font-semibold text-sm'/>)}
                   </div>
                </form>
    )
}

const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments,setReplyComments] = useState('')
  const [showComments, setShowComments] = useState(0);
  
  const getComments = async() => {
    setReplyComments(0);
    setComments(postComments);
    setLoading(false)
  };

  return (
    <div className="mb-2 bg-primary p-4 rounded-xl ">
      <div className="flex gap-3 items-center mb-2 ">
        <Link to={"/profile" + post?.userId?._id}>
          <img
            src={post?.userId?.profileUrl ?? NoProfile}
            alt=""
            className="w-14 h-12 object-cover rounded-full"
          />
        </Link>
        <div className="w-full flex justify-between ">
          <div className="">
            <Link to={"/profile/" + post?.userid?._id}>
              <p className="font-medium text-lg text-ascent-1">
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
            </Link>
            <span className="text-ascent-2">{post?.userId?.location}</span>
          </div>

          <span className="text-ascent-2">
            {moment(post?.createdAt ?? "2023-05-25").fromNow()}
          </span>
        </div>
      </div>
      <div>
        <p className="text-ascent-2">
          {showAll === post?._id
            ? post?.description
            : post?.description.slice(0, 300)}
          {post?.description?.length > 300 && 
          (showAll === post?._id ?(
          <span className="text-blue ml-2 font-medium cursor-pointer" onClick={()=> setShowAll(0)}>Show Less</span>):
          ( <span className="text-blue ml-2 font-medium cursor-pointer" onClick={()=> setShowAll(post?._id)}>Show More</span>
          ))}
        </p>

            {
                post?.image && (<img src={post?.image} alt="post image" className="w-full mt-2 rounded-lg" />)
            }
      </div>
      <div className="mt-4 flex just-between items-center px-3 py-2 text-ascent-2 text-base border-t border-[#66666645]">
        <p className="flex gap-2 items-center text-base px-3 py-2 text-ascent-2 text-base border-b border-[#66666645]">
            {post?.likes?.includes(user?._id)?(<BiSolidLike size={20} color='blue'/>): (
                <BiLike size={20} />
            )}
            {post?.likes?.length} Likes
        </p>
        <p className="flex gap-2 items-center text-base cursor-pointer" 
        onClick={()=> {
            setShowComments(showComments === post?._id ? null : post?._id);
            getComments(post?._id);
        }}
        >
            <BiComment size={20}/>
            {post?.comment?.length} Comments
        </p>
        {user?._id === post?.userId?._id && (<div>
            <div className="flex gap-1 items-center text-base text-ascent-2 ml-3 cursor-pointer" onClick={()=> deletePost(post?._id)}>
                <MdOutlineDeleteOutline size={20}/>
                <span>Delete</span>
            </div>
        </div>)}
      </div>

        {/* COMMENTS */}
        <div>
            {showComments === post?._id && <div className="w-full mt-4 border-t border-[#66666645] pt-4">
                <CommentForm  
                user={user}
                id={post?._id}
                getComments={()=> getComments(post?._id)}
                />
            </div>}
            {loading ? (
            <Loading/>
            ): comments?.length > 0 ? (
                comments?.map((comment)=> (
                    <div className="w-full py-2" key={comment?._id}>
                        <div className="flex gap-3 items-center mb-1">
                            <Link to={"/profile/"+comment?.userId?._id}>
                                <img src={comment?.userId?.profileUrl ?? NoProfile} alt="" className="w-10 h-10 rounded-full object-cover"/>
                            </Link>
                        </div>    
                    </div>
                ))
            ):(<span className="flex text-sm py-4 text-ascent-2 text-center">
                No comments. post the first to comment
            </span>)}
        </div>
        
    </div>
  );
};

export default PostCard;
