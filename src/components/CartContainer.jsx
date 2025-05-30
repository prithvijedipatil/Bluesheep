import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";

import { motion } from "framer-motion";

import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import { useStateValue } from "../context/StateProvider";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import ReactWhatsapp from "react-whatsapp";

const ITEM_HEIGHT = 48;
let orderString = "";

let orderlistings = "";
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CartContainer = () => {
  const navigate = useNavigate();
  let x = "";
  let finalOrders = [];
  const names = [];
  let orderlist = {};
  const theme = useTheme();
  const [personName, setPersonName] = useState("");
  const [custom, setCustom] = useState("");
  const [Guests, setGuests] = useState([]);
  const [whatsappMessage, setWhatsappMessage] = useState("");

  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  let label = [];
  const [inputValue, setInputValue] = React.useState("");
  let customMessage = "";

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  // this is person selections
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function getStyles(name, personName, theme) {
    // return {
    //   fontWeight:
    //     personName.indexOf(name) === -1
    //       ? theme.typography.fontWeightRegular
    //       : theme.typography.fontWeightMedium,
    // };
  }

  Guests.forEach((doc) => {
    names.push(doc);
    label.push(doc.name);
  });
  //

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(async () => {
    // backend to select names

    const dummyData = [];
    await onSnapshot(
      query(collection(db, "Guests")),
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dummyData.push({ id: doc.id, ...doc.data() });
          console.log(dummyData, "guestssnap");
        });
        console.log(dummyData, "final");
        setGuests(dummyData);
        setPersonName(dummyData[0].name);
      },
      (error) => {
        console.error("Error fetching guests:ss", error);
      }
    );

    // calculating total price
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    let finalOrdersWhatsapp = [];

    setWhatsappMessage({
      order: orderlistings,
    });

    console.log(tot);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  //login

  //submit
  function send_handle(message, custom) {
    const phoneNumber = "+919873846162";
    const finalMessage = message.concat("   (custom request)", custom);
    console.log("im going", message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      finalMessage
    )}`;

    window.open(whatsappURL, "_blank");
  }

  const handleSubmit = async () => {
    if (
      user.email == "writetoprithvipatil@gmail.com" ||
      user.email == "bluesheeptirthan@gmail.com" ||
      user.email == "deshnajain0416@gmail.com"
    ) {
      if (personName) {
        if (cartItems.length > 0) {
          console.log(cartItems, "befre sending");
          cartItems.forEach((item) =>
            finalOrders.push({
              name: item.title,
              price: item.price,
              quantity: item.qty,
            })
          );

          orderlist = {
            date: Math.floor(Date.now() / 1000),
            orderFor: personName,
            order: finalOrders,
            custom: inputValue,
          };
          console.log("sending data", finalOrders);
          console.log("orderlist", orderlist);

          // testing whatsapp

          const namez = Array.isArray(orderlist.orderFor)
            ? orderlist.orderFor
            : [String(orderlist.orderFor || "")];
          const order = Array.isArray(orderlist.order) ? orderlist.order : [];

          orderString = [...namez, ...order.map((item) => item.name)].join(
            "\n"
          );
          customMessage = orderlist.custom;

          //end whatsapp testing
          sessionStorage.setItem("whatsappmessage", JSON.stringify(orderlist));
          await addDoc(collection(db, "LiveOrders"), orderlist);
          orderlistings = JSON.stringify(orderlist);
          //setWhatsappMessage(orderlistings);
          console.log("whatsapp message", orderlistings);

          console.log(
            "localmessage",
            sessionStorage.getItem("whatsappmessage")
          );
        }
        console.log("Whatsapp message", whatsappMessage);
        console.log(orderlist, "orderlist");
        console.log("order placed");

        alert(" Yayy!!! Order Successfully placed");
        send_handle(orderString, customMessage);

        // alert("Order Successfully placed");

        dispatch({
          type: actionType.SET_CART_SHOW,
          cartShow: !cartShow,
        });
        clearCart();
        // send_handle();
      } else {
        alert("please select guest");
      }
    } else {
      alert("please log in");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full mb-10 h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">₹ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              {/* <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p> */}

              <select
                className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
                value={personName}
                onChange={handleChange}
                placeholder="Please select the guest name"
                style={
                  ({ width: "200px" },
                  { alignContent: "center" },
                  { color: "white" })
                }
              >
                {names.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              className="w-full p-1 px-2 mt-4  rounded-lg bg-cartItem text-white flex items-center gap-2"
              type="text"
              name="Customization"
              placeholder="Customization"
              onChange={onChangeHandler}
              value={inputValue}
            />
            <div className="w-full my-5"></div>
            <div className="w-full flex mt-2 items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">₹{tot}</p>
            </div>

            {user ? (
              <Button
                className="buttonn  "
                style={{
                  backgroundColor: "#1AA7EC",
                  Color: "White",
                  border: "none",
                  marginLeft: "auto",
                  marginBottom: "100px",
                  marginRight: "auto",

                  width: "100%",
                  background: "none",
                }}
                number="+919873846162"
                onClick={handleSubmit}
                message={JSON.stringify(orderlistings)}
              >
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  // onClick={handleSubmit}
                  className="w-full p-2 rounded-full bg-gradient-to-tr bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-50 text-lg my-2 hover:shadow-lg"
                >
                  Place Order
                </motion.button>
              </Button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
