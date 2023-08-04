import Navbar from '@/components/Navbar'
import './globals.css'
import Footer from '@/components/Footer'
import Provider from '@/components/Provider'

export const metadata = {
  title: 'Car Hub',
  description: 'Discover the best cars in the world',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='relative'>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
