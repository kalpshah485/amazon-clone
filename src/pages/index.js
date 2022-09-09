import { getSession } from "next-auth/client";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSetDataToBasket } from "../assets/utils";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {

  const dispatch = useDispatch();
  useEffect(() => {
    const localStorageItems = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];
    useSetDataToBasket(dispatch, localStorageItems)
  }, [])

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession();
  const products = await fetch('https://fakestoreapi.com/products').then(
    (res) => res.json()
  );

  return {
    props: {
      products,
      session
    }
  }
}
