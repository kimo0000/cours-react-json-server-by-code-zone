import './AddNewProduct.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function AddNewProduct() {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [warningMsg, setWarningMsg] = useState(false);


    let navigate = useNavigate();

    const addItem = (e) => {
      e.preventDefault();

       if(title === "" || price === "" || description === "" || category === "") {
         setWarningMsg(true);
        } else {
          setWarningMsg(false);

          fetch("http://localhost:9000/products", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              price: price,
              description: description,
              image: "https://i.pravatar.cc",
              category: category,
            }),
          })
          .then((res) => res.json())
          .then((item) => console.log(item));


          navigate("/allProducts");
       }
    }

    return (
      <>
        <div className="add_new_product">
          <h3 className="add_product">Add product</h3>
          <form name="form_input" className="addProduct" 
            onSubmit={addItem}
          >
            <div className="title">
              <label>title</label>
              <input
                type="text"
                placeholder="Enter Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="category">
              <label>Category</label>
              <input
                type="text"
                placeholder="Enter Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="price">
              <label>Price</label>
              <input
                type="number"
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="description">
              <label>Description</label>
              <input
                type="text"
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="add" >
              Add
            </button>

            {warningMsg && (
              <p className="warning_msg">Please rempliser tout les champ</p>
            )}
          </form>
        </div>
      </>
    );
}

export default AddNewProduct;