import React, {useState} from "react";
import { map } from "lodash";
import {getProduct} from "../../api/listaProductos";


function Search(props){
    const {data,dataGeneral,childClicked}=props;
    // console.log("array para recorrer",dataGeneral);
    // let query = document.getElementById("filterProduct").value;
    function filterProducts(){
        let query = document.getElementById("filterProduct").value;
        let rowArray = [];
        setTimeout(() => {
            dataGeneral.forEach(row => {
                let isArray = false;
                for (let key in row) {
                    let col = row[key];
                    if(typeof col != 'object' && typeof col != 'boolean'&& typeof col !='number' && typeof col != 'undefined'){
                        let cols = col.toUpperCase();
                        if(cols.includes(query)){
                            isArray = true;
                        }
                    }
                }
                if(isArray === true){
                    rowArray.push(row.id);
                }
            });
            console.log(rowArray);
        }, 500);
        return rowArray;
    }

    
    async function searchProduct(){
        let query = document.getElementById("filterProduct").value;
        // const response = await getProduct(query);
        childClicked(query);
        // console.log(response);
    }
    return(
        <div className="content-wrapper">
            <div className="pt-3">
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-md-12 d-flex">
                            <input className="form-control me-2" onKeyUp={()=>searchProduct()} onKeyDown={()=>searchProduct()}  id="filterProduct" list="datalistOptions" placeholder="Search Product" ></input>
                            <input className="form-control me-2" type="hidden" id="query" list="datalistOptions"></input>
                            <datalist id="datalistOptions">
                                {
                                    map(data, (item) =>(
                                        <option key={item.id} data-id={item.id} label={item.name} value={item.id}></option>
                                    ))
                                }
                            </datalist>

                            <button className="btn btn-outline-primary" onClick={()=>searchProduct()}><i className="fas fa-search"></i> Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Search;