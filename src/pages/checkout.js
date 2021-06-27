import Image from 'next/image'
import { useSelector } from 'react-redux'
import Header from "../components/Header"
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import Head from 'next/head'
import { useSession } from 'next-auth/client'
import { Fragment } from 'react'

const checkout = () => {
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const [session] = useSession()

  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Shopping Cart</title>
      </Head>

      <Header />
      
      <main className={"lg:flex max-w-screen-2xl mx-auto"}>
        {/* Items */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-2xl border-b pb-4">
              {
                items.length > 0 ?
                'Shopping Cart' :
                'Your Amazon Basket is Empty'
              }
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
              />
            ))}

            <h2 className="whitespace-nowrap border-t pt-4 flex justify-end">
              Subtotal ({items.length} items):
              <span className="ml-4 font-bold">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total)}
              </span>

            </h2>
            
          </div>
        </div>

        {/* Payment & total */}
        <div className="flex flex-col p-10 shadow-md bg-white">
          {
            items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  <div className="whitespace-breakspaces mb-4">
                    {
                      total >= 499 ?
                        <p className="text-xs text-green-600">{`Your order is eligible for FREE Delivery.`}</p> :
                        <p className="text-xs text-gray-500">{`Add ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(499 - total)} of eligible items to your order to qualify for FREE Delivery. `}</p>
                    }
                  </div>
                  Subtotal ({items.length} items):
                  <span className="font-bold">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total)}
                  </span>

                </h2>

                <button
                  disabled={!session}
                  className={`button mt-2`}>
                  {!session ? 'Sign In to Checkout' : 'Proceed to Checkout'}
                </button>
              </>
            )
          }
        </div>
      </main>

    </div>
  )
}

export default checkout
