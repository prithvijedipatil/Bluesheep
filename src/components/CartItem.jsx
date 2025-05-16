import React, { useEffect, useState } from "react";
import { BiCross, BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { fetchCart } from "../utils/fetchLocalStorageData";
import { RxCross2 } from "react-icons/rx";
import { BiXCircle } from "react-icons/bi";
let items = [];

const CartItem = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action == "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else if (action == "remove") {
      // initial state value is one so you need to check if 1 then remove it
      if (qty == 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag - 1);
          }
        });
        cartDispatch();
      }
    } else {
      items = cartItems.filter((item) => item.id !== id);
      setFlag(flag + 1);
      cartDispatch();
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [qty, items]);

  return (
    <div className="w-full m-2 p-4 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      {/* name section */}
      <div className="flex m-4 flex-col gap-2">
        <p className=" text-base text-gray-50">{item?.title}</p>
        <p className=" block text-gray-300 font-semibold">
          ₹ {parseFloat(item?.price) * qty}
        </p>
      </div>

      {/* button section */}
      <div className="group flex items-center gap-8 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50 " />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50 " />
        </motion.div>
        <motion.div
          style={({ width: "32px !important" }, { height: "32px !important" })}
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("delete", item?.id)}
        >
          <BiXCircle
            style={
              ({ width: "32px !important" }, { height: "32px !important" })
            }
            color="white"
            fontSize={"24px"}
            className="text-gray-50 "
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
