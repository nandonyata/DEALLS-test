import Layout from '@/components/Layout';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Detial(props: any) {
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;
  const { product } = props;

  // useEffect(() => {
  //   fetch(`https://dummyjson.com/carts/${id}`)
  //     .then((res) => res.json())
  //     .then((res) => setData(res));
  // }, []);

  // if (!data) {
  //   return (
  //     <Layout>
  //       <div className="container">
  //         <div style={{ paddingLeft: 50, paddingTop: 10 }}>
  //           <h1>Loading ...</h1>
  //         </div>
  //       </div>
  //     </Layout>
  //   );
  // }

  // console.log(product, 'ppppp');

  return (
    // <>
    //   <p>aaa</p>
    // </>
    <>
      <Layout>
        <div className="container">
          <div style={{ paddingLeft: 50, paddingTop: 10 }}>
            <Link href="/carts" className="btn btn-primary" style={{ marginBottom: 10 }}>
              Back
            </Link>
            <h1 style={{ paddingTop: 20 }}>Cart {id}</h1>

            <div className="alert alert-secondary">
              <p>User: {product.userId}</p>
              <p># of Items: {product.totalProducts}</p>
              <p>Total Amount: {product.total}</p>
              <p>Discounted Total: {product.discountedTotal}</p>
            </div>

            <h3 style={{ paddingTop: 20 }}>Products</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {product.products.map((e: any) => (
                  <tr key={e.id}>
                    <td>{e.title}</td>
                    <td>{e.quantity}</td>
                    <td>{e.price}</td>
                    <td>{e.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`https://dummyjson.com/carts`);
  const dataCarts = await res.json();
  // console.log(dataCarts, '[[[[[[[[[[[');

  const paths = dataCarts.carts.map((e: any) => ({
    params: {
      id: `${e.id}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { id } = context.params;
  const res = await fetch(`https://dummyjson.com/carts/${id}`);
  const dataCarts = await res.json();

  return {
    props: {
      product: dataCarts,
    },
  };
}
