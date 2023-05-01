import React, { useEffect } from "react";
import Carrito from "../carrito/Carrito";
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";
import { ButtonChild } from "../button/Button";
import { userContext } from "../../storage/userContex";
import { useContext } from "react";
import { favoriteContext } from "../../storage/favoriteContex";
import { useNavigate } from "react-router-dom";
import "./navBar.css"

function NavBar() {
  const navigate = useNavigate();
  const { usuario,autenti, cerrarSesion} = useContext(userContext);
  const {clearFavoritos} = useContext(favoriteContext)

   
  useEffect(()=>{
    autenti()
  })


  
  return (
    <header className="nav">
      <div className="nav__center container">
        <div className='nav_logo'>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      <Carrito/>
      
      <ul className="nav__list">
        <li className="item">
          <Link to="/category/PC">PC</Link>
        </li>
        <li className="item">
        <Link to="/category/notebooks">Notebook</Link>
        </li>
        <li className="item">
        <Link to="/category/Teclado">Teclado</Link>
        </li>
        <li className="item">
        <Link to="/category/Mause">Mause</Link>
        </li>
        {
          (usuario)&&
            <li>
          <Link to="/favoritos">Mis Favoritos</Link>
        </li>
        }
        {
          (usuario)&&
            <li>
          <Link to="/mis_compras">Mis compras</Link>
        </li>
        }
        

        
      </ul>
      <form>
        <label htmlFor="" style={{color:"white"}}>Usuario: {(usuario)&&usuario.email} </label>
        {
          (usuario)?
          <ButtonChild onClick={()=>{cerrarSesion() ; clearFavoritos();navigate("/")}}>log out</ButtonChild>
        :
        <Link to="/login">
        <ButtonChild>login</ButtonChild>
        </Link>
        }
        
        
      </form>
      
      
      </div>
        
    </header>
  );
}

export default NavBar;
