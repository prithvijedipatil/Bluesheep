import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { db, firestore } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import "../index.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const BillDetails = () => {
  const [billDetails, setBillDetails] = useState([]);
  const [guests, setGuests] = useState([]);
  const [personName, setPersonName] = useState("");
  const dummyData = [];
  const names = [];
  const finaOrdersData = [];
  const [{ billItems }, dispatch] = useStateValue();
  const [showTable, setShowTable] = useState(false);
  const [total, setTotal] = useState("");
  const [Flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const doc = new jsPDF();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    console.log("Fetched guests", guests);
  };

  useEffect(async () => {
    // const getDetails = async () => {
    onSnapshot(
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
        console.error("Error fetching podcasts:", error);
      }
    );

    // }
  }, []);

  guests.forEach((doc) => {
    names.push(doc);
  });

  const handleEmail = () => {
    doc.autoTable({ html: "#my-table" });
    doc.save("table.pdf");
    alert("Downloaded successfully");
  };

  const getGuests = () => {
    console.log("page relaoding");
    setFlag(true);
    if (Flag) window.location.reload();
    console.log("page relaoded");
  };

  const handleSubmit = async () => {
    if (personName) {
      console.log("selected guest console", personName);
      onSnapshot(
        query(
          collection(db, "Orders"),
          orderBy("date", "asc"),
          where("orderFor", "==", personName)
        ),
        (querySnapshot) => {
          const OrdersData = [];
          querySnapshot.forEach((doc) => {
            OrdersData.push({ id: doc.id, ...doc.data() });
          });
          //   dispatch(setPodcasts(OrdersData));
          dispatch({
            type: actionType.SET_CARTITEMS,
            billItems: OrdersData,
          });
          setBillDetails(OrdersData);
          console.log(OrdersData, "orders");
          // OrdersData.map((item) =>
          //   finaOrdersData.push(item.order.map((data) => data))
          // );
          if (OrdersData) {
            let tally = [];
            OrdersData.map((item) => {
              console.log("total calculating");
              item.order.map((data) => {
                tally = eval(tally + eval(data.price * data.quantity));
              });
            });
            setTotal(tally);
            console.log("total calculated", total);
          }
        },
        (error) => {
          console.error("Error fetching podcasts:", error);
        }
      );

      setShowTable(!showTable);
    }
  };

  return (
    <>
      <h1 style={{ marginLeft: "1%", marginTop: "20%", marginBottom: "0%" }}>
        Generate Bill
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
      {Flag && (
        <>
          <div
            style={{
              marginTop: "50px",
              fontWeight: "400",
              fontSize: "24px",
            }}
          >
            <h1>Please select the guest name to bill</h1>
          </div>
          <div
            style={{
              marginTop: "50px",
            }}
            className="w-full flex items-center justify-between"
          >
            {/* <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p> */}

            <select
              className="w-full p-1 px-2 rounded-lg bg-cartItem text-white flex items-center gap-2"
              value={personName}
              onChange={handleChange}
              placeholder="Please select the guest name"
              style={
                ({ width: "200px" },
                { alignContent: "center" },
                { padding: "30px" })
              }
            >
              {names.map((item) => (
                <option
                  style={{ color: "white !important" }}
                  key={item.id}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <button
            style={{
              marginTop: "60px",
            }}
            onClick={handleSubmit}
            type="button"
            className="bg-gradient-to-br text-white from-cyan-500 to-blue-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          >
            Get bill
          </button>
          {showTable && (
            <form>
              <div
                style={{
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  overflowX: "auto",
                  marginTop: "20px",
                }}
              >
                <table name="table" id="my-table">
                  <thead>
                    <tr
                      style={{
                        border: "1px solid black",
                        borderCollapse: "collapse",
                      }}
                    >
                      <th>Order-Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  {console.log(billDetails)}
                  {billDetails &&
                    billDetails.map((item) => {
                      return (
                        <>
                          {item.order.map((orderData) => {
                            return (
                              <>
                                <tr>
                                  {/* <td key={item.id} colSpan={item.order.length}>
                            {item.date.toString()}
                          </td> */}
                                  <td>{orderData.name}</td>
                                  <td>{orderData.price}</td>
                                  <td>{orderData.quantity}</td>
                                  <td>
                                    {eval(orderData.quantity * orderData.price)}
                                  </td>
                                </tr>
                                {/* {
                          (total = eval(
                            total + eval(orderData.quantity * orderData.price)
                          ))
                        } */}
                              </>
                            );
                          })}
                        </>
                      );
                    })}
                </table>
              </div>
              <button
                style={{
                  marginTop: "60px",
                }}
                type="submit"
                onClick={handleEmail}
                className="bg-gradient-to-br text-white from-cyan-500 to-blue-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
              >
                Download
              </button>
            </form>
          )}
          {console.log("totaaallll", total)}
          <h1
            style={{ margin: "30px", fontWeight: "bolder", fontSize: "28px" }}
          >
            Total Bill :{total}
          </h1>
          <h5
            style={{ margin: "30px", fontWeight: "bolder", fontSize: "28px" }}
          >
            with GST :{total * 1.05}
          </h5>
        </>
      )}
    </>
  );
};

export default BillDetails;
