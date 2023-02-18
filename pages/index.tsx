import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
// import styles from '@/styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import TableRow from '@/components/TableRow';
import PaginationData from '@/components/Pagination';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [input, setInput] = useState('');

  const categories = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration'];
  let brands;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == 'maxPrice') {
      setMaxPrice(value);
      return;
    }
    if (name == 'minPrice') {
      setMinPrice(value);
      return;
    }

    setInput(value);
  };

  const submitPrice = (e) => {
    e.preventDefault();
    // console.log({ maxPrice, minPrice });

    const temp = data.filter((el) => el.price >= minPrice && el.price <= maxPrice);
    setData2(temp);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (input == '' || input == ' ') {
      setData2(null);
      return;
    }

    const temp = data.filter((el) => el.title.toLowerCase().includes(input));
    setData2(temp);
  };

  const handleFilterByCategory = (e) => {
    const value = e.target.value;
    const temp = data.filter((el) => el.category == value);
    setData2(temp);
  };

  const handleFilterByBrand = (e) => {
    const value = e.target.value;
    const temp = data.filter((el) => el.brand == value);
    setData2(temp);
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((res) => setData(res.products));
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

  const temp = data.map((e) => e.brand);
  brands = temp.filter((value, i) => temp.indexOf(value) == i);

  // console.log(data, '< , <');

  return (
    <>
      <Layout>
        <div className="container">
          <div style={{ paddingLeft: 50, paddingTop: 10 }}>
            <div style={{ padding: 10 }}>
              <form onSubmit={handleSearch}>
                <input type="search" placeholder="search by name" style={{ marginBottom: 10 }} className="form-control w-25" onChange={handleChange} />
                <input type="submit" value="submit" className="btn btn-primary" />
              </form>
            </div>

            <div style={{ padding: 10 }}>
              <select defaultValue={'DEFAULT'} onChange={handleFilterByCategory} className="form-select w-25" aria-label="Default select example">
                <option value="DEFAULT" disabled>
                  Filter by category
                </option>
                {categories.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
            </div>

            <div style={{ padding: 10 }}>
              <select defaultValue={'DEFAULT'} onChange={handleFilterByBrand} className="form-select w-25" aria-label="Default select example">
                <option value="DEFAULT" disabled>
                  Filter by brand
                </option>
                {brands.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
            </div>
            <hr />
            <div style={{ padding: 10 }}>
              <form onSubmit={submitPrice}>
                <input type="number" onChange={handleChange} name="minPrice" placeholder="Min price" className="form-select w-25" style={{ marginBottom: 10 }} />
                <input type="number" onChange={handleChange} name="maxPrice" placeholder="Max price" className="form-select w-25" style={{ marginBottom: 10 }} />
                <input type="submit" value="submit" className="btn btn-primary" />
              </form>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Category</th>
                </tr>
              </thead>
              <tbody>{data2 ? data2.map((e) => <TableRow id={e.id} key={e.id} title={e.title} brand={e.brand} price={e.price} category={e.category} stock={e.stock} />) : <PaginationData data={data} />}</tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
}
