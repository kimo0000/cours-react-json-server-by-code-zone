import './ViewProduct.css';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


function ViewProduct(props) {
   const params = useParams();

   console.log(params);

  const serverData = `http://localhost:9000/products/${params.productID}`;

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(serverData)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => {
        console.log("Error");
      })
  }, []);

  // console.log(product);

    return (
      <>
        <div className="product_info">
          <h3 className="productDetails">Product Details</h3>
          <ul className="lists">
            <li className="list">
              <div className="image">
                <img src={product.image} alt="Images" />
              </div>
              <div className="info">
                <h4 className="title">{product.title}</h4>
                <p className="cat">
                  Category: <b>{product.category}</b>
                </p>
                <p className="price">
                  Price: <b>{product.price}$</b>
                </p>
                <p className="desc">
                  <b>Description:</b> {product.description}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    );
}

export default ViewProduct;