import { useState, useEffect } from "react";
import './AllCategory.css'


function AllCategory() {

   const serverData = `http://localhost:9000/products`;

   const [products, setProducts] = useState([]);
   const [category, setCategory] = useState([]);
   const [search, setSearch] = useState("All");
   const [isActive, setIsActive] = useState(0);

   const buttonActive = (buttonName, index) => {
     setSearch(buttonName);
     setIsActive(index);
   };

   console.log(isActive);

   const getAllProducts = () => {
     fetch(`${serverData}`)
       .then((res) => res.json())
       .then((data) => setProducts(data));
   }

   const getAllCategory = () => {
      fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((data) => setCategory(data));
   }

   const allCategorys = category.map((cat, index) => {
    return (
      <button
        className={isActive === index + 1 ? `${cat} active` : ""}
        key={cat}
        onClick={(e) => buttonActive(e.target.innerText, index + 1)}
      >
        {cat}
      </button>
    );
   })

   useEffect(() => {
    getAllProducts();
    getAllCategory();
    
   }, []);

  return (
    <>
      <div className="category">
        <h3>All Category</h3>
        <div className="cat_content">
          <div className="card_btns">
            <button
              className={isActive === 0 ? `All active` : ""}
              onClick={(e) => buttonActive(e.target.innerText, 0)}
            >
              All
            </button>
            {allCategorys}
          </div>
          <div className="cards">
            {products
              .filter((item) => {
                return search.toLowerCase() === "all"
                  ? item
                  : item.category.toLowerCase().includes(search);
              })
              .map((product) => {
                return (
                  <li className="card" key={product.id}>
                    <div className="card_image">
                      <img src={product.image} alt="Images" />
                    </div>
                    <div className="card_info">
                      <h4 className="card_title">
                        {product.title.length > 45
                          ? product.title.slice(0, 50) + "..."
                          : product.title}
                      </h4>
                      <p className="card_cat">
                        Category: <b>{product.category}</b>
                      </p>
                      <p className="card_price">
                        Price: <b>{product.price}$</b>
                      </p>
                      <p className="desc">
                        <b>Description:</b>
                        <br />
                        <p className="card_desc">
                          {product.description.length > 40
                            ? product.description.slice(0, 65)
                            : product.description}
                        </p>
                      </p>
                    </div>
                  </li>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllCategory;