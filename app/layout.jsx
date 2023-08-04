import './globals.css'
import Provider from '@/components/Provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Car Hub',
  description: 'Discover the best cars in the world',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='relative'>
        <Provider>
          <Navbar/>
          {children}
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}
