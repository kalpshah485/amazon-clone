import { useSession } from 'next-auth/client'
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutProduct from '../components/CheckoutProduct';
import Header from '../components/Header';
import Currency from 'react-currency-formatter';
import { selectItems, selectTotal } from '../slices/basketSlice';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key);

export default function Checkout() {

  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email: session.user.email,
      name: session.user.name
    });

    localStorage.removeItem('basket');

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    });

    if (result.error) alert(result.error.message);
  }

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}

        <div>
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your Shopping Basket is empty." : "Shopping Basket"}
            </h1>
            {items.map(({
              id,
              title,
              price,
              description,
              category,
              image,
              rating,
              hasPrime
            }, i) => (
              <CheckoutProduct
                key={i}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                rating={rating}
                image={image}
                hasPrime={hasPrime}
              />
            ))}
          </div>
        </div>

        {/* right */}

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 ? (
            <>
              <h2 className="whitespace-nowrap">
                {`Subtotal (${items.length} items): `}
                <span className="font-bold">
                  <Currency quantity={total} currency="GBP" />
                </span>
              </h2>
              <button
                disabled={!session}
                onClick={createCheckoutSession}
                className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}
              >
                {!session ? 'Sign in to Checkout' : 'Proceed to Checkout'}
              </button>
            </>
          ) : ''}
        </div>

      </main>
    </div>
  )
}
