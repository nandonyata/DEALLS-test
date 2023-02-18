import CartRow from '@/components/CartRow';
import Layout from '@/components/Layout';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';

export default function Carts() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/carts')
      .then((res) => res.json())
      .then((res) => setData(res.carts));
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

  // console.log(data);

  return (
    <>
      <Layout>
        <div className="container">
          <div style={{ paddingLeft: 50, paddingTop: 10 }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Cart Number</th>
                  <th scope="col">Items</th>
                  <th scope="col">Total Price (discounted)</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e) => (
                  <CartRow key={e.id} id={e.id} totalProducts={e.totalProducts} discountedTotal={e.discountedTotal} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
}
