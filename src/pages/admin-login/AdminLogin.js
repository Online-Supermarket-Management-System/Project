import React, { Component } from 'react'

import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

export default class AdminLogin extends Component {
    state = {
        validated: false,
        email: "",
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
    
    handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    
    handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    
    renderInputField = (label, type, onChange, value) => {
        return (
          <div className="login-6--01">
            <div className="login-7--01">
              <div className="email">Email</div>
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
  render() {
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
                      {renderInputField("Email", "email", handleEmailChange, email)}
                    </div>
                  </div>
                  <div className="login-4--3">
                    <div className="login-5--03">
                    {renderInputField("Password", "password", handlePasswordChange, password)}
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
                    <Button variant="outline-success" style = {{width: "100%"}} onClick={handleSubmit}>
                      Log in
                    </Button>{' '}
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
    )
  }
}
