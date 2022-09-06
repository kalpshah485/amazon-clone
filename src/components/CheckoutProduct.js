import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { useAddItemToBasket, useRemoveItemFromBasket } from '../assets/utils';

export default function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime
}) {

  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-5">
      <Image
        src={image}
        height={200}
        width={200}
        objectFit="contain"
      />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating).fill().map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="GBP" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading='lazy'
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt="prime-logo"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button
          onClick={() => useAddItemToBasket(dispatch, {
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
            hasPrime
          })}
          className="button mt-auto"
        >
          Add to Basket
        </button>
        <button
          className="button mt-auto"
          onClick={() => useRemoveItemFromBasket(dispatch, { id })}
        >
          Remove from Basket
        </button>
      </div>
    </div>
  )
}
