import React,{useState} from 'react'
import {changeStatusProduct, changePriceProduct, changeShippingProduct} from "../../api/updateProducts";

export default function Product(props) {
    const {productId, nombre, cod, stock, price, enabled, image, shipping} = props;
    // console.log(storeId, accessToken);
    const [colorStyle,setColorStyle]=useState(false);
    // se usa para mostrar el icono y titulo de las opciones de cada producto
    const [opciones,setopciones]=useState(false);
    // ======================================================

    // almacena el estado del chek para mostrar u ocultar los componentes de editar precio
    const [estadoCheck, setCheck]=useState(enabled);
    
    async function changeCheck(){
        const statusCheck = (!estadoCheck === true) ? true : false;
        const result = await changeStatusProduct(statusCheck,productId);
        if(result.updateCount===1){
            setCheck(statusCheck);
        }
    }
    // =============================================================

    // Muestra Precios y Shipping
    const [pPrice, setPPrice] = useState(true);
    const [txtPrice, settxtPrice] = useState(false);

    
    const [pShipping, setShipping] = useState(true);
    const [txtShipping, settxtShipping] = useState(false);

    // Muestra los botones de accion
    const [buttonE, setButtonE] = useState(true);
    const [buttonA, setButtonA] = useState(false);

    const [buttonES, setButtonES] = useState(true);
    const [buttonAS, setButtonAS] = useState(false);

    async function actions(action){
        if(action === "edit"){
            var sPrice = document.getElementById(`sPrice${productId}`).textContent;
            document.getElementById(`txtPrice${productId}`).value = sPrice;
            setButtonE(false);
            setButtonA(true);
            setPPrice(false);
            settxtPrice(true);
        }else{
            var setChanges = true;
            setColorStyle(false);
            if(action === "save"){
                var newPrice = document.getElementById(`txtPrice${productId}`).value;
                // console.log(newPrice);
                if(newPrice < 0 || isNaN(newPrice)|| newPrice===""){
                    setChanges = false;
                    setColorStyle(true);
                }else{
                    const result= await changePriceProduct(newPrice, productId);
                    if(result.updateCount===1){
                        document.getElementById(`sPrice${productId}`).textContent = newPrice;
                    }else{
                        setChanges = false;
                    }
                }
            }
            if(setChanges){
                setButtonE(true);
                setButtonA(false);
                setPPrice(true);
                settxtPrice(false);
            }
        }
    }

    async function actionsShipping(action){
        if(action === "edit"){
            var sShipping = document.getElementById(`sShipping${productId}`).textContent;
            document.getElementById(`txtShipping${productId}`).value = sShipping;
            setButtonES(false);
            setButtonAS(true);
            setShipping(false);
            settxtShipping(true);
        }else{
            var setChanges = true;
            setColorStyle(false);
            if(action === "save"){
                var newShipping = document.getElementById(`txtShipping${productId}`).value;
                if(newShipping < 0 || isNaN(newShipping)|| newShipping===""){
                    setChanges = false;
                    setColorStyle(true);
                }else{
                    const result= await changeShippingProduct(newShipping, productId);
                    if(result.updateCount===1){
                        document.getElementById(`sShipping${productId}`).textContent = newShipping;
                    }else{
                        setChanges = false;
                    }
                }
            }
            if(setChanges){
                setButtonES(true);
                setButtonAS(false);
                setShipping(true);
                settxtShipping(false);
            }
        }
    }
    
    return (
        <div className="content-wrapper">
            <div className="pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card" >
                                <div className="row g-0" style={{paddingTop:10,paddingBottom:10}}>
                                    <div className='col-md-1' style={{alignSelf:"center", display:"flex", justifyContent:"center", alignItems:"center"}} >
                                        <div className="form-check " >
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                        </div>
                                    </div>
                                    <div className="col-md-1" style={{color:'GrayText'}}>
                                        <img src={image===null || image===undefined || image==="" ? ("http://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg"):(image)  } className="img-fluid rounded-start" alt="Product Image" width={"100%"}></img>
                                    </div>
                                    <div className="col-md-10">
                                        <div className="card-body" >
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <h5 className="card-title">{nombre} <small className="text-muted">{cod}</small></h5>
                                                    <div className='row'>
                                                        <div className='col-md-8'>
                                                            <div className='input-group'style={{justifyContent:'space-evenly'}}>
                                                                <div className="form-check form-switch ">
                                                                    <input className="form-check-input success" onClick={()=>changeCheck()} type="checkbox" id={productId} checked={estadoCheck}></input>
                                                                    <label className="form-check-label" htmlFor={productId} style={{color:(estadoCheck) ? "green" : "gray"}}>{ estadoCheck?"Activado":"Desactivado" }</label>
                                                                </div>
                                                                <h6 style={{color:(stock > 0) ? "black" : "red"}}>{(stock > 0) ? `Available: ${stock}` : "Unavailable"}</h6>
                                                            </div>  
                                                        </div>
                                                    </div>
                                                    {
                                                        opciones?(<div className='row'>
                                                            <div className='col-md-12'>
                                                                <a href='google.com'><i className="far fa-clone"></i> <label>Opciones</label></a>
                                                            </div>
                                                        </div>
                                                        ):(null)
                                                    }
                                                </div>
                                                <div className='col-md-3 text-center'>
                                                    <div className='row'>
                                                        <div className='col-md-12' style={{paddingBottom:10}}>
                                                            <h3 hidden={pPrice?(false):(true)}>$<small id={`sPrice${productId}`}>{price}</small></h3>
                                                            <input type="number" style={colorStyle?({borderWidth:1, borderColor:"red"}):({borderColor:"gray"})} className="form-control" id={`txtPrice${productId}`} placeholder='New Price'  hidden={txtPrice?(false):(true)}></input>
                                                        </div>
                                                        <div className='col-md-12' style={{paddingBottom:10}}>
                                                            <h3 hidden={pShipping?(false):(true)}>$<small id={`sShipping${productId}`}>{shipping}</small></h3>
                                                            <input type="number" style={colorStyle?({borderWidth:1, borderColor:"red"}):({borderColor:"gray"})} className="form-control" id={`txtShipping${productId}`} placeholder='New Shipping'  hidden={txtShipping?(false):(true)}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-3 text-center'>
                                                    <div className="row">
                                                        <div className="col-md-12" style={{paddingBottom:10}}>
                                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                                <button type="button" className="btn btn-outline-primary" onClick={()=>actions('edit')} hidden={buttonE?(false):(true)}><i class="fas fa-edit"></i> Edit Price</button>
                                                                <button type="button" className="btn btn-outline-success" onClick={()=>actions('save')} hidden={buttonA?(false):(true)}><i class="fas fa-save"></i> Save</button>
                                                                <button type="button" className="btn btn-outline-danger" onClick={()=>actions('cancel')} hidden={buttonA?(false):(true)}><i class="fas fa-times-circle"></i> Cancel</button>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-md-12" style={{paddingBottom:10}}>
                                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                                <button type="button" className="btn btn-outline-dark" onClick={()=>actionsShipping('edit')} hidden={buttonES?(false):(true)}><i class="fas fa-shipping-fast"> </i>  Shipping</button>
                                                                <button type="button" className="btn btn-outline-success" onClick={()=>actionsShipping('save')} hidden={buttonAS?(false):(true)}><i class="fas fa-save"></i> Save</button>
                                                                <button type="button" className="btn btn-outline-danger" onClick={()=>actionsShipping('cancel')} hidden={buttonAS?(false):(true)}><i class="fas fa-times-circle"></i> Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    
}
