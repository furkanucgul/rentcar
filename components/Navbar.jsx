'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, [])

  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent '>
        <Link
          href='/'
          className='flex justify-center items-center'
        >
          <Image
            src='/logo.svg'
            alt='logo'
            width={118}
            height={18}
            className='object-contain'
          />
        </Link>

        {
          session?.user ? (
            <div className='flex'>
              <button
               onClick={() => (
                signOut()
               )}
               className='pr-6 text-blue-900'
              >
                Sign Out
              </button>
              <Link href='/profile'  >
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile image'
                />
              </Link>
            </div>
          ) : (
            <>
              {providers && 
                Object.values(providers).map((provider) => (
                  <button 
                  key={provider.name}
                    onClick={() => (
                      signIn(provider.id)
                    )}
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </nav>
    </header>
  )
}

export default Navbar