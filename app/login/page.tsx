"use client";
import { FormRow, Loader, Logo } from "@/components";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Img from "@/src/assets/login.png";
import { loginPageImage } from "@/src/assets/cloudinaryImageLinks"
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useAppSelector } from "@/redux/store";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

const initialState = {
  username: "",
  password: "",
};

interface ILoginStateProps {
  username: string;
  password: string;
}

const Page: React.FC = () => {
  const [showPassword, setShowPassWord] = useState(false)
  const [values, setValues] = useState<ILoginStateProps>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const { leadCategory, leadSubCategory } = useAppSelector(
    (state: { filterLeadsSlice: any }) => state.filterLeadsSlice
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async() => {

    if (!values.username.trim() || !values.password.trim()) {
      toast.error("Ckeck Your Fields...", {
        duration: 3000
      });
    } else {
      try {
        setIsLoading(true);
        setShowPassWord(false)
        const response = await axios.post(`${URL}/api/auth/login`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setValues(initialState);
        const { accessToken, expiresIn, refreshToken, refreshTokenExpiry } = await response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessTokenExpiry", expiresIn);
        localStorage.setItem("refreshTokenExpiry", refreshTokenExpiry);

        toast.success("Logged In Successfully...", {
          duration: 3000
        });
        route.push("/dashboard");

      } catch (error) {
        if (error instanceof AxiosError) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            "Network Issue Try Later!";
          toast.error(message, {
            duration: 3000
          });
        }

      } finally {
        setIsLoading(false);
      }
    }
  };

  function formFunction(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
  }
  return (
    <>
      <Toaster position="top-right"
        reverseOrder={false} />
        {/* main container */}
      <main className="h-screen w-full  flex items-center justify-center bg-gray-100  ">
        <div className="h-full w-full   md:flex ">
          
          <div className="h-full flex  items-center justify-center flex-col  w-full lg:w-[47%] ">
            <div className="h-[85%] shadow-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[75%] flex rounded-lg flex-col items-center bg-white">
      {/* logo div */}
              <div className="h-1/4  text-5xl flex items-center  text-black font-semibold">
                <Logo />
              </div>
              <div className="w-[80%]">
                <p className="text-black text-4xl font-semibold tracking-wider self-start ">
                  Login
                </p>
              </div>
              <form
                className="w-[80%] md:w-[80%] my-10 flex flex-col space-y-4"
                onSubmit={formFunction}
              >
                <FormRow
                  type="text"
                  name="username"
                  value={values.username}
                  labelText="Username"
                  handleChange={handleChange}
                />
                {/* <FormRow
                  type="password"
                  name="password"
                  value={values.password}
                  labelText="Password"
                  handleChange={handleChange}
                /> */}
                <div className=" flex flex-col w-full  sm:text-sm text-xs">
                  <label htmlFor="name" className="text-gray-700 capitalize tracking-wide">{"Password"}</label>
                  <div className="border-[0.5px] rounded mt-1 p-1 border-gray-300 flex w-full">
                    <input
                      type={showPassword ? 'text' : "password"}
                      name="password"
                      className="w-full rounded outline-none text-gray-600"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <button className="scale-110 mr-1" onClick={() => setShowPassWord(!showPassword)}>
                      {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </button>
                  </div>
                </div>
                <div className="text-center  w-full">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`capitalize px-7 mt-2 py-2  tracking-wider rounded-md bg-[#4939FF] text-white w-full text-lg ${isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#4939FF] hover:bg-blue-600"
                      }`}
                  >

                    {isLoading ? <Loader /> : "Sign In"}
                  </button>
                </div>
              </form>
              <div className="w-full  flex flex-col items-center justify-center">
                <h2 className="absolute text-md mb-1 bg-white p-1 text-gray-400">
                  or
                </h2>
                <div className="h-[1.5px] w-[80%] sm:w-[80%] md:w-[80%]  bg-gray-300"></div>
              </div>

              <div className="mt-10 text-sm">
                <p className="text-gray-700">
                  {"Not a member yet ? "}
                  <button  type="button" className="text-blue-500 underline">
                    Register
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex w-[53%] items-center justify-center">
            <img src={loginPageImage} alt={"login"} />
          </div>
        </div>
      </main>
    </>

  );
};

export default Page;
