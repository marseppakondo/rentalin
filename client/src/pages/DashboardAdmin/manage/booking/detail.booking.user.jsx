import DatePicker from 'react-datepicker'
import { formatPriceIDR } from '../../../../helper/amount'
import { assets } from '../../../../assets/assets'

const DetailBooking = ({ booking, user }) => {
    console.log(booking);
    console.log(user);


    return (
        <div className='mt-6 px-6 md:px-16 lg:px-32 flex items-center justify-center '>
            <div className='border rounded-md border-borderColor m-auto xl:max-w-[50%] p-6 flex flex-col justify-center space-y-6 text-gray-500 bg-white fixed top-0 bottom-0 md:top-5 md:bottom-5 lg:top-10 lg:bottom-10'>

                <div>
                    <h2 className='text-2xl font-semibold text-gray-700 mb-2'>Detail booking pelanggan</h2>
                    <p className='text-gray-400'></p>
                </div>

                <div className=''>
                    <p className='text-gray-700 text-lg font-semibold'>Alamat Penyewa</p>
                    <p className='text-gray-400'>{booking?.address}</p>
                </div>
                <div className=''>
                    <p className='text-gray-700 text-lg font-semibold'>Penyewa Kendaraan</p>
                    <div className='flex w-full justify-between'>
                        <p className='text-gray-400'>Nama</p>
                        <p className='text-gray-400'>{user?.username}</p>
                    </div>
                    <div className='flex w-full justify-between'>
                        <p className='text-gray-400'>Nomor telepon</p>
                        <p className='text-gray-400'>{booking?.phoneNumber}</p>
                    </div>
                </div>

                <hr className='text-gray-300' />


                <div>
                    <div className='flex justify-between'>
                        <img src={booking?.product?.image} alt="" className='w-40 rounded-md h-25 object-cover' />
                        <h1>{formatPriceIDR(booking?.product?.pricePerDay)} <span className='text-sm'>/hari</span></h1>
                    </div>
                    <div>
                        <p className='mt-2 text-gray-800 font-medium'>{booking.product?.brand} {booking.product?.model} {booking?.product?.year}</p>
                        <p className='text-sm'>{booking?.product?.category} • {booking?.product?.year}</p>
                    </div>

                    <div className='mt-4 grid grid-cols-2 gap-y-2 text-gray-600 max-w-70'>
                        <div className='flex items-center text-sm text-mted-foregraound'>
                            <img src={assets.users_icon} alt="" className='mr-2 h-2' />
                            <span>{booking?.product?.seating_capacity} Seats</span>
                        </div>

                        <div className='flex items-center text-sm text-mted-foregraound'>
                            <img src={assets.fuel_icon} alt="" className='mr-2 h-2' />
                            <span>{booking?.product?.fuel_type}</span>
                        </div>

                        <div className='flex items-center text-sm text-mted-foregraound'>
                            <img src={assets.car_icon} alt="" className='mr-2 h-2' />
                            <span>{booking?.product?.transmission}</span>
                        </div>

                        <div className='flex items-center text-sm text-mted-foregraound'>
                            <img src={assets.location_icon} alt="" className='mr-2 h-2.5' />
                            <span>{booking?.product?.location}</span>
                        </div>
                    </div>

                    <div className='my-4'>
                        <p className='ml-auto w-fit text-gray-700 font-medium'>Total Harga: {formatPriceIDR(booking?.price)}</p>
                    </div>
                </div>

                <hr className='text-gray-300' />


                <div className='flex gap-6 lg:gap-3 flex-col lg:flex-row'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="pickup-date">Tanggal Pengambilan</label>
                        <DatePicker
                            selected={booking?.pickupDate}
                            readOnly
                            dateFormat="yyyy-MM-dd"
                            className=' bg-gray-200 px-3 py-2 rounded-lg w-full outline-none'
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="pickup-date">Tanggal Pengambilan</label>
                        <DatePicker
                            selected={booking?.returnDate}
                            readOnly
                            dateFormat="yyyy-MM-dd"
                            className='bg-gray-200 px-3 py-2 rounded-lg w-full outline-none'
                            required
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DetailBooking

