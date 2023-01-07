import React from "react";
import "./contact.css";
import { Button } from "@material-ui/core";
import MetaData from "../MetaData";

const Contact = () => {
  return (
    <div className="contactContainer">
        <MetaData title={"Contact us"}/>
      <a className="mailBtn" href="mailto:bibliophilemuffie@gmail.com">
        <Button>Contact: bibliophilemuffie@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;