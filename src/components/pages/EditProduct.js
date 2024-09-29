import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
// import axios from 'axios';


function EditProduct() {
  const { editID } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [WarningMessage, setWarningMessage] = useState(false);

//   console.log(WarningMessage);

  
  useEffect(() => {
      fetch(`http://localhost:9000/products/${editID}`)
      .then((res) => res.json())
      .then((data) => {
          setTitle(data.title);
          setCategory(data.category);
          setPrice(data.price);
          setDescription(data.description);
        })
        
    }, []);
    
    const editProduct = (e) => {
        e.preventDefault();

        if(title === "" || price === "" || description === "" || category === "") {
           setWarningMessage(true);
        } else {
            setWarningMessage(false);

            fetch(`http://localhost:9000/products/${editID}`, {
              method: "PUT",
              body: JSON.stringify({
                title,
                price,
                description,
                image: "https://i.pravatar.cc",
                category
              }),
            })
              .then((res) => res.json())
              .then((json) => console.log(json));
    
              fetch(`http://localhost:9000/products/${editID}`, {
                method: "PATCH",
                body: JSON.stringify({
                  title,
                  price,
                  description,
                  image: "https://i.pravatar.cc",
                  category
                }),
              })
                .then((res) => res.json())
                .then((json) => console.log(json));
    
            
            navigate("/allCategory");
        }
  }

  return (
    <>
      <div className="add_new_product">
        <h3 className="add_product">Edit Product</h3>
        <form name="form_input" className="addProduct" onSubmit={editProduct}>
          <div className="title">
            <label>title</label>
            <input
              type="text"
              placeholder="Enter Title"
              value={title.length > 30 ? title.slice(0, 30) + "..." : title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="category">
            <label>Category</label>
            <input
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="price">
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="description">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter Description"
              value={
                description.length > 30
                  ? description.slice(0, 30) + "..."
                  : description
              }
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="add">
            Edit
          </button>

          {WarningMessage && (
            <p className={WarningMessage ? "warning_msg show" : "warning_msg"}>
              Please ne laissez pas un champ vide
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default EditProduct;