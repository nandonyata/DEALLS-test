import Layout from '@/components/Layout';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Detial() {
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetch(`https://dummyjson.com/carts/${id}`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  if (!data) {
    return (
      <Layout>
        <div className="container">
          <div style={{ paddingLeft: 50, paddingTop: 10 }}>
            <h1>Loading ...</h1>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div className="container">
          <div style={{ paddingLeft: 50, paddingTop: 10 }}>
            <Link href="/carts" className="btn btn-primary" style={{ marginBottom: 10 }}>
              Back
            </Link>
            <h1 style={{ paddingTop: 20 }}>Cart {id}</h1>

            <div className="alert alert-secondary">
              <p>User: {data.userId}</p>
              <p># of Items: {data.totalProducts}</p>
              <p>Total Amount: {data.total}</p>
              <p>Discounted Total: {data.discountedTotal}</p>
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
                {data.products.map((e: any) => (
                  <tr>
                    <td>{e.title}</td>
                    <td>{e.quantity}</td>
                    <td>{e.price}</td>
                    <td>{e.total}</td>
                  </tr>
                ))}

                {/* <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
}
