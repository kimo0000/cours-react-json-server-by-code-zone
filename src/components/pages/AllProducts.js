import './AllProducts.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";



function AllProducts() {
 const serverData = "http://localhost:9000/products";

  const [products, setProducts] = useState([]);

  // console.log(products.length);
  
  useEffect(() => {
    getAllItems();
  }, [])

  const getAllItems = () => {
    fetch(serverData)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  const deleteItem = (productID, product) => {
    swal({
      title: `Are you sure To Delete Product in Title : ${product.title} ?`,
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(`Poof! Are You Sure To Delete Products : ${product.title} !`, {
          icon: "success",
        });

        fetch(`${serverData}/${productID}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => getAllItems(data));
      } else {
        swal(`Your Products In Title ${product.title} is safe!`);
      }
    });

    // const promptMsg = prompt("Are you sure you want to delete this Product");

    // if (promptMsg === "yes") {

    // }
  };


      const allProducts = products.map((product, index) => {
        let { title, category, description, price } = product;

        return (
          <tr key={product.id}>
            <td>{index + 1}</td>
            <td>{title.slice(0, 8)}...</td>
            <td>{category.slice(0, 8)}...</td>
            <td>{description.slice(0, 12)}...</td>
            <td>{price}$</td>
            <td className="btns">
              <button
                className="delete btn btn-danger"
                onClick={() => deleteItem(product.id, product)}
              >
                Delete
              </button>
              <Link
                to={`/allProducts/${product.id}`}
                className="view btn btn-info"
              >
                View
              </Link>
              <Link to={`/editProduct/${product.id}`} className="edit btn btn-success">Edit</Link>
            </td>
          </tr>
        );
      });

    return (
      <>
        <div className="all_products">
          <h3 className="text-center m-4">Get All Product</h3>
          <Link className="btn btn-success m-4" to="/allProducts/addNewProduct">
            Add New Product
          </Link>
          <table>
            <thead>
              <tr>
                <th>ID Number</th>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>{allProducts}</tbody>
          </table>
        </div>
      </>
    );
}

export default AllProducts;