import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import TableRow from '../TableRow';
import 'bootstrap/dist/css/bootstrap.css';
import CartRow from '../CartRow';

export default function CartPaginationData(props) {
  const { data } = props;
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems.map((e) => (
        <CartRow key={e.id} id={e.id} totalProducts={e.totalProducts} discountedTotal={e.discountedTotal} />
      ))}

      <ReactPaginate className="pagination" onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} renderOnZeroPageCount={null} />
    </>
  );
}
