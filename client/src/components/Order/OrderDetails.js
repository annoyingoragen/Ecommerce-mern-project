import React, { Fragment, useEffect } from "react";
import "./orderDetailsStyles.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {
  const { orderDetails, error, isLoading } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const alert = useAlert();

 const {id}=useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    console.log(id);
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{orderDetails && orderDetails._id}
              </Typography>
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

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;