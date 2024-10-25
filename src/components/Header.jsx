import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/Sheep.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";

import FloatGroup from "react-float-button";
import { Button } from "@mui/material";

import { IoMenu } from "react-icons/io5";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6  bg-primary">
      {/* desktop & tablet */}

      <div className="hidden md:flex w-full h-full items-center justify-between">
        {/* <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-20 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Bluesheep</p>
        </Link> */}

        <div className="flex items-center gap-2">
          <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}

          <Menu
            menuButton={
              <MenuButton>
                <IoMenu />
              </MenuButton>
            }
            transition
          >
            {/* <MenuItem>
              {" "}
              <motion.ul
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="flex items-center gap-20 "
              >
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  <Link to="/checkin">Check-in</Link>
                </li>
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  <Link to="/checkout">Check-out</Link>
                </li>
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer mx-6">
                  <Link to="/bill">Bill</Link>
                </li>
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer mx-6">
                  <Link to="/bill">Live</Link>
                </li>
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer mx-6">
                  <Link to="/bill">Edit</Link>
                </li>
              </motion.ul>
            </MenuItem> */}
            <MenuItem>
              <Link to="/">Menu</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/checkin">Check-in</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/checkout">Check-out</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/bill">Bill</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/liveorders">Live</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/edit">Edit</Link>
            </MenuItem>
          </Menu>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          ></div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px]mx-4 h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "writetoprithvipatil@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}

      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-16 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Bluesheep</p>
        </Link>

        <Menu
          menuButton={
            <MenuButton>
              <IoMenu />
            </MenuButton>
          }
          transition
        >
          {/* <MenuItem>
              {" "}
              <motion.ul
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="flex items-center gap-20 "
              >
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  <Link to="/checkin">Check-in</Link>
                </li>
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  <Link to="/checkout">Check-out</Link>
                </li>
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer mx-6">
                  <Link to="/bill">Bill</Link>
                </li>
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer mx-6">
                  <Link to="/bill">Live</Link>
                </li>
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer mx-6">
                  <Link to="/bill">Edit</Link>
                </li>
              </motion.ul>
            </MenuItem> */}
          <MenuItem>
            <Link to="/">Menu</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/checkin">Check-in</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/checkout">Check-out</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/bill">Bill</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/liveorders">Live</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/edit">Edit</Link>
          </MenuItem>
          <MenuItem onClick={login}>Login</MenuItem>
          <MenuItem>
            <p
              className=" p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
              onClick={logout}
            >
              Logout <MdLogout />
            </p>
          </MenuItem>

          <MenuItem>
            <>
              {
                <motion.div className=" p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base">
                  {user && user.email === "writetoprithvipatil@gmail.com" && (
                    <Link to={"/createItem"}>
                      <p className="  flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        New Item <MdAdd />
                      </p>
                    </Link>
                  )}
                  {/* <div className="flex items-center gap-8">
                    <motion.ul
                      initial={{ opacity: 0, x: 200 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 200 }}
                      className="flex flex-col items-start justify-center gap-1 "
                    >
                      <li className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        <Link to="/checkin" Check-in>
                          Check-in
                        </Link>
                      </li>
                      <li className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        <Link to="/checkout">Check-out</Link>
                      </li>
                      <li className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        <Link to="/bill">Bill</Link>
                      </li>
                      <li className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        <Link to="/liveorders">Live</Link>
                      </li>
                      <li className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        <Link to="/edit">Edit</Link>
                      </li>
                    </motion.ul>
                  </div> */}

                  {/* <p
                    className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={logout}
                  >
                    Logout <MdLogout />
                  </p> */}
                </motion.div>
              }
            </>
          </MenuItem>
        </Menu>
        {
          // <FloatGroup style={{ margin: "0 10px" }} margin={80} delay={0.02}>
          //   <Button>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          //   </Button>
          // </FloatGroup>
        }
      </div>
    </header>
  );
};

export default Header;
