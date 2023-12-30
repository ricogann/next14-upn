type AuthButtonProps = {
    message: string;
};

const AuthButton: React.FC<AuthButtonProps> = ({ message }) => {
    return (
        <>
            <button className="border border-black w-full bg-[#07393C] p-2 rounded-lg text-white font-bold uppercase">
                {message}
            </button>
        </>
    );
};

export { AuthButton };
