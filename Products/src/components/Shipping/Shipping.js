import React from 'react'

export default function Shipping() {
  return (
    <div className="content-wrapper">
        <div className="pt-3">
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                        <h5 className="card-title ">Update Shipping
                        </h5>
                        </div>
                        <div className="card-body">
                        <div className="row">
                            <div className="col-md-12 d-flex">
                                <input className="form-control me-2" type="search" placeholder="Price Shipping" aria-label="Search"></input>
                                <button type="button" className="btn btn-outline-success"><i class="fas fa-redo"></i> Update</button>
                            </div>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
