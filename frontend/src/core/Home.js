import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";

function Home() {
  return (
    <div>
      <Base title="Home Page" description="Welcome to the tShirt store!">
        <div className="row text-center">
          <div className="col-4">
            <Card />
          </div>
        </div>
      </Base>
    </div>
  );
}

export default Home;
