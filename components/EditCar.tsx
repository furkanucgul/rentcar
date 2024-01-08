'use client'
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { carModels, manufacturers } from "@/constants";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { transpileModule } from "typescript";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";


interface CarRentProps {
    editOpen: boolean;
    setEditOpen: (editOpen: boolean) => void;
    carId: string;
    carInfo: object;
    refreshCars: boolean;
    setRefreshCars: (refreshCars: boolean) => void;
}

const EditCar = ({ editOpen, setEditOpen, carId, carInfo, setRefreshCars, refreshCars }: any) => {

    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false)
    const [price, setPrice] = useState(0)
    const [vites, setVites] = useState('')
    const [highway_mpg, setHighway_mpg] = useState(0)
    const [city_mpg, setCity_mpg] = useState(0)
    const [year, setYear] = useState(2022)
    const [isRent, setIsRent] = useState(true)

    const [pageNumber, setPageNumber] = useState(1)
    const [query, setQuery] = useState('Volkswagen');
    const [query2, setQuery2] = useState('')

    useEffect(() => {
        setQuery2(`${carInfo.carmodel}`)
        setQuery(`${carInfo.carbrand}`)
        setCity_mpg(carInfo.city_mpg)
        setHighway_mpg(carInfo.highway_mpg)
        setPrice(carInfo.price)
        setYear(carInfo.year)
        setVites(carInfo.vites)
        setIsRent(carInfo.isRent)
    }, [carId])


    console.log(carInfo)


    const filteredManufacturers = query === ''
        ? manufacturers
        : manufacturers.filter((item) =>
            item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        )

    const getBrand = (query: any) => {
        const brands = carModels.map((car) => car.brand);
        return brands.includes(query) ? query : "Volkswagen";
    };

    const allModels: any = carModels.find(car => car.brand === getBrand(query))?.models

    const filterModels: any = carModels.find(car => car.brand === getBrand(query))?.models.filter((item) => (
        item.toLowerCase().replace(/\s+/g, "").includes(query2.toLowerCase().replace(/\s+/g, ""))
    ))

    const filteredModels = query2 === '' ? allModels : filterModels



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true)

        try {
            const res = await fetch(`/api/cars/${carId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    query,
                    query2,
                    price,
                    vites,
                    highway_mpg,
                    city_mpg,
                    year,
                    isRent
                })
            })
        } catch (error) {
            console.log('patch is failed')
        } finally {
            setRefreshCars(!refreshCars)
            setEditOpen(!editOpen)
            setSubmitting(false)
        }
    }
    return (
        <div className="fixed inset-1/2 flex justify-center items-center ">
            <div className="">
                {editOpen && (
                    <div className="relative flex justify-center items-center ">
                        <div className="bg-white shadow-lg shadow-black py-3 px-5">
                            <div className="relative mb-3 border-b border-b-gray-700">
                                <h3>Rent a new car</h3>
                                <button onClick={() => (setEditOpen(false))} className="text-red absolute top-0 right-0">
                                    X
                                </button>
                            </div>
                            <div className="w-80">
                                <form onSubmit={handleSubmit} className="flex flex-col">


                                    <div>
                                        <div className="search-manufacturer my-3">
                                            <Autocomplete
                                                value={query}
                                                inputValue={query}
                                                onInputChange={(event, newInputValue) => {
                                                    setQuery(newInputValue);
                                                }}
                                                id="controllable-states-demo"
                                                options={filteredManufacturers}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Car Brand" />}
                                            />
                                        </div>

                                        <div>
                                            {query && (
                                                <div className="search-manufacturer">
                                                    <Autocomplete
                                                        value={query2}
                                                        inputValue={query2}
                                                        onInputChange={(event, newInputValue) => {
                                                            setQuery2(newInputValue);
                                                        }}
                                                        id="controllable-states-demo"
                                                        options={filteredModels}
                                                        sx={{ width: 300 }}
                                                        renderInput={(params) => <TextField {...params} label="Controllable" />}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="relative">
                                            <input onChange={(e) => (setPrice(parseInt(e.target.value)))} required type="number" name="price" id="price" placeholder="price/day" className="rentcar__input" value={price} />
                                            <div className="absolute top-[-10px] left-1">
                                                Price
                                            </div>
                                        </div>

                                    </div>


                                    <div>
                                        {/* YEAR */}
                                        <div className="mt-3">
                                            <input onChange={(e) => (setYear(parseInt(e.target.value)))} required type="number" name="price" id="price" placeholder="year" className="rentcar__input" value={year} />
                                        </div>
                                        {/* YEAR */}

                                        {/* CITY_MNG */}
                                        <div className="mt-3">
                                            <input onChange={(e) => (setCity_mpg(parseInt(e.target.value)))} required type="number" name="city_mng" id="price" placeholder="City mng..." className="rentcar__input" value={city_mpg} />
                                        </div>
                                        {/* CITY_MNG */}

                                        {/* HIGWAY_MNG */}
                                        <div className="mt-3">
                                            <input onChange={(e) => (setHighway_mpg(parseInt(e.target.value)))} required type="number" name="higway_mng" id="price" placeholder="Higway mng" className="rentcar__input" value={highway_mpg} />
                                        </div>
                                        {/* HIGWAY_MNG */}

                                        {/* VITES */}
                                        <div className="mt-3 flex justify-around">
                                            <div>
                                                <input required type="radio" name="vites_radio" id="auto" value="Auto" onChange={() => (setVites('Auto'))} />
                                                <label htmlFor="auto" className="mr-2">Auto</label>
                                            </div>
                                            <div>
                                                <input required type="radio" name="vites_radio" id="manuel" value='Manuel' onChange={() => (setVites('Manuel'))} />
                                                <label htmlFor="manuel">Manuel</label>
                                            </div>
                                        </div>
                                        {/* VITES */}
                                    </div>



                                    <div className="text-center">
                                        <button type="submit" disabled={submitting} className="border mt-3 mb-5  rounded-xl py-1 px-5 bg-blue-200 hover:bg-blue-500">
                                            Rent!
                                        </button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}
export default EditCar;