import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  return (
    <>
      <div className="box">
        <div>

          <h2>Thanks for your order!</h2>
          <h4>Your payment is successful.</h4>
        </div>
        <div>

          <p>
            <Button variant="contained" onClick={() => navigate( `/payments/${userId}`)}> Click to Move to order page</Button><br />
            We appreciate your business! If you have any questions, please email us
            at
          </p>
        </div>
        <div>
        </div>

      </div>
    </>
  );
}

export default Success; 