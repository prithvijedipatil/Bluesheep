import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import BillDetails from "./components/BillDetails";
import AddGuest from "./components/AddGuest";
import RemoveGuest from "./components/RemoveGuest";
import LiveOrders from "./components/LiveOrders";
import EditOrders from "./components/EditOrders";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/bill" element={<BillDetails />} />
            <Route path="/checkin" element={<AddGuest />} />
            <Route path="/checkout" element={<RemoveGuest />} />
            <Route path="/liveorders" element={<LiveOrders />} />
            <Route path="/edit" element={<EditOrders />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
