import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addToBasket, removeFromBasket, decrementQuantity, incrementQuantity } from "../slices/basketSlice"


const MAX_RATING = 5
const MIN_RATING = 1

const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  image,
  quantity
}) => {
  // randamised rating
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  )
  const [quant, setQuant] = useState(quantity)

  const dispatch = useDispatch()

  const removeItemFromBasket = () => {
    // setQuant(quantity)
    dispatch(removeFromBasket({ id }))
  }

  useEffect(() => {
    setQuant(quantity)
  }, [removeItemFromBasket])

  const decrementItemQuantity = () => {
    if (quant - 1 == 0) {
      dispatch(removeFromBasket({ id }))
      return
    }

    setQuant(quant - 1)
    
    dispatch(decrementQuantity({ id }))
  }

  const incrementItemQuantity = () => {
    setQuant(quant + 1)

    dispatch(incrementQuantity({ id }))
  }


  return (
    <div className={'cart-item'}>
      <Image src={image} width={200} height={200} objectFit={'contain'} />

      <div className={'col-span-3 mx-5'}>
        <p>{title}</p>
        <div className="flex">
          {Array(rating).fill().map((_, index) => (
            <StarIcon key={index} className={'h-5 text-yellow-500'} />
          ))}
        </div>

        <p className={"text-xs my-2 line-clamp-3"}>{description}</p>

        <div className='mb-5'>
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)}
        </div>
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <div className="flex space-x-2 items-center justify-center">
          <button onClick={decrementItemQuantity} className="p-2 px-4 text-xs md:text-sm bg-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400">-</button>
          <span>{quant}</span>
          <button onClick={incrementItemQuantity} className="p-2 px-4 text-xs md:text-sm bg-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400">+</button>
        </div>
        <button onClick={removeItemFromBasket} className="button text-xs sm:text-sm">Remove from Basket</button>
      </div>
    </div>
  )
}

export default CheckoutProduct
