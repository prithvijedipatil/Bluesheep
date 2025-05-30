import React, { useEffect, useRef, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import { MenuItem } from "react-pro-sidebar";
import { Box, FormControl, InputLabel, Select } from "@mui/material";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");

  const [{ foodItems }, dispatch] = useStateValue();
  const myRefItem = useRef(null);

  function executeItems(message) {
    myRefItem.current.scrollIntoView();
    setFilter(message);
  }

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-cyan-500 to-blue-500 transition-all ease-in-out duration-100 mr-auto">
          Categories
        </p>

        <div className="w-full flex flex-wrap items-center justify-center lg:justify-center gap-3 mt-16 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-sky-500" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-sky-500 `}
                onClick={() => {
                  {
                    executeItems(category.urlParamName);
                  }
                }}
              >
                {/* <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName ? "bg-white" : "bg-sky-500"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div> */}
                <p
                  className={`text-sm text-sky-600  ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div ref={myRefItem}></div>
        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category == filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
