import React, { useEffect,useState } from "react";
import Product from "./components/product_detail/Product";
import {listProducts} from "./api/listaProductos"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { map } from "lodash";

function App() {

  // extraigo las variables: storeId de la tienda y el token
  const storeData = JSON.parse(localStorage.getItem("storeData"));
  const storeId = storeData.store_id;
  const accessToken = storeData.access_token;
  // =====================================================================

  // funciones y variables para listar todos los productos
  const [dataProducts,setDataProducts]=useState(null);
  const [datafilter, setdatafilter]=useState(null);
  const [inputFilter, setInputFilter]=useState(null);
  const [contador, setcontador]=useState(1);

  // ========================================================================
  
  async function listarProductos(accessToken,storeId){
    const response = await listProducts(accessToken,storeId);
    setDataProducts(response.items);
  }
  
function changevalue(e){
  console.log(e.target.value);
  setInputFilter(e.target.value);
}
// ============================================================================
const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };


// =============================================================================

function filterProducts(){
  let rowArray = [];
  console.log(inputFilter);
  let query=inputFilter.toUpperCase();
    dataProducts.forEach(item => {
      let isArray = false;
      for (let key in item) {
          let col = item[key];
          if(typeof col != 'object' && typeof col != 'boolean'&& typeof col !='number' && typeof col != 'undefined'){
              let cols = col.toUpperCase();
              if(cols.includes(query)){
                  isArray = true;
                  setcontador(contador+1);
              }
          }
      }
      if(isArray === true){
          rowArray.push(item.id);
      }
    });
  setdatafilter(rowArray);
  if(rowArray.length === 0){
    setcontador(0);
  }
  console.log(contador);
  return true;
}

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


useEffect(()=>{
  if(inputFilter===null||inputFilter===""){
    console.log("input vacio");
    listarProductos(accessToken,storeId);
  }else{
    filterProducts();
  }
},[inputFilter]);


  return (
    <div className="App">
      <div className="content-wrapper">
            <div className="pt-3">
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-md-12 d-flex">
                            <div className="input-group mb-3">
                              <input className="form-control me-2" style={{borderRadius:5}} onChange={(e)=>changevalue(e)}  id="filterProduct" list="datalistOptions" placeholder="Search Product" ></input>
                              <button type="button" style={{borderRadius:5}} onClick={()=>filterProducts()}  className="btn btn-lg btn-outline-primary"><i class="fas fa-search"></i></button>
                              <input className="form-control me-2" type="hidden" id="query" list="datalistOptions"></input>
                              <datalist id="datalistOptions" >
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
        </div>
        
        {
          !dataProducts &&(<div>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>)
        }
      {
        !inputFilter && (map(dataProducts, (item, index) => (
               <Product productId={item.id} nombre={item.name} cod={item.sku} stock={item.quantity} price={item.price} enabled={item.enabled} image={item.imageUrl} shipping={item.fixedShippingRate} />)))
      }
      {
        inputFilter && (map(dataProducts, (item, index) => {
          let idProduct = item.id;
          if(datafilter != null){
            let index_r = datafilter.indexOf(idProduct);
            if(index_r >= 0){
              return <Product productId={item.id} nombre={item.name} cod={item.sku} stock={item.quantity} price={item.price} enabled={item.enabled} image={item.imageUrl} shipping={item.fixedShippingRate} />
            }
          }
        }))
      }
      {
        contador<1  && ( 
          <div className="content-wrapper" style={{paddingBottom:10}}>
            <div className="pt-1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card border-danger text-center">
                      <div className="card-header  bg-danger text-white">
                        Information
                      </div>
                      <div className="card-body">
                        <i className="fas fa-exclamation-triangle"></i>
                        <h5 className="card-title">Haven't found the product?</h5>
                        <p className="card-text"> Try entering the product name or code.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )
      }

    </div>
  );
}

export default App;
