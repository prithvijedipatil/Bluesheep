import React, { useState } from "react";

import { db } from "../firebase.config";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { storage, auth } from "../firebase.config";
import { addDoc, collection } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

const AddGuest = () => {
  const [guestName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const sendDataName = {
      name: guestName,
    };
    await addDoc(collection(db, "Guests"), sendDataName);
    alert(`Successfully added ${guestName}`);
    // window.location.reload();
    navigate("/");
  };
  return (
    <>
      <h1 style={{ marginLeft: "10%", marginTop: "20%", marginBottom: "10%" }}>
        Guests Check in
      </h1>
      <div
        className="Checkin"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* <input
          type="text"
          id="name"
          name="name"
          Place={guestName}
          onChange={(e) => setName(e.target.value)}
        /> */}
        <TextField
          id="outlined-basic"
          label="Guest name"
          variant="outlined"
          style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <label for="html">Guest Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}

        <button
          style={{
            marginTop: "60px",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={handleSubmit}
          type="button"
          className="bg-gradient-to-br text-white from-cyan-500 to-blue-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          {" "}
          Add Guest
        </button>
      </div>
    </>
  );
};

export default AddGuest;
