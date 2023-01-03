import React from "react";
import './index.css'
function Failure() {
  return (
    <>
      <div className="box">

        <h4>Oops! Your payment has been cancelled.</h4>
        <p>
          We appreciate your business! If you have any questions, please email us
          at
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
        <div>
          <button> Go to Home page</button>
        </div>
      </div>
    </>
  );
}

export default Failure; 