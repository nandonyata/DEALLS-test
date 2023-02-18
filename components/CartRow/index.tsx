import Link from 'next/link';

export default function CartRow(props) {
  const { id, totalProducts, discountedTotal } = props;

  const detailHandler = () => {
    console.log('cart with id', id);
  };

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{totalProducts}</td>
        <td>{discountedTotal}</td>
        <td>
          <Link href={`/details/${id}`} className="btn btn-primary">
            Detail
          </Link>
        </td>
      </tr>
    </>
  );
}
