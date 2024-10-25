import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  return (
    <div
      style={{ border: "2px solid blue !important" }}
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            style={{ border: "2px solid blue !important" }}
            onClick={() => setItems([...cartItems, item])}
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-600 md:min-w-[200px] min-h-[100px] bg-cardOverlay rounded-lg py-2 px-6  my-12 backdrop-blur-lg border-4  flex flex-row relative"
          >
            <div
              className="w-full flex items-center  justify-center mx-5 my-10 "
              style={{ border: "2px solid blue !important" }}
            >
              {/* <motion.div
                className="w-20 h-20 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div> */}
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket
                  style={{ width: "30px", height: "30px" }}
                  className="text-sky-500"
                />
              </motion.div>
            </div>

            <div className="w-full  mx-6 flex flex-col items-start gap-3 justify-start mt-8">
              <p className="text-black font-bold text-3xl md:text-lg tracking-wide ">
                {item?.title}
              </p>
              {/* <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p> */}
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-xl text-sky-500">₹</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
