import React, { useEffect,useState } from "react";
// import "./App.css";
import Product from "./components/product_detail/Product";
import {listProducts} from "./api/listaProductos"
import { map } from "lodash";

function App() {

  // extraigo las variables: storeId de la tienda y el token
  const storeData = JSON.parse(localStorage.getItem("storeData"));
  const storeId = storeData.store_id;
  const accessToken = storeData.access_token;
  // =====================================================================

  // funciones y variables para listar todos los productos
  const [dataProducts,setDataProducts]=useState(null);

  // ========================================================================
  
  async function listarProductos(accessToken,storeId){
    const response = await listProducts(accessToken,storeId);
    setDataProducts(response.items);
  }
  
  
  function filterProducts(){
    let query = document.getElementById("filterProduct").value.toUpperCase();
    let rowArray = [];
    setTimeout(() => {
      dataProducts.forEach(item => {
            let isArray = false;
            for (let key in item) {
                let col = item[key];
                if(typeof col != 'object' && typeof col != 'boolean'&& typeof col !='number' && typeof col != 'undefined'){
                    let cols = col.toUpperCase();
                    if(cols.includes(query)){
                        isArray = true;
                    }
                }
            }
            if(isArray === true){
                rowArray.push(item);
            }
            setDataProducts([{productId:item.id},{nombre:item.name}, {cod:item.sku}, {stock:item.quantity},  {price:item.price}, {enabled:item.enabled}, {image:item.imageUrl}, {shipping:item.fixedShippingRate}]);
        });
        // console.log(rowArray);
    }, 500);
    // setDataProducts(rowArray);
    // return true;
}

  
  // Get the store ID and access token
  useEffect(() => {
    const script = document.createElement("script");
    
    script.src =
      "https://djqizrxa6f10j.cloudfront.net/ecwid-sdk/js/1.2.9/ecwid-app.js";

    script.async = false;
    document.body.appendChild(script);

    listarProductos(accessToken,storeId);

    return () => {
      // clean up the script when the component in unmounted
      document.body.removeChild(script);
    };
    
  }, []);

  return (
    <div className="App">
      <div className="content-wrapper">
            <div className="pt-3">
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-md-12 d-flex">
                            <input className="form-control me-2" onKeyUp={()=>filterProducts()} onKeyDown={()=>filterProducts()}  id="filterProduct" list="datalistOptions" placeholder="Search Product" ></input>
                            <input className="form-control me-2" type="hidden" id="query" list="datalistOptions"></input>
                            <datalist id="datalistOptions">
                                {
                                    map(dataProducts, (item) =>(
                                        <option key={item.id} data-id={item.id} label={item.name} value={item.id}></option>
                                    ))
                                }
                            </datalist>

                        </div>
                    </div>
                </div>
            </div>
        </div>
      {
        dataProducts? (map(dataProducts, (item, index) => (
            <Product productId={item.id} nombre={item.name} cod={item.sku} stock={item.quantity} price={item.price} enabled={item.enabled} image={item.imageUrl} shipping={item.fixedShippingRate} />))):(<div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
        </div>)
      
      }

    </div>
  );
}

export default App;
