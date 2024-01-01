export default function CardStats({
    booking,
    bookingPending,
    account,
    accountPending,
}: {
    booking: number;
    bookingPending: number;
    account: number;
    accountPending: number;
}) {
    return (
        <>
            <div className="flex flex-row items-start mb-10 text-black">
                <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                    <h1 className="font-regular mb-3">Total Bookings</h1>
                    <h1 className="text-[28px] font-bold ">{booking}</h1>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                    <h1 className="font-regular mb-3">Pending Booking</h1>
                    <h1 className="text-[28px] font-bold text-red-500">
                        {bookingPending}
                    </h1>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                    <h1 className="font-regular mb-3">Total Users</h1>
                    <h1 className="text-[28px] font-bold ">{account}</h1>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                    <h1 className="font-regular mb-3">Request Account</h1>
                    <h1 className="text-[28px] font-bold text-red-500">
                        {accountPending}
                    </h1>
                </div>
            </div>
        </>
    );
}
