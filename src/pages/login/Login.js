import { useState } from "react";
import "./Login.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { login } from "../../api/auth";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      email: email,
      password: password,
    };

    console.log("data", data);

    try {
      const response = await login(data);
      console.log("response", response);

      if (response) {
        console.log("Login successful");
        localStorage.setItem("customerEmail", response.data.email);

        const customer = localStorage.getItem("customerEmail");
        console.log("cus", customer);

        localStorage.setItem("customerId", response.data._id);

        const customerId = localStorage.getItem("customerId");
        console.log("cus", customerId);


        window.location.href = "/";
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const renderInputField = (label, type, onChange, value) => {
    return (
      <div className="login-6--01">
        <div className="login-7--01">
          <div className="email">{label}</div>
        </div>
        <Form.Control
          placeholder={label}
          className="login-7--12"
          type={type}
          required
          onChange={onChange}
          value={value}
        />
      </div>
    );
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="login">
        <main className="login-0--0">
          <section className="login-1--0">
            <div className="login-2--1">
              <form className="login-3--0">
                <div className="login-4--0">
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
                </div>
                <div className="login-4--1">
                  <div className="login-5--01">
                    <h1 className="welcome-back">Welcome back!</h1>
                  </div>
                </div>
                <div className="login-4--2">
                  <div className="login-5--02">
                    {renderInputField(
                      "Email",
                      "email",
                      handleEmailChange,
                      email
                    )}
                  </div>
                </div>
                <div className="login-4--3">
                  <div className="login-5--03">
                    {renderInputField(
                      "Password",
                      "password",
                      handlePasswordChange,
                      password
                    )}
                  </div>
                </div>
                <div className="login-4--4">
                  <div className="login-5--04">
                    <div className="forgot-password">Forgot Password?</div>
                  </div>
                </div>
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
                    onClick={handleSubmit}
                  >
                    Log in
                  </Button>{" "}
                </div>
                <div className="login-4--6">
                  <div className="login-5--06">
                    <div className="new-customer-register">
                      New Customer? Register
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </Form>
  );
};

export default Login;
