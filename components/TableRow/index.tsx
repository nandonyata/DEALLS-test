export default function TableRow(props: any) {
  const { title, brand, category, price, stock, id } = props;
  return (
    <>
      <tr>
        <td>{id} </td>
        <th scope="row">{title}</th>
        <td>{brand}</td>
        <td>{price}</td>
        <td>{stock}</td>
        <td>{category}</td>
      </tr>
    </>
  );
}
