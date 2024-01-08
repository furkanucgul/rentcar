'use client'

import { CarProps } from "@/types"
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Switch, colors } from "@mui/material";

interface CarCardProps {
    car: CarProps,
    deleteHandle: Function;
    editHandle: Function;
    isRentFunction: Function;
    rentDisabled: boolean;
}


const CarCard = ({ car, deleteHandle, editHandle, isRentFunction, rentDisabled }: any) => {

    const { carmodel, carbrand, price, vites, city_mpg, year, highway_mpg } = car

    const router = useRouter()
    const pathName: any = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [isRent, setIsRent] = useState(car.isRent)

    const { data: session }: any = useSession();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRent(e.target.checked)
        isRentFunction()
    }

    const handleProfileClick: MouseEventHandler<HTMLDivElement> = () => {
        if (car?.userId._id === session?.user.id) {
            router.push('/profile')
        } else {
            router.push(`/profile/${car.userId._id}`)
        }
    }

    return (
        <div className={`car-card group ${isRent ? 'bg-primary-blue-100 hover:bg-white' : 'bg-rose-500 hover:drop-shadow-md'}`}>
            <div className="car-card__content">
                <h2 className="car-card__content-title">
                    {carbrand} {carmodel}
                </h2>
                <div className="flex justify-end items-center hover:cursor-pointer" onClick={handleProfileClick}>
                    <p onClick={() => router.push('/profile')} className="text-sm italic mr-1 ">{car?.userId.username}</p>
                    <Image
                        src={car?.userId.image}
                        width={35}
                        height={35}
                        alt="profile image"
                        className="rounded-full"

                    />
                </div>
            </div>

            <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
                <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
                {price}
                <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
            </p>

            <div className="relative w-full h-40 sm:h-64 my-3 object-contain">
                <Image
                    src={generateCarImageUrl(`${car.carbrand}1`)}
                    alt="car model"
                    fill
                    priority
                    className="object-contain"
                />
            </div>

            <div className="relative flex w-full mt-2">
                <div className="flex group-hover:invisible w-full justify-between text-grey">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
                        <p className='text-[14px] leading-[17px]'>
                            {vites === "auto" ? "Automatic" : "Manual"}
                        </p>
                    </div>
                    <div className="car-card__icon">
                        <Image src="/tire.svg" width={20} height={20} alt="seat" />
                        <p className="car-card__icon-text">AWD</p>
                    </div>
                    <div className="car-card__icon">
                        <Image src="/gas.svg" width={20} height={20} alt="seat" />
                        <p className="car-card__icon-text">{city_mpg} MPG</p>
                    </div>
                </div>

                <div className="car-card__btn-container">
                    <CustomButton
                        title='View More'
                        containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                        textStyles='text-white text-[14px] leading-[17px] font-bold'
                        rightIcon='/right-arrow.svg'
                        handleClick={() => setIsOpen(true)}
                    />
                </div>

            </div>

            <div className="w-full mt-1">
                {car?.userId._id === session?.user.id && pathName === '/profile' && (

                    <div className="flex justify-between items-center mt-1">
                        <button onClick={() => editHandle()} className="py-2 px-3 rounded-lg min-w-[70px] bg-green-600 hover:bg-green-500 ">
                            Edit
                        </button>
                        <div className="flex flex-col justify-center items-center">

                            <Switch
                                checked={isRent}
                                onChange={handleChange}
                                color='success'
                                disabled={rentDisabled}
                                className={`${rentDisabled ? 'cursor-progress' : 'cursor-pointer'}`}
                            />
                            <i className={` ${isRent ? 'text-green-600' : 'text-black'}`}>
                                {isRent ? (
                                    'Active'
                                ) : (
                                    'Inactive'
                                )}
                            </i>
                        </div>

                        <button onClick={() => deleteHandle()} className="py-2 px-3 rounded-lg min-w-[70px] bg-red-600 hover:bg-red-500">
                            Delete
                        </button>
                    </div>
                )}

            </div>


            <CarDetails isOpen={isOpen}
                closeModal={() => setIsOpen(false)} car={car}
            />

        </div>
    )

}

export default CarCard