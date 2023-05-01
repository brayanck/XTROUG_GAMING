import React, { useState} from "react";
import { getCompra } from "../../service/cartFirebase";
import CompraContainer from "../compraContainer/CompraContainer";
import InputPer from "../input/Input";

function Compras() {
  const [idCompra, setIdCompra] = useState("");
  const [compra, setCompra] = useState();

  const handleChange = (e) => {
    setIdCompra(e.target.value);
  };


  function hendleSubmit(evt) {
    evt.preventDefault();
        getCompra(idCompra).then((respuesta) => {
      setCompra(respuesta);
    });
    
  }


  if(compra)
  return(<CompraContainer compra={compra}/>)

  return (
    <div className="contenedor">
      <form onSubmit={hendleSubmit} className="formulario">
        <h1 className="indice">Buscador de ordenes</h1>
        <InputPer type="text" name="id" value={idCompra} onInputChange={handleChange}/>
        <input className="boton2" type="submit" value="enviar" />
      </form>
      

    </div>
  );
}
export default Compras;
