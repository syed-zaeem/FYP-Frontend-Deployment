import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Footer } from 'react-day-picker'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* This will render the matched route content */}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
