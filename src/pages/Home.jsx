import React from "react";
import { useSelector } from "react-redux";
import { CustomButton, ProfileCard, TextInput, TopBar } from "../components";
import { useForm } from "react-hook-form";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  

  return (
    <div className="home w-full px-0 lg:px pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
      <TopBar />
      
      <div className="w-full flex gap-2 lg:gap-2 pt-5 pb-10 h-full">

        {/* LEFT */}
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">

          <ProfileCard user={user}/>
        </div>
        {/* CENTER  */}
        <div></div>
        {/* RIGHT  */}
        <div></div>

      </div>

    </div>
  );
};

export default Home;
