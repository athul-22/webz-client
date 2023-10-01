import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CustomButton,
  ProfileCard,
  TextInput,
  FriendsCard,
  TopBar,
  PostCard,
  Loading,
  EditProfile,
} from "../components";
import { useForm } from "react-hook-form";
import { suggest, requests,posts } from "../assets/data";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";

const Home = () => {
  const { user , edit} = useSelector((state) => state.user);
  const [friendRequest, setFriendrequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);

  const [errMsg, setErrmsg] = useState("");

  const [file, setFile] = useState(null);
  const [loading , setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlePostSubmit = async (data) => {};

  return (
    <>
    <div className="home w-full px-0 lg:px pb-20 2xl:px-40 bg-bgColor rounded-lg h-screen overflow-hidden">
      <TopBar />

      <div className="w-full flex gap-2 lg:gap-2 pt-5 pb-10 h-full">
        {/* LEFT */}
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
          <ProfileCard user={user} />
          <FriendsCard friends={user?.friends} />
        </div>

        {/* CENTER  */}
        <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto lg:rounded-lg">
          {/* CREATE POST */}
          <form
            onSubmit={handleSubmit(handlePostSubmit)}
            className="bg-primary px-4 rounded-lg"
          >
            <div className="w-full flex items-center  py-4 border-b border-[#66666645]">
              <img
                src={user?.profileUrl ?? NoProfile}
                alt="U"
                className="w-14 h-14 rounded-full object-cover"
              />
              <TextInput
                styles="w-full rounded-full py-3 ml-10"
                placeholder="What's on your mind...."
                name="description"
                register={register("description", {
                  required: "Write something about post",
                })}
                error={errors.description ? errors.description.message : ""}
              />
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
            </div>
            <div className="flex items-center justify-between py-4">
              {/* IMAGE UPLOAD */}
              <label
                htmlFor="imageUpload"
                className="flex items-center gap-1 text-ascent-2 text-base hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden "
                  id="imageUpload"
                  data-max-size="size"
                  accept=".jpg, .png, .jpeg"
                />
                <BiImages />
                <span>Images</span>
              </label>

              {/* VIDEO UPLOAD */}
              <label
                htmlFor="videoUplaod"
                className="flex items-center gap-1 text-ascent-2 text-base hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="videoUplaod"
                  data-max-size="5120"
                  accept=".mp4,.wav"
                />
                <BiSolidVideo />
                <span>Video</span>
              </label>

              {/* GIT UPLOAD */}
              <label
                htmlFor="gifUpload"
                className="flex items-center gap-1 text-ascent-2 text-base hover:text-ascent-1 cursor-pointer"
              >
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden "
                  id="vgifUpload"
                  data-max-size="5120"
                  accept=".gif"
                />
                <BsFiletypeGif />
                <span>Gif</span>
              </label>

              <div>
                {posting ? (
                  <Loading />
                ) : (
                  <CustomButton
                    type="submit"
                    title="post"
                    containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                  />
                )}
              </div>
            </div>
          </form>

          {loading ? (<loading/> ) : posts?.length > 0 ? (
            posts?.map((post)=>(
              <PostCard key={post?._id} post={post} user={user} deletePost={()=>{}} likePost={()=>{}}/>
            ))
          ):(
            <div className='flex w-full h-full items-center justify-center'>
            <p className='text-lg text-ascent-2'>No Post Available</p>
            </div>
          )}
        </div>
        {/* RIGHT  */}
        <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
          {/* FRIEND REQUEST */}
          <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
            <div className="flex items-center justify-between text-xl text-ascent-1 pb-5 border-b border-[#66666645]">
              <span className="">Friend Request</span>
              <span className="px-4 py-2 border rounded-full border-[#66666645]">
                {friendRequest?.length}
              </span>
            </div>

            <div className="w-full flex flex-col gap-4 pt-4 ">
              {friendRequest?.map(({ _id, requestFrom: from }) => (
                <div key={_id} className="flex items-center justify-between">
                  <Link
                    to={"/profile/" + from._id}
                    className="w-full flex gap-4 items-centerm cursor-pointer"
                  >
                    <img
                      src={from?.profileUrl ?? NoProfile}
                      alt=""
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-ascent-1">
                        {from?.firstName} {from?.lastName}
                      </p>
                      <span className="text-sm text-ascent-2">
                        {from?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>
                  <div className="flex gap-1 ">
                    <CustomButton
                      title="Accept"
                      containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-2 px-2 rounded-full"
                    />
                    <CustomButton
                      title="Deny"
                      containerStyles="border border-[#66666645] text-xs text-ascent-2 px-1.5 py-2 px-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* SUGGESTED FRIENDS */}
          <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
            <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
              <span className="">Suggested Friends</span>
            </div>
            <div className="w-full flex flex-col gap-4 pt-4">
              {suggestedFriends?.map((friend) => (
                <div
                  className="flex items-center justify-between"
                  key={friend._id}
                >
                  <Link
                    to={"/profile/" + friend._id}
                    key={friend?._id}
                    className="w-full flex gap-4 items-centerm cursor-pointer"
                  >
                    <img
                      src={friend?.profileUrl ?? NoProfile}
                      alt=""
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-ascent-1">
                        {friend?.firstName} {friend?.lastName}
                      </p>
                      <span className="text-sm text-ascent-2">
                        {friend?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>
                  <div className="flex gap-1">
                    <button
                      className="bg-[#0444a430] text-sm text-white p-1 rounded"
                      onClick={() => {}}
                    >
                      <BsPersonFillAdd
                        size={20}
                        className="text-[#0f52b6] rounded-full"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    {edit && <EditProfile/>}
    </>
  );
};

export default Home;
