'use client'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { AiFillFacebook } from 'react-icons/ai'
import Link from 'next/link'

const signUp = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <div className="w-full flex justify-center items-center">
            <div className='border my-32 border-solid border-gray-600 rounded p-5 w-64 sm:w-[300px]'>
                <form onSubmit={(e) => {
                    e.preventDefault()
                }} className='flex flex-col justify-center items-center'>
                    <div>
                        <TextField
                            label="E-posta"
                            variant="outlined"
                            type="email"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </div>
                    <div>
                        <i className='text-xs'>Sign in with your acounts</i>
                    </div>
                    <div className='flex w-full justify-around mt-1'>
                        <FcGoogle className='w-10 h-10' />

                        <AiFillFacebook className='w-10 h-10' />
                    </div>
                    <div className='my-2'>
                        <button type="submit" className='bg-sky-500 px-3 py-2 rounded-full hover:bg-sky-400'>Log in</button>
                    </div>
                    <div>
                        <i className='text-sm mt-1'>
                            don't you have an acount
                            <Link className='text-blue-700 hover:text-blue-500' href='/signUp'> sign Up</Link>
                        </i>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default signUp