import "./App.css";
import NavBar from "./componentes/navBar/NavBar";
import ItemDetailContainer from "./componentes/itemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartContextProvider } from "./storage/cartContex";
import CartContainer from "./componentes/cartContainer/CartContainer";
import Logeo from "./componentes/login/Login";
import { UserContexProvider } from "./storage/userContex";
import Checkout from "./componentes/checkout/Checkout";
import Compras from "./componentes/compras/Compras";
import Favoritos from "./componentes/favoritos/Favoritos";
import { FavoriteContextProvider } from "./storage/favoriteContex";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage"
//import {exportDatawithBatch} from "./service/cartFirebase"



function App() {
  function handleLogin(username) {
    alert(`${username} iniciaste cesion`);
  }

  return (
    <>
      <UserContexProvider>
        <CartContextProvider>
          <FavoriteContextProvider>
            <BrowserRouter>
              <NavBar onLogin={handleLogin} />
              <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route
                  path="/item/:itemid"
                  element={<ItemDetailContainer />}
                ></Route>
                <Route
                  path="/category/:idCategory"
                  element={<Home/>}
                ></Route>
                <Route path="/Cart" element={<CartContainer />}></Route>
                <Route path="/login" element={<Logeo />}></Route>
                <Route path="/Cart/checkout" element={<Checkout />}></Route>
                <Route path="/mis_compras" element={<Compras />}></Route>
                <Route path="/favoritos" element={<Favoritos />}></Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
            {/*<button onClick={()=>exportDatawithBatch()}>rwrwrw</button>*/}
          </FavoriteContextProvider>
        </CartContextProvider>
      </UserContexProvider>
    </>
  );
}

export default App;
