import { useState } from "react";
import { loginAdmin } from "@/hooks";

export default function LoginForm() {
    const [account, setAccount] = useState({
        username_admin: "",
        password_admin: "",
    });
    const handleSubmit = async (e: any) => {
        const res = await loginAdmin(account);
        console.log(res);
    };
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };
    return (
        <>
            <div className="border-2 p-8 rounded-xl border-black bg-white text-black">
                <div className="flex flex-col items-start justify-center mb-7">
                    <h1 className=" font-semibold mb-5 mt-3 text-[35px] ">
                        Login
                    </h1>
                    <div className="flex flex-col gap-3">
                        <div className="md:flex md:gap-3 md:flex-col">
                            <div className="">
                                <h1 className="text-[20px] mb-1 md:text-[30px] xl:text-[25px]">
                                    username
                                </h1>
                                <input
                                    name="username_admin"
                                    type="text"
                                    className="border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px] md:w-[500px] md:p-3 lg:p-2 bg-white"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="">
                                <h1 className="text-[20px] mb-1 md:text-[30px] xl:text-[25px]">
                                    password
                                </h1>
                                <input
                                    name="password_admin"
                                    type="password"
                                    className="border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px] md:w-[500px] md:p-3 lg:p-2 bg-white"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <button
                                className="border border-black w-full bg-[#07393C] p-2 rounded-lg text-white font-bold uppercase"
                                onClick={handleSubmit}
                            >
                                LOGIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
