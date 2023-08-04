'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { useEffect, useState } from "react";
import RentCar from '../../components/RentCar';
import CarCard from '../../components/CarCard'
import EditCar from '@/components/EditCar';
import { CircularProgress, LinearProgress } from '@mui/material';
import CarCardSkeleton from '@/components/CarCardSkeleton';

const myProfile = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false)
    const [cars, setCars] = useState([])
    const [refreshCars, setRefreshCars] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [carId, setCarId] = useState('')
    const [carInfo, setCarInfo] = useState({})
    const [carsCome, setCarsCome] = useState(true)
    const [uploadCars, setUploadCars] = useState(false)
    const [rentDisabled, setRentDisabled] = useState(false)

    
    const deleteHandle = async (car) => {
        const hasConfirmed = confirm('are you sure')
        if (hasConfirmed) {
            await fetch(`/api/cars/${car._id.toString()}`, {
                method: 'DELETE'
            })
            const filteredCars = cars.filter((c) => c._id != car._id)
            setCars(filteredCars)
        }
    }

    const editHandle = (post) => {
        setEditOpen(!editOpen)
        setCarId(post._id)
        setCarInfo(post)
    }

    const isRentFunction = async(c) => {
        setRentDisabled(true)
        try {
            const response = await fetch(`/api/cars/isrent/${c._id}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    isRent: !c.isRent
                })
            })
        } catch (error) {
            console.log('switch patch is failed')
        }finally{
            setRentDisabled(false)
        }
    }

    useEffect(() => {
        const fetchCars = async () => {
            setUploadCars(true)
            try {
                const res = await fetch(`/api/users/${session?.user.id}/cars`)
                const data = await res.json()
                setCars(data)
            } catch (error) {
                setCarsCome(false)
            } finally {
                setUploadCars(false)
            }
        }
        if (session?.user.id) fetchCars()
    }, [refreshCars, session?.user.id])

    return (
        <div className='overflow-hidden'>
            <div className='mt-12 padding-x padding-y max-width'>
                {session?.user.id !== undefined ? (
                    <div>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='my-3'>
                                <h2>
                                    Welcome to your profile page {session.user.name}
                                </h2>
                            </div>
                            <div>
                                <button className='p-3 rounded bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-400 hover:to-blue-600' onClick={() => setIsOpen(!isOpen)}>
                                    Rent a new car
                                </button>
                                <div className='absolute z-20'>
                                    <RentCar
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        refreshCars={refreshCars}
                                        setRefreshCars={setRefreshCars}
                                    />
                                    <EditCar
                                        editOpen={editOpen}
                                        setEditOpen={setEditOpen}
                                        carId={carId}
                                        carInfo={carInfo}
                                        setRefreshCars={setRefreshCars}
                                        refreshCars={refreshCars}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            {carsCome ? (
                                <div>
                                    {uploadCars ? (
                                        <div className="flex flex-wrap justify-around">
                                            <CarCardSkeleton />
                                            <CarCardSkeleton />
                                            <CarCardSkeleton />
                                        </div>
                                    ) : (
                                        <div>
                                            {cars.length > 0 ? (
                                                <div className="home__cars-wrapper">
                                                    {cars.map((i) => (
                                                        <CarCard
                                                            key={i._id}
                                                            car={i}
                                                            rentDisabled={rentDisabled}
                                                            deleteHandle={() => deleteHandle && deleteHandle(i)}
                                                            editHandle={() => editHandle && editHandle(i)}
                                                            isRentFunction={() => isRentFunction && isRentFunction(i)}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className='text-center mb-56 mt-32 sm:mt-20 sm:mb-32'>
                                                    You don't have a rental car yet, <button className='text-blue-700 hover:text-blue-400' onClick={() => setIsOpen(!isOpen)}>click here</button> to rent one.
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    servere ulasilamadi
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='w-full text-center mt-32 mb-56'>
                        <div>
                            <CircularProgress />
                            <h3 className='text-blue-500'>Your profile page is loading...</h3>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default myProfile