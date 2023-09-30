import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  CustomButton,
  ProfileCard,
  TextInput,
  FriendsCard,
  TopBar,
} from "../components";
import { useForm } from "react-hook-form";
import { suggest, requests } from "../assets/data";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsPersonFillAdd } from "react-icons/bs";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const [friendRequest, setFriendrequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  return (
    <div className="home w-full px-0 lg:px pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
      <TopBar />

      <div className="w-full flex gap-2 lg:gap-2 pt-5 pb-10 h-full">
        {/* LEFT */}
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
          <ProfileCard user={user} />
          <FriendsCard friends={user?.friends} />
        </div>
        {/* CENTER  */}
        <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto lg:rounded-lg"></div>
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
                      className="bg-[#0444a430] text-sm text-white p-1 rounded" onClick={()=>{}}>
                        <BsPersonFillAdd size={20} className="text-[#0f52b6] rounded-full" />
                      </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
