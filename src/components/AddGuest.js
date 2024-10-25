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
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const sendDataName = {
      name: guestName,
      number: number,
    };
    await addDoc(collection(db, "Guests"), sendDataName);
    alert(`Successfully added ${guestName}`);
    // window.location.reload();
    navigate("/");
  };
  return (
    <>
      <h1
        style={{
          marginLeft: "10%",
          marginTop: "20%",
          marginBottom: "10%",
          fontSize: "32px",
        }}
      >
        Guests Check in
      </h1>
      <div
        className="Checkin"
        style={{ display: "flex", flexDirection: "column", gap: "36px" }}
      >
        {/* <input
          type="text"
          id="name"
          name="name"
          Place={guestName}
          onChange={(e) => setName(e.target.value)}
        /> */}
        <label htmlFor="GN">Guest Name</label>
        <input
          id="GN"
          label="Guestname"
          variant="outlined"
          placeholder="Guest Name"
          className="w-full p-4 px-8 rounded-lg bg-cartItem text-white flex items-center gap-2"
          onChange={(e) => setName(e.target.value)}
          style={
            ({ width: "200px" },
            { alignContent: "center" },
            { padding: "20px !important" },
            { marginTop: "00px" })
          }
        />
        <label htmlFor="GPh" style={{ marginTop: "50px" }}>
          Guest Number
        </label>
        <input
          id="Gph"
          label="Guest Number"
          placeholder="+91-XXXXXXXXXX"
          variant="outlined"
          style={
            ({ width: "200px" },
            { alignContent: "center" },
            { padding: "20px !important" },
            { marginTop: "00px" })
          }
          className="w-full p-4 px-8 rounded-lg bg-cartItem text-white flex items-center gap-2"
          onChange={(e) => setNumber(e.target.value)}
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
