import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
      "Invalid expiration date"
    )
    .required("Expiry date is required")
    .test("expiryDate", "Expiry date must be in the future", (value) => {
      if (!value) return false;
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      const [inputMonth, inputYear] = value.split("/");
      if (
        parseInt(inputYear, 10) > currentYear ||
        (parseInt(inputYear, 10) === currentYear &&
          parseInt(inputMonth, 10) >= currentMonth)
      ) {
        return true;
      }
      return false;
    }),

  cvc: Yup.string()
    .required("CVC is required")
    .matches(/^\d{3}$/, "CVC must be exactly 3 digits"),
  cardHolderName: Yup.string().required("Card holder name is required"),
});

const Payment = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Send form data to the API
      const response = await axios.post("http://localhost:4000/payment", values);

      // Assuming the API responds with a success status
      if (response.status === 201) {
        // Navigate to another page after successful submission
        navigate("/success");
      } else {
        // Handle API error
        console.error("API error:", response.data.error);
      }
    } catch (error) {
      // Handle submission error
      console.error("Submission error:", error);
    } finally {
      // Check if setSubmitting is defined before calling it
      if (typeof setSubmitting === "function") {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full border-gray-300 p-5">
      <Formik
        initialValues={{
          cardNumber: "",
          expiryDate: "",
          cvc: "",
          cardHolderName: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-500">
          <div className="mb-4">
            <label htmlFor="customerId" className="block mb-1">
              Customer ID
            </label>
            <Field
              type="number"
              id="customerId"
              name="customerId"
              className="block w-full border rounded-md px-3 py-2"
            />
          </div>
          {/* Card Number Field */}
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block mb-1">
              Card Number
            </label>
            <Field
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="block w-full border rounded-md px-3 py-2"
            />
            <ErrorMessage
              name="cardNumber"
              component="div"
              className="text-red-500"
            />
          </div>
          {/* Expiry Date Field */}
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block mb-1">
              Expiry Date
            </label>
            <Field
              type="text"
              id="expiryDate"
              name="expiryDate"
              className="block w-full border rounded-md px-3 py-2"
              placeholder="MM/YY"
            />
            <ErrorMessage
              name="expiryDate"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* CVC Field */}
          <div className="mb-4">
            <label htmlFor="cvc" className="block mb-1">
              CVC
            </label>
            <Field
              type="text"
              id="cvc"
              name="cvc"
              className="block w-full border rounded-md px-3 py-2"
            />
            <ErrorMessage
              name="cvc"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Card Holder Name Field */}
          <div className="mb-4">
            <label htmlFor="cardHolderName" className="block mb-1">
              Card Holder Name
            </label>
            <Field
              type="text"
              id="cardHolderName"
              name="cardHolderName"
              className="block w-full border rounded-md px-3 py-2"
            />
            <ErrorMessage
              name="cardHolderName"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#00b207",
              borderRadius: "999px",
              width: "200px",
            }}
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Payment;
