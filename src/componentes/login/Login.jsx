import React, { useState } from "react";
import { ButtonChild } from "../button/Button";
import 'firebase/auth'
import { userContext } from "../../storage/userContex";
import { useContext } from "react";
import Swal from "sweetalert2";
import InputPer from "../input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";



const expresiones = {
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/, // 4 a 12 digitos.
	correo: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ,
};
const initialForm = {
    email: "",
    contraseña: "",
  };
function Logeo() {
  const navigate = useNavigate();
  const [isRegistando, setIsRegistrando] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [check, steCheck] = useState(null);
  const { crearCuenta,iniciarCuenta} = useContext(userContext);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  async function revicion(evt){
    evt.preventDefault()
    if(expresiones.password.test(form.contraseña)&&expresiones.correo.test(form.email))
    {
      handlerSubmit(evt)
    }
    else{
      steCheck(true)
    }
  }
  const handlerSubmit= async(evt) => {
    evt.preventDefault()
 
    if(isRegistando)
    {
      crearCuenta(form)
      Swal.fire({
        icon: 'success',
        title: 'HAS CREADO LA CUENTA CORRECTAMENTE',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        
        })
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }else
    {
      iniciarCuenta(form)
      Swal.fire({ 
        icon: 'success',
        title: 'HAS INICIADO SESION',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      })
      setTimeout(() => {
        navigate("/");
      }, 1500);

    }
    
  }


  return (
    <div className="contenedor">
      <h1 className="titulo_index">{isRegistando ? "Registrate" : "Iniciar sesion"}</h1>
      <form onSubmit={revicion} className="formulario">
        <InputPer type="text" name="email" value={form.email} onInputChange={handleChange}/>
        <InputPer type="password" name="contraseña" value={form.contraseña} onInputChange={handleChange}/>
        {isRegistando&&<p className="formulario__input-error">La contraseña tiene que tener una mayuscula, un numero, un simbolo y
                    entre 8 y 15 caracteres.</p>}
        <input
          type="submit"
          className="boton2"
          value={isRegistando ? "Registate" : "Iniciar sesion"}
        />
        <div className={check===null?"formulario__mensaje":"formulario__mensaje_activo"
}>
              <p><FontAwesomeIcon className="icono_carro" icon={faTriangleExclamation} /> <b>Error:</b> Por favor rellena el formulario
                    correctamente. </p>
            </div>
      </form>
      <ButtonChild onClick={() => {setIsRegistrando(!isRegistando);setForm(initialForm);steCheck(null)}}>
        {isRegistando ? "¿ya tienes cuenta? Inicia Secion" : "¿No tienes cuenta?Crear cuenta"}
      </ButtonChild>
    </div>
  );
}
export default Logeo;
