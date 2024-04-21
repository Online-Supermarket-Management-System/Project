import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./AdminLogin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { adminLogin } from "../../api/adminLogin";

export default class AdminLogin extends Component {
  state = {
    loginEmail: "",
    loginPassword: "",
    empId: "",
    firstName: "",
    lastName: "",
    registerEmail: "",
    contactNumber: "",
    registerPassword: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { loginEmail, loginPassword } = this.state;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    try {
      const data = {
        empId: loginEmail,
        password: loginPassword,
      };
      const response = await adminLogin(data);
      console.log(response);

      if (response.status === 200) {
        if (response.token && response.approved) {
          console.log("Login successful");
          toast.success("Login successful");
          //window.location.href = "/adminhome";

          this.setState({
            loginEmail: "",
            loginPassword: ""
          });

        } else if (!response.approved) {
          console.log("Account pending approval by superadmin");
          
          toast.error("Your account is pending approval by superadmin.");
        } else {
          console.log("Incorrect ID or password");
          toast.error("Incorrect ID or password");
        }
      } else {
        console.log("Login failed");
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Your account is pending approval by superadmin.");
    }
  };

  handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const {
      empId,
      firstName,
      lastName,
      registerEmail,
      contactNumber,
      registerPassword,
    } = this.state;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post("http://localhost:4000/auth/", {
          empId,
          firstName,
          lastName,
          email: registerEmail,
          contactNumber,
          password: registerPassword,
        });

        if (response.status === 201) {
          console.log("Registration successful");
          toast.success("Registration successful");

          this.setState({
            empId: "",
            firstName: "",
            lastName: "",
            registerEmail: "",
            contactNumber: "",
            registerPassword: "",
          });
        } else {
          console.log("Registration failed");
          toast.error("Registration failed");
        }
      } catch (error) {
        console.error("Error occurred during registration:", error);
        toast.error("User already exits");
      }
    }

    this.setState({ registerValidated: true });
  };

  handleLoginEmailChange = (event) => {
    this.setState({ loginEmail: event.target.value });
  };

  handleLoginPasswordChange = (event) => {
    this.setState({ loginPassword: event.target.value });
  };

  handleRegisterInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderInputField = (label, type, onChange, value, placeholder, formType) => {
    // if (formType === "register" && (label === "Email" || label === "Password")) {
    //   return null; // Do not render email and password fields in the register form
    // }

    return (
      <div className="login-6--01">
        <div className="login-7--01">
          <div className="email">{label}</div>
        </div>
        <Form.Control
          placeholder={placeholder}
          className="login-7--12"
          type={type}
          required
          onChange={onChange}
          value={value}
        />
      </div>
    );
  };

  renderLogin = () => {
    const { loginEmail, loginPassword, validated } = this.state;
    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={this.handleSubmit}
        className="admin-login-3--0"
      >
        <div className="login-4--1">
          <div className="login-5--01">
            <h1 className="welcome-back">Admin Login</h1>
          </div>
        </div>
        <div className="login-4--2">
          <div className="login-5--02">
            {this.renderInputField(
              "Id",
              "text",
              this.handleLoginEmailChange,
              loginEmail,
              "Id"
            )}
          </div>
        </div>
        <div className="login-4--3">
          <div className="login-5--03">
            {this.renderInputField(
              "Password",
              "password",
              this.handleLoginPasswordChange,
              loginPassword,
              "Password"
            )}
          </div>
        </div>
        <div className="login-4--5">
          <Button
            variant="outline-success"
            style={{ width: "100%" }}
            type="submit"
          >
            Log in
          </Button>{" "}
        </div>
      </Form>
    );
  };

  renderRegister = () => {
    const {
      empId,
      firstName,
      lastName,
      registerEmail,
      contactNumber,
      registerPassword,
      registerValidated,
    } = this.state;
    return (
      <Form
        noValidate
        validated={registerValidated}
        onSubmit={this.handleRegisterSubmit}
        className="admin-login-3--0"
      >
        <div className="login-4--1">
          <div className="login-5--01">
            <h1 className="welcome-back">Admin Register</h1>
          </div>
        </div>
        <div className="login-4--2">
          <div className="login-5--02">
            <Form.Control
              placeholder="Employee Id"
              className="login-7--12"
              type="text"
              required
              onChange={this.handleRegisterInputChange}
              value={empId}
              name="empId"
            />
          </div>
        </div>
        <div className="login-4--2">
          <div className="login-5--02">
            <Form.Control
              placeholder="First Name"
              className="login-7--12"
              type="text"
              required
              onChange={this.handleRegisterInputChange}
              value={firstName}
              name="firstName"
            />
          </div>
        </div>
        <div className="login-4--2">
          <div className="login-5--02">
            <Form.Control
              placeholder="Last Name"
              className="login-7--12"
              type="text"
              required
              onChange={this.handleRegisterInputChange}
              value={lastName}
              name="lastName"
            />
          </div>
        </div>
        <div className="login-4--2">
          <div className="login-5--02">
            <Form.Control
              placeholder="Email"
              className="login-7--12"
              type="email"
              required
              onChange={this.handleRegisterInputChange}
              value={registerEmail}
              name="registerEmail"
            />
          </div>
        </div>
        <div className="login-4--2">
          <div className="login-5--02">
            <Form.Control
              placeholder="Contact Number"
              className="login-7--12"
              type="number"
              required
              onChange={this.handleRegisterInputChange}
              value={contactNumber}
              name="contactNumber"
            />
          </div>
        </div>
        <div className="login-4--3">
          <div className="login-5--03">
            <Form.Control
              placeholder="Password"
              className="login-7--12"
              type="password"
              required
              onChange={this.handleRegisterInputChange}
              value={registerPassword}
              name="registerPassword"
            />
          </div>
        </div>
        <div className="login-4--5">
          <Button
            variant="outline-success"
            style={{ width: "100%" }}
            type="submit"
          >
            Register
          </Button>{" "}
        </div>
      </Form>
    );
  };

  render() {
    return (
      <div className="admin-login">
        <main className="admin-login-0--0">
          <section className="login-1--0">
            <div className="login-2--1">
              {this.renderRegister()}
              <div style={{ marginLeft: "40px" }}></div>
              {this.renderLogin()}
            </div>
          </section>
        </main>
        <ToastContainer />
      </div>
    );
  }
}
