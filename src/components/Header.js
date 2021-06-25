import Image from 'next/image'
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  LocationMarkerIcon
} from '@heroicons/react/outline'

import headerStyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header>
      {/* Top Nav */}
      {/* sm - actions when goes past small screen */}
      <div className="flex items-center bg-amazon_blue p-1 py-2 flex-grow">
      
        <div className={`flex items-center flex-grow sm:flex-grow-0 p-2 ${headerStyles.borderOutline}`}>
          {/*  Image from next - It optimised the image rendering and uses webp for images */}
          <Image
            src={"https://pngimg.com/uploads/amazon/amazon_PNG11.png"}
            width={140}
            height={35}
            objectFit={"contain"}
            className={`custom-important-component`}
          />
        </div>

        <div className={`text-xs text-white mx-4 p-2 ${headerStyles.borderOutline}`}>
          <p className='hidden sm:inline'>Deliver to Chaitanya</p>
          <div className='flex items-center'>
            <LocationMarkerIcon className='h-5' />
            <p className={'font-bold md:text-sm'}>Sonipat, India</p>
          </div>
        </div>

        {/* Search */}
        <div className='hidden sm:flex items-center h-10 rounded-md flex-grow outline-yellow bg-yellow-400 hover:bg-yellow-500 cursor-pointer'>
          <input type="text" className={`p-2 h-full w-6 flex-grow flex-shrink rounded-l-md px-4`} />
          <SearchIcon className='h-12 p-4' />
        </div>

        {/* Right Bar */}
        <div className='text-white flex items-center text-xs space-x-6 mx-5 whitespace-nowrap'>
          <div className='link'>
            <p>Hello, Chaitanya</p>
            <p className={'font-bold md:text-sm'}>Account & Lists</p>
          </div>

          <div className='link'>
            <p>Returns</p>
            <p className={'font-bold md:text-sm'}>& Orders</p>
          </div>

          <div className='relative flex items-center link'>
            <span className='absolute top-0 right-0 md:right-6 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>0</span>

            <ShoppingCartIcon className='h-10' />
            <p className={'hidden md:inline font-bold md:text-sm mt-2'}>Cart</p>
          </div>
        </div>

      </div>

    {/*  Bottom Nav */}
      <div className={`flex items-center space-x-4 p-1 pl-4 bg-amazon_blue-light text-white text-sm`}>
        <p className={`flex items-center p-1 ${headerStyles.borderOutlineSm}`}>
          <MenuIcon className='h-6 mr-1' />
          All
        </p>
        <p className={`link`}>Prime Video</p>
        <p className={`link`}>Sell</p>
        <p className={`link`}>Amazon Pay</p>
        <p className={`link`}>Today's Deal</p>
        <p className='link hidden md:inline-flex'>Gift Cards</p>
        <p className='link hidden md:inline-flex'>Electronics</p>
        <p className='link hidden md:inline-flex'>Food & Grocery</p>
        <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
        <p className='link hidden lg:inline-flex'>Kindle eBooks</p>
      </div>
    </header>
  )
}

export default Header