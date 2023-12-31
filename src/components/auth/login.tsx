import { AiOutlineClose } from "react-icons/ai";
import { ChangeEvent, ReactHTML, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthButton } from "../ui/auth-button";
import { login } from "@/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LoginFormProps = {
    toggle: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ toggle }) => {
    const [role, setRole] = useState("mahasiswa");
    const [npm, setNpm] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "npm") {
            setNpm(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleLogin = async () => {
        if (npm === "" || password === "") {
            toast.error("Data tidak boleh kosong", {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }

        const res = await login({
            role,
            email,
            npm,
            password,
        });
        if (res.status === true) {
            toast.success("Login berhasil", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            window.location.reload();
        } else if (res.status === false) {
            toast.error(res.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    };

    const enterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };
    return (
        <>
            <div className="fixed z-50 top-0 right-0 flex items-center justify-center backdrop-blur-xl h-screen w-screen">
                <ToastContainer />
                <div className="p-5 bg-white rounded-xl text-black border-2 border-black shadow-xl">
                    <div className="flex justify-end" onClick={toggle}>
                        <AiOutlineClose className="text-2xl cursor-pointer" />
                    </div>
                    <h1 className="text-[30px] mb-5 md:mb-2 md:text-[40px] lg:text-[35px] mt-3 font-semibold lg:mb-5">
                        Login
                    </h1>
                    <div className="">
                        <h1 className="text-[20px] mb-1 md:text-[30px] xl:text-[25px]">
                            login sebagai
                        </h1>
                        <select
                            className="bg-[#ffffff] text-black border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-full"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="mahasiswa">Mahasiswa</option>
                            <option value="umum">Umum</option>
                            <option value="ukm">UKM</option>
                            <option value="organisasi">Organisasi</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <h1 className="text-[20px] mb-1 md:text-[30px] xl:text-[25px]">
                            {role === "mahasiswa" ? "npm" : "email"}
                        </h1>
                        <input
                            name={`${role === "mahasiswa" ? "npm" : "email"}`}
                            type="text"
                            className={`bg-[#ffffff] text-black border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px] md:w-[500px] md:p-3 lg:p-2 
                            `}
                            onChange={handleChange}
                            onKeyDown={enterPressed}
                        />
                    </div>
                    <div className="">
                        <h1 className="text-[20px] mb-1 md:text-[30px] xl:text-[25px]">
                            password
                        </h1>
                        <input
                            name={`password`}
                            type="password"
                            className={`bg-[#ffffff] text-black border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px] md:w-[500px] md:p-3 lg:p-2`}
                            onChange={handleChange}
                            onKeyDown={enterPressed}
                        />
                    </div>
                    <div className="mt-5 text-center">
                        <div onClick={handleLogin}>
                            <AuthButton message={`Login`} />
                        </div>

                        <h1 className="text-[16px] font-bold mt-7 md:text-[21px] xl:text-[18px]">
                            Lupa password?{" "}
                            <span className="text-[#07393C]">
                                Reset Password
                            </span>
                        </h1>
                    </div>
                    <div className="flex items-center justify-center mt-5">
                        <div className="w-[120px] h-[1px] bg-black md:w-[210px]"></div>
                        <div className="text-center mx-5 md:text-[25px] xl:text-[20px]">
                            OR
                        </div>
                        <div className="w-[120px] h-[1px] bg-black md:w-[210px]"></div>
                    </div>
                    <div className="text-center mb-5">
                        <h1 className="text-[16x] font-bold mt-5 md:mt-5 xl:text-[18px]">
                            Belum punya akun?{" "}
                            <span className="text-[#07393C] cursor-pointer">
                                Daftar
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
