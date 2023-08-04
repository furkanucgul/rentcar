'use client'
import { useEffect, useState } from "react";
import CarCard from '../../../components/CarCard'
import CarCardSkeleton from '@/components/CarCardSkeleton';

const myProfile = ({params}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cars, setCars] = useState([])
    const [uploadCars, setUploadCars] = useState(false)
    useEffect(() => {
        const fetchCars = async () => {
            setUploadCars(true)
            try {
                const res = await fetch(`/api/users/${params.id}/cars`)
                const data = await res.json()
                setCars(data)
            } catch (error) {
                
            } finally {
                setUploadCars(false)
            }
        }
        fetchCars()
    }, [])

    return (
        <div className='overflow-hidden'>
            <div className='mt-12 padding-x padding-y max-width'>
                
                    <div>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='my-3'>
                                <h2>
                                    Welcome to ... Profile page
                                </h2>
                            </div>
                        </div>
                        <div>
                            
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
                            
                        </div>
                    </div>
               
            </div>

        </div>
    )
}

export default myProfile