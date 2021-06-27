import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addToBasket, removeFromBasket } from "../slices/basketSlice"


const MAX_RATING = 5
const MIN_RATING = 1

const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  image
}) => {
  // randamised rating
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  )

  const dispatch = useDispatch()
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image
    }

    dispatch(addToBasket(product))
  }

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }))
  }


  return (
    <div className={'grid grid-cols-5'}>
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
        <button onClick={addItemToBasket} className="button text-xs sm:text-sm">Add to Basket</button>
        <button onClick={removeItemFromBasket} className="button text-xs sm:text-sm">Remove from Basket</button>
      </div>
    </div>
  )
}

export default CheckoutProduct
