import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./AdminLogin.css";

export default class AdminLogin extends Component {
  state = {
    validated: false,
    id: "",
    password: "",
    contactNo: "",
    nic: "",
    registeralidated: false,
    registerId: "",
    registerPassword: "",
  };

  handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ validated: true });
  };

  handleRegisterSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ registeralidated: true });
  };

  handleEmailChange = (event) => {
    this.setState({ id: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderInputField = (label, type, onChange, value, placeholder) => {
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
    const { id, password } = this.state;
    return (
      <form className="admin-login-3--0">
        {/* <div className="login-4--0">
                    <div className="login-5--0">
                      <div className="login-6--0">
                        <img
                          className="login-7--0"
                          loading="lazy"
                          alt=""
                          src="home page.jpg"
                        />
                      </div>
                    </div>
                  </div> */}
        <div className="login-4--1">
          <div className="login-5--01">
            <h1 className="welcome-back">Admin Login</h1>
          </div>
        </div>
        <div className="login-4--2">
          <div className="login-5--02">
            {this.renderInputField("ID", "text", this.handleEmailChange, id, "Employee ID")}
          </div>
        </div>
        <div className="login-4--3">
          <div className="login-5--03">
            {this.renderInputField(
              "Password",
              "password",
              this.handlePasswordChange,
              password,
              "Password"
            )}
          </div>
        </div>
        {/* <div className="login-4--4">
                    <div className="login-5--04">
                      <div className="forgot-password">Forgot Password?</div>
                    </div>
                  </div> */}
        <div className="login-4--5">
          {/* <div className="login-5--05">
                      <div className="login-6--03">
                        <div className="login-7--03">
                          <b className="log-in">Log in</b>
                        </div>
                      </div>
                    </div> */}
          <Button
            variant="outline-success"
            style={{ width: "100%" }}
            onClick={this.handleSubmit}
          >
            Log in
          </Button>{" "}
        </div>
        {/* <div className="login-4--6">
          <div className="login-5--06">
            <div className="new-customer-register">Register</div>
          </div>
        </div> */}
      </form>
    );
  };

  renderRegister = () => {
    const { registerId, registerPassword, contactNo, nic } = this.state;
    return (
      <form className="admin-login-3--0">
        {/* <div className="login-4--0">
                    <div className="login-5--0">
                      <div className="login-6--0">
                        <img
                          className="login-7--0"
                          loading="lazy"
                          alt=""
                          src="home page.jpg"
                        />
                      </div>
                    </div>
                  </div> */}
        <div className="login-4--1">
          <div className="login-5--01">
            <h1 className="welcome-back">Admin Register</h1>
          </div>
        </div>
        <div className="login-4--2">
          <div className="login-5--02">
            {this.renderInputField("ID", "text", this.handleInputChange, registerId, "Employee ID")}
          </div>
        </div>
        <div className="login-4--2">
          <div className="login-5--02">
            {this.renderInputField(
              "Contact No",
              "text",
              this.handleInputChange,
              contactNo,
              "Contact No"
            )}
          </div>
        </div>
        <div className="login-4--2">
          <div className="login-5--02">
            {this.renderInputField("NIC", "text", this.handleInputChange, nic, "NIC")}
          </div>
        </div>
        <div className="login-4--3">
          <div className="login-5--03">
            {this.renderInputField(
              "Password",
              "password",
              this.handleInputChange,
              registerPassword,
              "Password"
            )}
          </div>
        </div>
        {/* <div className="login-4--4">
                    <div className="login-5--04">
                      <div className="forgot-password">Forgot Password?</div>
                    </div>
                  </div> */}
        <div className="login-4--5">
          {/* <div className="login-5--05">
                      <div className="login-6--03">
                        <div className="login-7--03">
                          <b className="log-in">Log in</b>
                        </div>
                      </div>
                    </div> */}
          <Button
            variant="outline-success"
            style={{ width: "100%" }}
            onClick={this.handleSubmit}
          >
            Register
          </Button>{" "}
        </div>
        {/* <div className="login-4--6">
          <div className="login-5--06">
            <div className="new-customer-register">Register</div>
          </div>
        </div> */}
      </form>
    );
  };

  render() {
    const { validated, registeralidated } = this.state;
    return (
      <div className="admin-login">
        <main className="admin-login-0--0">
          <section className="login-1--0">
            <div className="login-2--1">
              <Form
                noValidate
                validated={validated}
                onSubmit={this.handleSubmit}
              >
                {this.renderRegister()}
              </Form>
              <div className="admin-login-con-2--2">
                <Form
                  noValidate
                  validated={registeralidated}
                  onSubmit={this.handleSubmit}
                >
                  {this.renderLogin()}
                </Form>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
