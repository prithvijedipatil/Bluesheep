import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import {
  Query,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { motion } from "framer-motion";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function LiveOrders() {
  const [liveOrders, setLiveOrders] = useState([]);
  const chatRef = useRef(null);
  const [flag, setFlag] = useState(false);
  const [showOrders, setShowOrders] = useState([]);
  let mainOrders = [];
  const [{ dynamicOrders }, dispatch] = useStateValue();

  useEffect(() => {
    const dummyData = [];

    onSnapshot(
      query(collection(db, "LiveOrders"), orderBy("date")),
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dummyData.push({ id: doc.id, ...doc.data() });

          setLiveOrders(dummyData);
          dispatch({
            type: actionType.SET_CARTITEMS,
            dynamicOrders: dummyData,
          });
        });

        console.log(dummyData, "LiveOrderDatafinal");

        console.log(mainOrders, "mainOrders");
        chatRef?.current?.scrollIntoView({ behavior: "smooth" });
      },
      (error) => {
        console.error("Error fetching Live Orders:", error);
      }
    );
  }, [dynamicOrders]);

  const handleServed = async (id) => {
    let orderlist = {};
    if (id) {
      let servedOrder = liveOrders.filter((item) => item.id == id);
      console.log("served order", servedOrder);
      orderlist = {
        date: Math.floor(Date.now() / 1000),
        orderFor: servedOrder[0].orderFor,
        order: servedOrder[0].order,
      };
      servedOrder.length = 0;
      console.log(orderlist, "orderlist");
      let confirmation = prompt("Did you serve the Dish - type YES");
      if (confirmation == "YES") {
        await addDoc(collection(db, "Orders"), orderlist);
        let ref = doc(db, "LiveOrders", id.toString());
        await deleteDoc(ref);
        alert("Added to Bill");
        window.location.reload();
      }
    }
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        {liveOrders &&
          liveOrders.map((item) => {
            return (
              <>
                <React.Fragment key={item.id}>
                  <CardContent>
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      key={item.id}
                      className={`group ${"bg-card"} mx-10 min-w-[94px] h-full cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:shadow w-full `}
                    >
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Food Order
                      </Typography>
                      <Typography variant="body2">{item.id}</Typography>
                      <Typography variant="h5" component="div">
                        {item.orderFor}
                      </Typography>

                      {item.order.map((order) => {
                        return (
                          <>
                            <Typography
                              key={item.id}
                              sx={{ mb: 1.5 }}
                              color="text.secondary"
                            >
                              {`Item : ${order.name} x ${order.quantity} `}
                              <br />
                            </Typography>
                          </>
                        );
                      })}

                      <CardActions>
                        <Button
                          size="medium"
                          style={{
                            backgroundColor: "#38BDF9",
                            color: "white",
                            font: "24px",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                          }}
                          onClick={() => handleServed(item.id)}
                        >
                          Served
                        </Button>
                      </CardActions>
                    </motion.div>
                  </CardContent>
                </React.Fragment>
              </>
            );
          })}
      </Card>
      <div ref={chatRef}>End</div>
    </Box>
  );
}

export default LiveOrders;
