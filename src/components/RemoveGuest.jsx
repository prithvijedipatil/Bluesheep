import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import {
  Firestore,
  collection,
  deleteDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { doc, updateDoc, deleteField } from "firebase/firestore";

const RemoveGuest = () => {
  let dummyData = [];
  let names = [];
  const theme = useTheme();
  const [personName, setPersonName] = useState("Guest Name");
  const [Flag, setFlag] = useState(false);
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState([]);
  let guestID = [];
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();
  console.log("before reload");

  console.log("After reload");
  window.onload = (event) => {
    // onSnapshot(
    //   query(collection(db, "Guests")),
    //   (querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       dummyData.push({ id: doc.id, ...doc.data() });
    //       // console.log("db hitting");
    //     });
    //     console.log(dummyData, "data received");
    //     setGuests(dummyData);
    //   },
    //   (error) => {
    //     console.error("Error fetching podcasts:", error);
    //   }
    // );
  };

  guests.forEach((item) => {
    names.push(item.name);
  });

  useEffect(() => {
    onSnapshot(
      query(collection(db, "Guests")),
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dummyData.push({ id: doc.id, ...doc.data() });
          // console.log("db hitting");
        });
        console.log(dummyData, "data received");
        setGuests(dummyData);
        setSelectedGuest(dummyData[0].name);
        console.log(selectedGuest, "default GUEST");
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );
  }, []);

  console.log(names, "names of guests");
  //setSelectedGuest(names[0]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setSelectedGuest(event.target.value);

    console.log(selectedGuest, "selectedGuest");
    // guestID = guests.filter((item) => {
    //   if (item.name == selectedGuest) return item.id;
    // });

    // console.log(guestID, "guestID");
  };

  console.log(names, "names");

  const getGuests = () => {
    console.log("page relaoding");
    setFlag(true);
    if (Flag) window.location.reload();
    console.log("page relaoded");
  };

  const handleSubmit = async () => {
    if (guests.length > 1) {
      let result = prompt("This action cannot be reversed!!!!!, Are you sure?");
      if (result == "yes" || result == "YES") {
        console.log(guests, "submit");
        console.log(selectedGuest, "selectedGuest");

        guestID = guests.filter((item) => {
          if (item.name == selectedGuest) return item.id;
        });

        console.log(guestID[0].id, "guestID");

        let id = guestID[0].id;
        let ref = doc(db, "Guests", id.toString());
        await deleteDoc(ref);
        // const userRef = doc(db, "Guests", id.toString());

        alert(`${guestID[0].name} removed`);
        setRefresh(!refresh);
        // window.location.reload();
        navigate("/");
      } else {
        guestID = guests.filter((item) => {
          return item.id;
          let id = guestID[0].id;
          let ref = doc(db, "Guests", id.toString());
          deleteDoc(ref);

          alert(`${guestID[0].name} removed`);
          setRefresh(!refresh);

          navigate("/");
        });
        let id = guestID[0].id;
        let ref = doc(db, "Guests", id.toString());
        await deleteDoc(ref);
        // const userRef = doc(db, "Guests", id.toString());

        alert(`${guestID[0].name} removed`);
        setRefresh(!refresh);
        // window.location.reload();
        navigate("/");
      }
    }
  };

  return (
    <>
      <h1 style={{ marginLeft: "1%", marginTop: "20%", marginBottom: "0%" }}>
        Guests Checkout
      </h1>

      <button
        style={{
          marginTop: "20px",
          width: "50%",
          marginLeft: "0px",
          marginRight: "auto",
        }}
        onClick={getGuests}
        type="button"
        className="bg-gradient-to-br text-white from-cyan-500 to-blue-500  md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
      >
        {" "}
        Retrive Guests
      </button>

      {/* { <FormControl className="formControl"> */}
      {Flag && (
        <>
          {/* <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={personName}
            onChange={(e) => handleChange(e)}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
            style={{ width: "300px", marginTop: "50px" }}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select> */}

          <select
            className="w-full p-4 px-8 rounded-lg bg-cartItem text-white flex items-center gap-2"
            value={personName}
            onChange={(e) => handleChange(e)}
            InputLabel="Please select the guest name"
            style={
              ({ width: "200px" },
              { alignContent: "center" },
              { padding: "20px !important" },
              { marginTop: "90px" })
            }
          >
            {names.map((item) => (
              <option
                style={{ color: "white !important" }}
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
          {/* </FormControl> */}

          <button
            style={{
              marginTop: "60px",
              width: "50%",
              marginLeft: "60px",
              marginRight: "auto",
            }}
            onClick={handleSubmit}
            type="button"
            className="bg-gradient-to-br text-white from-cyan-500 to-blue-500  md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          >
            {" "}
            Remove Guest
          </button>
        </>
      )}
    </>
  );
};

export default RemoveGuest;
