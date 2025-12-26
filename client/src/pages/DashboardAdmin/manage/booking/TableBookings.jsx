import {
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
    Avatar,
    Card,
    CardBody,
    Typography
} from "@material-tailwind/react"
import { formatPriceIDR } from "../../../../helper/amount";
import { useState } from "react";
import DetailBooking from "./detail.booking.user";
import { useAppContext } from "../../../../context/useAppContext";

const TableBookings = ({ header, datas, changeStatusBooking }) => {

    const { axios } = useAppContext()

    const [dataById, setDataById] = useState(null)
    const [dataUser, setDataUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleOpenDetail = async (booking) => {
        if (loading || !booking?.user) return

        const userId =
            typeof booking.user === "object"
                ? booking.user._id
                : booking.user

        if (!userId) return

        try {
            setLoading(true)
            setDataById(booking)
            setDataUser(null)

            const { data } = await axios.post("/api/user/data-id", { userId })

            if (data.succes) {
                setDataUser(data.user)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const closeDetail = () => {
        setDataById(null)
        setDataUser(null)
        setLoading(false)
    }

    return (
        <>
            <Card className="my-6 w-full bg-white shadow-2xl/4">
                <CardBody className="px-5">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {header.map((head, index) => (
                                    <th
                                        key={index}
                                        className={`${head === "Kategori" || head === "Status" ? "max-md:hidden" : ""} cursor-pointer border-y border-gray-300 bg-gray-50/50 p-4 transition-colors hover:bg-gray-100`}
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}{" "}
                                            {index !== header.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {datas.map(
                                (data, index) => {
                                    const isLast = index === datas.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-gray-200";

                                    return (
                                        <tr key={data._id} className="hover:bg-gray-50" >
                                            <td className={classes} >
                                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleOpenDetail(data)}>
                                                    <Avatar src={data.product.image} alt={data.product.brand} size="sm" />
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="gray"
                                                            className="font-normal"
                                                        >
                                                            {data.product.brand} {data.product.model}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {data.product.seating_capacity} • {data.product.transmission}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`${classes} max-md:hidden`}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="gray"
                                                        className="font-normal"
                                                    >
                                                        {data.pickupDate.split('T')[0]} -- {data.returnDate.split('T')[0]}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={`${classes} max-md:hidden`}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="gray"
                                                        className="font-normal"
                                                    >
                                                        {formatPriceIDR(data.price)}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className='p-3 max-md:hidden'>
                                                <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>Tunai</span>
                                            </td>
                                            <td className='p-3'>
                                                {data.status === "Tertunda" ? (
                                                    <select value={data.status} className='rounded-md border border-borderColor outline-none px-2 py-1.5 mt-1 text-gray-500' onChange={(e) => changeStatusBooking(data._id, e.target.value)}>
                                                        <option value="Tertunda" className='outline-hidden'>Tertunda</option>
                                                        <option value="Dibatalkan">Dibatalkan</option>
                                                        <option value="Dikonfirmasi">Dikonfirmasi</option>
                                                    </select>
                                                ) : (
                                                    <span className={`text-xs rounded-full px-3 py-1 ${data.status === "Dikonfirmasi" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{data.status}</span>
                                                )}
                                            </td>
                                        </tr>

                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card >

            {dataById && dataUser && !loading && (
                <div
                    className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex justify-center items-center p-4"
                    onClick={closeDetail}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <DetailBooking booking={dataById} user={dataUser} />
                    </div>
                </div>
            )}

        </>
    )
}

export default TableBookings
