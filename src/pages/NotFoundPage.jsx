import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  let navigateTo = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigateTo(-1);
    }, 1000);
  }, [navigateTo]);

  return (
    <div className="centro" style={{marginTop:"10%",flexDirection:"column"}} >
      <h1 className="indice">404: Page not found</h1>
      <small>Serás redirigido a la homepage en breve.</small>
    </div>
  );
}

export default NotFoundPage;
