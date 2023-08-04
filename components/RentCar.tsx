'use client'
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { manufacturers, carModels, yearsOfProduction } from "@/constants";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { transpileModule } from "typescript";
import { Autocomplete, Box, CircularProgress, Fade, FormControl, FormControlLabel, FormLabel, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { setTimeout } from "timers";


interface CarRentProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    refreshCars: boolean;
    setRefreshCars: (refreshCars: boolean) => void;
}

const RentCar = ({ isOpen, setIsOpen, refreshCars, setRefreshCars }: CarRentProps) => {

    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false)
    const [model, setModel] = useState('')
    const [price, setPrice] = useState<any>('')
    const [pageNumber, setPageNumber] = useState(1)
    const [manufacturer, setManuFacturer] = useState('')
    const [vites, setVites] = useState('')
    const [highway_mpg, setHighway_mpg] = useState<any>(0)
    const [city_mpg, setCity_mpg] = useState<any>(0)
    const [year, setYear] = useState<any | number>(2022)

    let modelVersions = []
    if (manufacturer != '') {
        const modelObject = carModels[manufacturer] != undefined ? carModels[manufacturer] : carModels.notfound
        modelVersions = modelObject
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true)

        try {
            const res = await fetch('/api/cars', {
                method: 'POST',
                body: JSON.stringify({
                    carmodel: model,
                    carbrand: manufacturer,
                    price,
                    vites,
                    userId: session?.user.id,
                    city_mpg,
                    highway_mpg,
                    year,
                    isRent: true,

                })
            })
            setIsOpen(false)
            setModel('')
            setManuFacturer('')
            setPrice('')
            setVites('')
            setPageNumber(1)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
            setRefreshCars(!refreshCars)
        }

    }

    console.log(manufacturer)
    return (
        <div className="fixed inset-1/2 flex justify-center items-center">
            {isOpen && (
                <div className="relative flex justify-center items-center">
                    <div className="bg-white shadow-lg shadow-black py-3 px-5 w-[270px]">
                        <div className="relative mb-3 border-b border-b-gray-700">
                            <h3>Rent a new car</h3>
                            <button onClick={() => (setIsOpen(false))} className="text-red absolute top-0 right-0">
                                X
                            </button>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                {pageNumber === 1 && (

                                    <div>
                                        <div className="search-manufacturer my-3">
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={manufacturers}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Car Brand" />}
                                                inputValue={manufacturer}
                                                onInputChange={(event, newInputValue) => {
                                                    setManuFacturer(newInputValue);
                                                }}
                                            />
                                        </div>

                                        <div>
                                            {manufacturer && (
                                                <div className="search-manufacturer">
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={modelVersions}
                                                        sx={{ width: 300 }}
                                                        renderInput={(params) => <TextField {...params} label="Car Model" />}
                                                        inputValue={model}
                                                        onInputChange={(event, newInputValue) => {
                                                            setModel(newInputValue);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-end mt-2">

                                            <button type="submit" onClick={() => (setPageNumber(pageNumber == 1 ? pageNumber + 0 : pageNumber - 1))} className="border rounded-xl py-1 px-3 bg-blue-200 disabled:opacity-75 hover:bg-blue-500"
                                                disabled={true}
                                            >
                                                Back
                                            </button>

                                            <button type="submit" onClick={() => (setPageNumber(pageNumber + 1))} className="border rounded-xl py-1 px-3 bg-blue-200 hover:bg-blue-500 disabled:opacity-75" disabled={model == '' || manufacturer == '' ? true : false}>
                                                Next
                                            </button>
                                        </div>
                                    </div>

                                )}
                                {pageNumber === 2 && (
                                    <div className="mt-3">
                                        <TextField
                                            id="outlined-number"
                                            label="Price"
                                            type="number"
                                            onChange={(e) => {
                                                setPrice(e.target.value)
                                            }}
                                            fullWidth
                                        />
                                        <div className="text-end mt-2">

                                            <button type="submit" onClick={() => (setPageNumber(pageNumber - 1))} className="border rounded-xl py-1 px-3 bg-blue-200 hover:bg-blue-500">
                                                Back
                                            </button>

                                            <button type="submit" onClick={() => (setPageNumber(pageNumber + 1))} className="border rounded-xl py-1 px-3 bg-blue-200 hover:bg-blue-500 disabled:opacity-75" disabled={price == '' ? true : false}>
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {pageNumber === 3 && (
                                    <div>
                                        {/* VITES */}
                                        <div className="mt-3 flex items-center">
                                            <FormControl className="w-1/2 sm:w-2/3">
                                                <FormLabel id="demo-row-radio-buttons-group-label">Gear</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    onChange={(e) => {
                                                        setVites(e.target.value)
                                                    }}
                                                >
                                                    <FormControlLabel value="auto" control={<Radio />} label="Auto" />
                                                    <FormControlLabel value="manuel" control={<Radio />} label="Manuel" />
                                                </RadioGroup>
                                            </FormControl>

                                            {/* YEAR */}
                                            <FormControl className="w-1/2 sm:1/3">
                                                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Year"
                                                    className="max-h-32"
                                                    onChange={(e) => {
                                                        setYear(e.target.value)
                                                    }}
                                                >
                                                    {yearsOfProduction.map((year) => (
                                                        <MenuItem value={year}>{year}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {/* YEAR */}
                                        </div>
                                        {/* VITES */}

                                        {/* CITY_MNG */}
                                        <div className="mt-3">

                                            <TextField
                                                id="outlined-number"
                                                label="City mpg"
                                                type="number"
                                                onChange={(e) => {
                                                    setCity_mpg(e.target.value)
                                                }}
                                                fullWidth
                                            />
                                        </div>
                                        {/* CITY_MNG */}

                                        {/* HIGWAY_MNG */}
                                        <div className="mt-3">

                                            <TextField
                                                id="outlined-number"
                                                label="Higway mpg"
                                                type="number"
                                                onChange={(e) => {
                                                    setHighway_mpg(e.target.value)
                                                }}
                                                fullWidth
                                            />
                                        </div>
                                        {/* HIGWAY_MNG */}
                                        {/* BUTTONSS */}
                                        <div className="text-center">
                                            <button type="submit" disabled={submitting} className="border mt-3 mb-5  rounded-xl py-1 px-5 bg-blue-200 hover:bg-blue-500">
                                                Rent!
                                            </button>

                                            <div className="text-end mt-2">

                                                <button onClick={() => (setPageNumber(pageNumber - 1))} className="border rounded-xl py-1 px-3 bg-blue-200 hover:bg-blue-500">
                                                    Back
                                                </button>

                                                <button onClick={() => (setPageNumber(pageNumber + 1))} className="border rounded-xl py-1 px-3 bg-blue-200 hover:bg-blue-500 disabled:opacity-75" disabled={true}>
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>

                    </div>
                </div>
            )
            }
        </div>
    )
}
export default RentCar;