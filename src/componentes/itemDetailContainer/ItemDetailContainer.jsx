import { getSingleItem } from "../../service/cartFirebase";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemCount from "../itemCount/ItemCount";
import { cartContext } from "../../storage/cartContex";
import { useContext } from "react";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import { ButtonChild } from "../button/Button";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  let { itemid } = useParams();
  const { cart, addItem } = useContext(cartContext);

  const itemInCart = cart.find((item) => item.id === product.id);
  let stockAct;
  if (itemInCart) {
    stockAct = product.stock - itemInCart.count;
  } else {
    stockAct = product.stock;
  }

  function handleAddToCart(count) {
    setIsInCart(true);
    product.count = count;
    addItem(product);
  }

  useEffect(() => {
    getSingleItem(itemid).then((respuesta) => {
      
      setProduct(respuesta);
      setIsLoading(false);
    });
  }, [itemid]);

  if (isLoading) {
    return <Loader />;
  }

  
  return (
    <div className="productos" style={{marginTop:"8%"}}>
      <div className="detalles producto">
        <div className="datos">

            <h1>{product.title}</h1>
          <img alt="sa" src={product.image} />
          
        </div>
        <div className="descripcion">
            <p>{product.detail}</p>

            {product.discount ? (
            <div>
              <div>
                <del className="price" style={{color:"#999"}}>$ {product.price+(product.price*product.discount/100)}</del>
              </div>
              <div style={{color:"green"}} className="price">descuento {product.discount}%: $ {product.price}</div>
            </div>
          ):<div className="price">$ {product.price}</div>}

            {!isInCart ? (
              <ItemCount cant={stockAct} handleAddToCart={handleAddToCart} />
            ) : (
              <Link to="/cart">
                <ButtonChild>Ir al carrito</ButtonChild>
              </Link>
            )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
