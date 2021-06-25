import Head from "next/head";
import Header from "../components/Header";
import Banner from '../components/Banner'
import ProductFeed from '../components/ProductFeed'

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Product Feed */}
        {/* {console.log(products)} */}
        <ProductFeed products={products} />
      
      </main>
    </div>
  );
}


// by having this function, this tells next.js that it is not a static page and it's need a server in between for fetching and passing the data to the component

export const getServerSideProps = async (context) => {
  const products = await fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
  
  return {
    props: {
      products
    }
  }
}