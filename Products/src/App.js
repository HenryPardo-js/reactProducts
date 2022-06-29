import React, { useEffect,useState } from "react";
// import "./App.css";
import Search from "./components/search/Search";
import Shipping from "./components/Shipping/Shipping";
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
  const [dataSetProduct, setDataSetProduct]=useState(null);
  const [dataAux, setDataAux]=useState(null);
  const [estadoConsulta, setestadoConsulta]=useState(true);

  
  
  async function listarProductos(accessToken,storeId){
    const response = await listProducts(accessToken,storeId);
    // console.log(response.items);
    // setDataProducts(response.items);
    setDataProducts(response.items);
    setDataAux(response.items);
    setDataSetProduct(response.items);

  }
  // funcion para recibir datos del componente hijo del search
  function recibirSearch(name, estado){
    console.log(name, estado);
    if(name===null || name=== undefined || name===[]){
      console.log("viene vacio",name);
      // setDataProducts(dataSetProduct);  
    }else{
      // console.log("Array Retorno",name);
      setDataProducts(name);
      setestadoConsulta(!estadoConsulta);
    }
  }

  // ========================================================================
  


  
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
      {/* <Search data={dataAux} dataGeneral={dataProducts} childClicked={(name)=>recibirSearch(name)} /> */}
      <Search data={dataAux} dataGeneral={dataProducts} childClicked={(name,estado)=>recibirSearch(name,estado)} />
      {/* <Shipping/> */}
      {
        dataProducts ? (estadoConsulta ? (map(dataProducts, (item, index) => (
                 <Product productId={item.id} nombre={item.name} cod={item.sku} stock={item.quantity} price={item.price} enabled={item.enabled} image={item.imageUrl} shipping={item.fixedShippingRate} />
               )
               )):( map(dataProducts,(element)=>(console.log(element))) )):(<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
               </div>
             </div>)


          //  dataProducts? (dataProducts.length>1? (map(dataProducts, (item, index) => (
          //       <Product productId={item.id} nombre={item.name} cod={item.sku} stock={item.quantity} price={item.price} enabled={item.enabled} image={item.imageUrl} shipping={item.fixedShippingRate} />
          //     )
          //     )): (<Product productId={dataProducts.id} nombre={dataProducts.name} cod={dataProducts.sku} stock={dataProducts.quantity} price={dataProducts.price} enabled={dataProducts.enabled} image={dataProducts.imageUrl} shipping={dataProducts.fixedShippingRate} />)):(<div className="d-flex justify-content-center">
          //        <div className="spinner-border" role="status">
          //          <span className="visually-hidden">Loading...</span>
          //       </div>
          //     </div>) 
      
      }

    </div>
  );
}

export default App;
