import { useState } from "react";
import { loginAdmin } from "@/hooks";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
    const router = useRouter();
    const [account, setAccount] = useState({
        username_admin: "",
        password_admin: "",
    });
    const handleSubmit = async () => {
        if (account.username_admin === "" || account.password_admin === "") {
            toast.error("Data tidak boleh kosong", {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
        const res = await loginAdmin(account);

        if (res.status === true) {
            toast.success("Login berhasil", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            router.push("/admin/dashboard");
        } else {
            toast.error(res.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    };
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };
    const enterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };
    return (
        <>
            <ToastContainer />
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
                                    onKeyDown={enterPressed}
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
                                    onKeyDown={enterPressed}
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
