import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateAdminOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@material-ui/core";
// import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrderStyles.css";
import { orderActions } from "../../reducers/orderReducer";

const ProcessOrder = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {id}=useParams();
    console.log(id);


  const {  error, isUpdated,isLoading,orderDetails } = useSelector((state) => state.order);
console.log(orderDetails)
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateAdminOrder(id, myForm));
  };

  
  const [status, setStatus] = useState("");


  useEffect(() => {
    console.log("dispatch");

    
        dispatch(getOrderDetails(id));

        
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully");

      dispatch(orderActions.UPDATE_ADMIN_ORDER_RESET());
    }
   
  }, [dispatch, alert, error, id, isUpdated]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {isLoading ? (
            <Loader />
          ) : (
            // <div>{orderDetails && <p>{orderDetails._id}</p> }</div>
            <div
              className="confirmOrderPage"
              style={{
                display: orderDetails && orderDetails.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{orderDetails.user && orderDetails.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {orderDetails.shippingInfo && orderDetails.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {orderDetails.shippingInfo &&
                          `${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.state}, ${orderDetails.shippingInfo.pinCode}, ${orderDetails.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          orderDetails.paymentInfo &&
                          orderDetails.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderDetails.paymentInfo &&
                        orderDetails.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{orderDetails.totalPrice && orderDetails.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          orderDetails.orderStatus && orderDetails.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderDetails.orderStatus && orderDetails.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {orderDetails.orderItems &&
                      orderDetails.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: orderDetails.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {orderDetails.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {orderDetails.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      isLoading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;