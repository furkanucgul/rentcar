'use client'

import { useEffect, useState } from 'react'
import CarCard from "@/components/CarCard";
import CustomFilter from "@/components/CustomFilter";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import CarCardSkeleton from '@/components/CarCardSkeleton';
import { getProviders } from 'next-auth/react';

export default function Home() {

    const [cars, setCars] = useState([])
    const [providers, setProviders] = useState < any >(null)

    useEffect(() => {
        const getCars = async () => {
            const response = await fetch('/api/cars')
            const data = await response.json();
            setCars(data)
            console.log(data)
        }
        getCars()
    }, [])
    
    const isDataEmpty = !Array.isArray(cars) || cars.length < 1 || !cars;

    return (
        <main className="overflow-hidden">
            <Hero />
            <div className="mt-12 padding-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4x1 font-extrabold">
                        Car catalogue
                    </h1>
                    <p>Explore out cars you might like</p>
                </div>

                <div className="home__filters">
                    <SearchBar />

                    <div className="home__filter-container">
                        <CustomFilter title="fuel"
                            options={fuels} />
                        <CustomFilter title="year"
                            options={yearsOfProduction} />
                    </div>
                </div>
                {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {cars?.map((car) => (
                                <CarCard
                                    key={car._id}
                                    car={car}
                                />
                            ))}
                        </div>

                        {/* <ShowMore
                            pageNumber={(searchParams.limit || 10) / 10}
                            isNext={(searchParams.limit || 10) > cars.length}
                        /> */}
                    </section>
                ) : (
                    <div className="flex flex-wrap justify-around">
                        <CarCardSkeleton/>
                        <CarCardSkeleton/>
                        <CarCardSkeleton/>
                        <CarCardSkeleton/>
                        <CarCardSkeleton/>
                        <CarCardSkeleton/>
                    </div>
                )}
            </div>
        </main>
    )
}