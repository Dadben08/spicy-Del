import React from 'react'
import { useState } from 'react'
import './Add.css'
import {assets} from '../../assets/assets.js' 
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async  (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category); 
    formData.append("price", Number(data.price));
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success){
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      })
      setImage(false)
      toast.success(response.data.message) 
    }else{
      toast.error(response.data.message)
      console.log(response.data.message) 
    }
  };

  
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p> 
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
           <div className="add-product-name flex-col">
              <p>Product Name</p>
              <input onChange={onChangeHandler} value={data.name}  type="text" name= "name" placeholder='Type here'/>
           </div>
            <div className="add-product-description flex-col">
              <p>Product Description</p>
              <textarea onChange={onChangeHandler} vlaue={data.description} name="description" id="" rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className="add-category-price">
              <div className="add-category flex-col">
                <p>Product Category</p>
                <select name="category" >
                  <option value="salad">Salad</option>
                  <option value="rolls">Rolls</option>
                  <option value="deserts">Deserts</option>
                  <option value="sandwich">Sandwich</option>
                  <option value="cake">Cake</option>
                  <option value="pure-veg">Pure Veg</option>
                  <option value="pasta">Pasta</option>
                  <option value="noodles">Noodles</option>
                </select>
              </div>
              <div className="add-price flex-col">
                <p>Product Price</p>
                <input onChange={onChangeHandler} vlaue={data.price} type="number" name="price" placeholder='$20' />
              </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add