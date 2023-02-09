import { cartContext } from "../../storage/cartContex";
import { useContext } from "react";
import { ButtonChild } from "../button/Button";
import { Link } from "react-router-dom";



const CartContainer = () => {
  const { cart, getTotalPrice, removeItem, clearCart,actulizarCantidad} = useContext(cartContext);


  if (cart.length === 0) {
    return (
      <div>
        <h2 className="centro">No hay items en el carrito</h2>
      </div>
    );
  }



  return (
    <div style={{marginTop:"8%"}}>
      <h1 className="titulo_index">carrito</h1>
      <div>
        <table className="cartList">
        <thead className="cartList_head">
          <tr className="cartList_row_r">
            <th>Miniatura</th>
            <th>Titulo</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Remover</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="cartList_row">
              <td>
                <img height={50} src={item.image} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>$ {item.price}</td>
              <td>
              <ButtonChild onClick={() => actulizarCantidad(item.id, -1)}>
                  -
                </ButtonChild>
                {item.count}
                <ButtonChild onClick={() => actulizarCantidad(item.id, 1)}>
                  +
                </ButtonChild>
                </td>
              <td>
              <ButtonChild onClick={()=>removeItem(item.id)}>x</ButtonChild>
              </td>
              <th>$ {item.count*item.price}</th>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="centro">
        <h1>Total: {getTotalPrice()}</h1>
        <Link to="/Cart/checkout">
        <ButtonChild >Finalizar compra</ButtonChild>
        </Link>
        <ButtonChild onClick={clearCart} >Limpiar carrito</ButtonChild>
      </div>
    </div>
  );
};

export default CartContainer;
