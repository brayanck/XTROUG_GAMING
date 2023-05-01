import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonChild } from "../button/Button";

function CompraContainer(props){
  const [itemsTotales, setItemsTotales]= useState()
  useEffect(()=>{
    let total=0
    props.compra.order.forEach((item) => total+=item.count)
    setItemsTotales(total)
  },[props])
return(
    <div className="productos">
        <h1 className="titulo_index">Compra de {props.compra.buyer.nombre} {props.compra.buyer.apellido}</h1>
        <table className="cartList">
        <thead className="cartList_head">
          <tr className="cartList_row_r">
            <th>Cantidad</th>
            <th>Producto</th>
            <th>Precio</th>
            
          </tr>
        </thead>
        <tbody>
          {props.compra.order.map((item) => (
            <tr key={item.id} className="cartList_row">
              <td>{item.count}</td>
              <td>{item.title}</td>
              <td>$ {item.price}</td>
            </tr>
            
          ))}
          <tr className="cartList_row">
        <td>{itemsTotales}</td>
        <td></td>
        <td>Total: ${props.compra.total}</td>
       </tr>
        </tbody>
        
      </table>
      <div className="centro">
        <Link to="/">
            <ButtonChild>Ir a inicio</ButtonChild>
        </Link>
      </div>
      
    </div>
)
}
export default CompraContainer;