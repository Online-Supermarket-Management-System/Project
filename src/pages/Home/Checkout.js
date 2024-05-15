import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [addedItems, setAddedItems] = useState([]);
  const location = useLocation();
  const [orderItems, setOrderItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [orderId, setOrderId] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    time: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
    delivery: "normal",
  });

  useEffect(() => {
    if (location.state && location.state.orderItems) {
      setOrderItems(location.state.orderItems);
    }
  }, [location.state]);

  useEffect(() => {
    // Fetch added items from backend
    axios
      .get("http://localhost:4000/product/cart")
      .then((response) => {
        console.log("Added items:", response.data); // Check the data returned from the backend
        setAddedItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching added items:", error);
      });
  }, []);
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleBillingInfoChange = (event) => {
    const { name, value } = event.target;
    setBillingInfo((prevBillingInfo) => ({
      ...prevBillingInfo,
      [name]: value,
    }));
  };
  useEffect(() => {
    // Calculate subtotal
    const subTotalAmount = addedItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
  
    // Total is the same as subtotal for now
    const totalAmount = subTotalAmount;
  
    // Update state variables
    setSubtotal(subTotalAmount);
    setTotal(totalAmount);
  }, [addedItems]);
  

  const handleCheckout = async () => {
    try {
      // Prepare order data
      const orderData = {
        firstName: billingInfo.firstName,
        lastName: billingInfo.lastName,
        delivery: billingInfo.delivery,
        orderItems: orderItems.map((item) => ({
          productId: item._id,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          total: item.product.price * item.quantity,
        })),
      };

      // Prepare billing data
      const billingData = {
        firstName: billingInfo.firstName,
        lastName: billingInfo.lastName,
        address: billingInfo.address,
        time: billingInfo.time,
        delivery: billingInfo.delivery,
        postalCode: billingInfo.postalCode,
        city: billingInfo.city,
        email: billingInfo.email,
      };

      toast.success(
        "Your order has been successfully placed. Please hold on while we redirect you to the payment page"
      );

      // Send order data to order API
      await axios.post("http://localhost:4000/order", orderData);

      // Send billing data to billing API
      await axios.post("http://localhost:4000/billing", billingData);

      // Navigate to payment page
      navigate("/payment");
    } catch (error) {
      console.error("Error submitting checkout:", error);
    }
  };


  // useEffect(() => {
  //   console.log("Order Items:", orderItems);
  // }, [orderItems]);

  // useEffect(() => {
  //   console.log("Product Details:", productDetails);
  // }, [productDetails]);

  return (
    <div>
      <Grid container spacing={2}>
        {/* Billing Information Card */}
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Billing Information
              </Typography>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <TextField
                      fullWidth
                      id="firstName"
                      name="firstName"
                      value={billingInfo.firstName}
                      onChange={handleBillingInfoChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <TextField
                      fullWidth
                      id="lastName"
                      name="lastName"
                      value={billingInfo.lastName}
                      onChange={handleBillingInfoChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel htmlFor="time">Delivery Time</InputLabel>
                    <TextField
                      fullWidth
                      id="time"
                      name="time"
                      type="time"
                      value={billingInfo.time}
                      onChange={handleBillingInfoChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 minutes
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="address">Street Address</InputLabel>
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      value={billingInfo.address}
                      onChange={handleBillingInfoChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="postalCode">Postal Code</InputLabel>
                    <TextField
                      fullWidth
                      id="postalCode"
                      name="postalCode"
                      value={billingInfo.postalCode}
                      onChange={handleBillingInfoChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <TextField
                      fullWidth
                      id="city"
                      name="city"
                      value={billingInfo.city}
                      onChange={handleBillingInfoChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      value={billingInfo.email}
                      onChange={handleBillingInfoChange}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <InputLabel htmlFor="delivery">Delivery</InputLabel>
                    <RadioGroup
                      aria-label="delivery"
                      name="delivery"
                      value={billingInfo.delivery}
                      onChange={handleBillingInfoChange}
                    >
                      <Grid container>
                        <FormControlLabel
                          value="normal"
                          control={<Radio />}
                          label="Normal"
                        />
                        <FormControlLabel
                          value="express"
                          control={<Radio />}
                          label="Express"
                        />
                        <FormControlLabel
                          value="pickup"
                          control={<Radio />}
                          label="Pickup"
                        />
                      </Grid>
                    </RadioGroup>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        {/* Checkout Details Card */}
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Order Summary
              </Typography>
              <table>
                <thead>
                  <tr>
                    <th>Product </th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                {addedItems.map((item) => (
  <tr key={item._id}>
    <td>{item.product?.name}</td>
    <td>{item.quantity}</td>
    <td>${item.product?.price}</td>
  </tr>
))}

</tbody>

                <tfoot>
                  <tr>
                    <td colSpan="2">Subtotal:</td>
                    <td>${subtotal}</td>
                  </tr>
                  <tr>
                    <td colSpan="2">Shipping:</td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colSpan="2">Total:</td>
                    <td>${total}</td>
                  </tr>
                </tfoot>
              </table>
              <div>
                {/* <div>Subtotal: ${subtotal}</div>
              <div>Shipping: Free</div>
              <div>Total: ${total}</div> */}
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="payment-method"
                    name="payment-method"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label="Cash on Delivery"
                    />
                    <FormControlLabel
                      value="paypal"
                      control={<Radio />}
                      label="PayPal"
                    />
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Credit/Debit Card"
                    />
                  </RadioGroup>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#00b207",
                      borderRadius: "999px",
                      width: "200px",
                    }}
                    onClick={handleCheckout}
                  >
                    Place Order
                  </Button>
                </FormControl>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
