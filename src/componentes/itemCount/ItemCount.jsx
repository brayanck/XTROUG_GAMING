import React from "react";
import { ButtonChild } from "../button/Button";
import useCount from "../../hooks/useCount";



function ItemCount({handleAddToCart,cant}){
    const { count, handleAdd, handleSubstract } = useCount(cant);
    return(

            <div className="datoContador">
            <h3>Agrega la cantidad deseada al carrito</h3>
            <div className="contador">
                <ButtonChild onClick={handleSubstract}>-</ButtonChild>
                <h2>{count}</h2>
                <ButtonChild onClick={handleAdd}>+</ButtonChild>
            </div>
            <div className="contenedorBoton">
                <ButtonChild onClick={()=>handleAddToCart(count)}>Agrregar al carrito</ButtonChild>
                
            </div>
            
            </div>
            
    )
}
export default ItemCount