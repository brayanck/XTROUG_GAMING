import { useState } from "react";
import { userContext } from "../../storage/userContex";
import { useContext } from "react";
import { createBuyOrder } from "../../service/cartFirebase";
import { cartContext } from "../../storage/cartContex";
import Swal from "sweetalert2";
import InputPer from "../input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const expresiones = {
  telefono: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};
const initialForm = {
  nombre: "",
  apellido: "",
  direccion: "",
  telefono: "",
  email:""
};
function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const { usuario } = useContext(userContext);
  const { cart, getTotalPrice, clearCart } = useContext(cartContext);
  const [check, setCheck] = useState(null);

   const revicion= async (evt)=> {
    evt.preventDefault()

    if(expresiones.nombre.test(form.nombre)&&expresiones.nombre.test(form.apellido)&&expresiones.telefono.test(form.telefono)&& form.direccion.length>4 && usuario !== null && cart.length>0)
    {
      handleCheckout(evt)
    }else
    {
        setCheck(false)
    }
  }
  async function handleCheckout(evt){
    evt.preventDefault()
    const items = cart.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        count: product.count,
      }));
      form.email=usuario.email
    const order = {
        buyer: form,
        order: items,
        date: new Date(),
        total: getTotalPrice(),
      };
      let id = await createBuyOrder(order);

      Swal.fire(
        'success',
        `relizaste la compra correctamente tu numero de compra es ${id}`,
        'success'
      ).then(Response=>{
        setTimeout(() => {
          navigate("/");
          clearCart()
      }, 1000);
      })
      
      
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="contenedor">
      <form onSubmit={revicion} className="formulario">
        {usuario && <h1 className="indice">{usuario.email}</h1>}
        <InputPer type="text" name="nombre" value={form.nombre} onInputChange={handleChange}/>
        <InputPer type="text" name="apellido" value={form.apellido} onInputChange={handleChange}/>
        <InputPer type="text" name="direccion" value={form.direccion} onInputChange={handleChange}/>
        <InputPer type="text" name="telefono" value={form.telefono} onInputChange={handleChange}/>
        <input
        className="boton2"
          type="submit"
          value="finalizar"
        />
        <div className={check===null?"formulario__mensaje":"formulario__mensaje_activo"}>
              <p><FontAwesomeIcon className="icono_carro" icon={faTriangleExclamation} /> <b>Error:</b> recuerde rellena el formulario
                    correctamente.</p>
            </div>
            {(!usuario)&&<div className="formulario__mensaje_activo">
              <p><FontAwesomeIcon className="icono_carro" icon={faTriangleExclamation} /> <b>Error:</b> recuerde estar con la sesion iniciada. </p>
            </div>}
            {(!cart.length)&&<div className="formulario__mensaje_activo">
              <p><FontAwesomeIcon className="icono_carro" icon={faTriangleExclamation} /> <b>Error:</b> el carrito no puede estar vacio. </p>
            </div>}
      </form>
    </div>
  );
}
export default Checkout;
