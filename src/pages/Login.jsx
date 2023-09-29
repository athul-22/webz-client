import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { TbSocial } from "react-icons/tb";
import { TextInput, CustomButton, Loading } from "../components";
import { useForm } from "react-hook-form";
import { NoProfile, Peoplebg } from "../assets";
import {BsShare} from 'react-icons/bs';
import {AiOutlineInteraction} from 'react-icons/ai'
import {ImConnection} from 'react-icons/im'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubitting] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl">
        {/* LEFT */}
        <div className="h-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 item-center mb-6">
            <div className="p-2 bg-[#065ad8] rounder text-white">
              <TbSocial />
            </div>
            <span className="text-2xl text-[#065ad8]" font-semibold>
              Webz
            </span>
          </div>
          <p className="text-ascent-1 text-base font-semibold">
            Log in to your account
          </p>
          <span className="text-sm mt-2 text-ascent-2">Welcome Back !</span>

          {/* FORM */}
          <form onSubmit={handleSubmit(onsubmit)} className="py-8 flex flex-col gap-5">
            <TextInput
              name="email"
              placeholder="email"
              label="Email Address"
              type="email"
              register={register("email", {
                required: "Email Address is required",
              })}
              styles="w-full rounded-full"
              labelStyles="ml-2"
              error={errors.email ? errors.email.message : ""}
            />

            <TextInput
              name="password"
              placeholder="password"
              label="Password"
              type="password"
              styles="w-full rounded-full"
              labelStyles="ml-2"
              register={register("password", {
                required: "Password is required",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            <Link
              to="/reset-password"
              className="text-sm text-right text-blue font-semibold"
            >
              Forget Password ?
            </Link>
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                title="Login"
              />
            )}
          </form>

          <p className="text-ascent-2 text-sm text-center">
            Dont HAve an account ?
            <Link to="/register" className="text-[#065ad8] font-semibold ml-2 cursor-pointer">
              Create Account
            </Link>
          </p>

        </div>
        {/* RIGHT */}
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue">
          <div className="relative w-full flex items-center justify-center">
            <img
              src={Peoplebg}
              alt=''
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded full object-cover"
              />

              <div className="absolute flex items-center gap-1 bg-white left-10 top-1 py-2 px-5 rounded-full">
                <BsShare size={14}/>
                <span className="text-xs font-medium">Share</span>
              </div>

              <div className="absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full">
                <ImConnection size={14}/>
                <span className="text-xs font-medium">Connect</span>
              </div>

              <div className="absolute flex items-center gap-1 bg-white left-12 bottom-6  py-2 px-5 rounded-full">
                <AiOutlineInteraction size={14}/>
                <span className="text-xs font-medium">Interact</span>
              </div>
          </div>
           
          <div className="mt-16 text-center">
                <p className="text-white text-base">
                  Connect with people & have share for fun
                </p>
                <span className="text-sm text-white/80">
                  Share memories with friends and the world.
                </span>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
