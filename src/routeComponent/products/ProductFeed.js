import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from "../../apis/index";
import photoCard from "../../../src/photo-card.jpg";
import ProductEdit from "../products/ProductEdit"
import App from "../../components/App"
// import DropButtom from '../../components/dropButtom/DropButton';


function ProductFeed(props){
  
  const products = [ ...props.productsState];
  



 
  console.log(props)
  

  
  
  
  
  
  useEffect(() => {
        (async function fetchUser() {
          try {
    
            const productResponse = await api.get("/product");
    
            console.log("PRODUCT" ,productResponse);
    
    
            props.setProducts([ ...productResponse.data]);
          } catch (err) {
            console.error(err);
          }
        })();
      }, []);
    

           

 
    //    const [category, setCategory] = useState();
    //    const [subCategory, setSubCategory] = useState()
        

                      


    return (
        <div className="div-mother-feed">

          {/* <DropButtom></DropButtom> */}
            <div className="d-flex justify-content-around">
                <p>Artes Literárias</p>
                <p>Audiovisual</p>
                <p>Artes visuais</p>
                <p></p>

               
            </div>
            <div className="profile-products-cards">
            {products.map((product) => <div className="products-profile">
            <div className="card card-profile">
            <img
              className="card-img-top" src={product.mediaUrl} alt="Card image cap"/>
            <div className="card-body">
    <h5 className="card-title card-title-profile" >{product.title}</h5>
              <p className="card-text card-text-profile">
                {product.description}
              </p>
              {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
            </div>
          </div>)}
            </div>
        </div>
    )
}

export default ProductFeed;