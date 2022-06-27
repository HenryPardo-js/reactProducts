import React, {useState} from "react";
import { map } from "lodash";
import {getProduct} from "../../api/listaProductos";


function Search(props){
    const {data,childClicked}=props;
    // console.log(data);

    
    async function searchProduct(){
        let query= document.getElementById("filterProduct").value;
        const response = await getProduct(query);
        childClicked(response);
        // console.log(response);
    }
    return(
        <div className="content-wrapper">
            <div className="pt-3">
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-md-12 d-flex">
                            <input className="form-control me-2" id="filterProduct" list="datalistOptions" placeholder="Search Product" ></input>
                            <input className="form-control me-2" type="hidden" id="query" list="datalistOptions"></input>
                            <datalist id="datalistOptions">
                                {
                                    map(data, (item) =>(
                                        <option data-id={item.id} label={item.name} value={item.id}></option>
                                    ))
                                }
                            </datalist>

                            <button className="btn btn-outline-primary" onClick={()=>searchProduct()}><i class="fas fa-search"></i> Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Search;