import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import {
  selectItems,
  selectTotal,
  fetchFromLocalStorage,
} from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Footer from "../components/Footer";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

const checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();

  const dispatch = useDispatch();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) dispatch(fetchFromLocalStorage(items));
  }, []);

  // console.log(session);

  const createCheckoutSession = async () => {
    // console.log("public k", process.env.stripe_public_key);
    const stripe = await stripePromise;

    console.log("stripe", stripe);
    // call the backend to create checkout session..
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    console.log("checkoutsession", checkoutSession);
    localStorage.removeItem("items");

    // redirect the user to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
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
              {items.length > 0
                ? "Shopping Cart"
                : "Your Amazon Basket is Empty"}
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
                quantity={item.quantity}
              />
            ))}

            <h2 className="whitespace-nowrap border-t pt-4 flex justify-end">
              Subtotal ({items.length} items):
              <span className="ml-4 font-bold">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(total)}
              </span>
            </h2>
          </div>
        </div>

        {/* Payment & total */}
        <div className="flex flex-col p-10 shadow-md bg-white">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                <div className="whitespace-breakspaces mb-4">
                  {total >= 499 ? (
                    <p className="text-xs text-green-600">{`Your order is eligible for FREE Delivery.`}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Add
                      <span className="text-blue-400 mx-1">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(499 - total)}
                      </span>
                      of eligible items to your order to qualify for FREE
                      Delivery.
                    </p>
                  )}
                </div>
                Subtotal ({items.length} items):
                <span className="font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(total)}
                </span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${!session && "not-allowed-button"}`}
              >
                {!session ? "Sign In to Checkout" : "Proceed to Checkout"}
              </button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default checkout;
