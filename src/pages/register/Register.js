import React, { useState } from "react";
import "./Register.css";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import InputField from "../../components/Inputs/InputField";
import TextArea from "../../components/Inputs/TextArea";
import InputSelect from "../../components/Inputs/InputSelect";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "react-bootstrap/Button";

import { register } from "../../api/auth";

const RegistrationCopy = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("Jaffna");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setAgreeTerms(event.target.checked);
  };

  const handleAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms); // Toggle agreeTerms state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the Terms of Use and Privacy Policy");
      return;
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      address,
      postal_code: postalCode,
      city,
      contact_number: contactNumber,
      email,
      password,
      ch: agreeTerms // Pass agreeTerms instead of ch
    };

    try {
      const response = await axios.post("http://localhost:4000/create", userData);
      console.log("Registration successful:", response.data);
      toast.success("Registration successful!");
      window.location.href = "/login";
      // Redirect to login page or any other page
      // You can use React Router for navigation
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  // const renderInputField = (label, type) => {
  //   return (
  //     <div className="register-6--04">
  //       <div className="register-7--04">
  //         <div className="first-name">{label}</div>
  //       </div>
  //       <Form.Control placeholder={label} className="register-7--12" type={type}/>
  //     </div>
  //   );
  // };

  // const renerTextArea = (label, type) => {
  //   return (
  //     <div className="register-6--05">
  //       <div className="register-7--06">
  //         <div className="address">{label}</div>
  //       </div>
  //       <Form.Control as="textarea" rows={3} placeholder={label} className="register-7--14" type={type}/>
  //     </div>
  //   );
  // };

  // const renderSelectField = (label, options) => {
  //   return (
  //     <div className="register-6--06">
  //       <div className="register-7--07">
  //         <div className="city">{label}</div>
  //       </div>
  //       <Form.Select aria-label="Default select example">
  //         <option>{label}</option>
  //         {/* <option value="1">Jaffna</option> */}
  //         {
  //           options.map((option, index) => {
  //             return <option value="1">{option}</option>
  //           })
  //         }
  //       </Form.Select>
  //     </div>
  //   );
  // };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="registration-copy">
        <div className="logic-gate"></div>
        <main className="instance-parent">
          <img className="-child" loading="lazy" alt="" src="/line-3.svg" />
          <section className="-wrapper">
            <div className="-parent">
              <div className="image-1-parent">
                <img
                  className="image-1-icon"
                  loading="lazy"
                  alt=""
                  src="home page.jpg"
                />
                <div className="welcome-to-northway-supermart-wrapper">
                  <h1 className="welcome-to-northway">
                    Welcome to Northway Supermart
                  </h1>
                </div>
              </div>
              <div className="-group">
                <div className="-container">
                  <div className="register-6--0-parent">
                    <InputField
                      label={"First Name"}
                      type={"text"}
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                    <InputField
                      label={"Last Name"}
                      type={"text"}
                      value={lastName}
                      onChange={handleLastNameChange}
                    />
                  </div>
                </div>
                <div className="register-4--31">
                  <div className="register-5--07">
                    <TextArea
                      label={"Address"}
                      type={"text"}
                      value={address}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
                <div className="-div">
                  <div className="register-6--0-group">
                    <InputField
                      label={"Postal Code"}
                      type={"text"}
                      value={postalCode}
                      onChange={handlePostalCodeChange}
                    />
                    <InputSelect
                      label={"City"}
                      options={["Jaffna"]}
                      value={city}
                      onChange={handleCityChange}
                    />
                    {/* <InputSelect label={"State"} options={["Northern"]}/> */}
                  </div>
                </div>
                <div className="register-4--5-parent">
                  <div className="register-4--51">
                    <div className="register-5--08">
                      <InputField
                        label={"Contact Number"}
                        type={"number"}
                        value={contactNumber}
                        onChange={handleContactNumberChange}
                      />
                    </div>
                  </div>
                  <div className="register-4--61">
                    <div className="register-5--09">
                      <InputField
                        label={"Email"}
                        type={"email"}
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>
                  <div className="register-4--7">
                    <div className="register-5--010">
                      <InputField
                        label={"Password"}
                        type={"password"}
                        value={[password]}
                        onChange={handlePasswordChange}
                      />
                    </div>
                  </div>
                  <div className="register-4--8">
                    <div className="register-5--011">
                      <InputField
                        label={"Confirm Password"}
                        type={"password"}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="register-5--0-wrapper">
                  {/* <div className="register-5--012">
                  <div className="register-6--011">
                    <div className="register-7--013">
                      <div className="i-agree-to" >
                        <Form.Check.Input type={"checkbox"} isValid />
                        {privacy}
                      </div>
                    </div>
                  </div>
                </div> */}
                  <Form.Check.Input
                    type={"checkbox"}
                    isValid
                    style={{ marginRight: "5px" }}
                    onChange={handleCheckboxChange}
                    checked={agreeTerms} 
                  />
                  I agree to the Terms of Use and Privacy Policy
                </div>
                <div className="register-4--10-parent">
                  <div className="register-4--10">
                    {/* <div className="register-5--013">
                    <div className="register-6--012">
                      <div className="register-7--014">
                        <b className="create-account">Create Account</b>
                      </div>
                    </div>
                  </div> */}
                    <Button
                      variant="outline-success"
                      style={{ width: "100%" }}
                      onClick={handleSubmit}
                    >
                      Create Account
                    </Button>{" "}
                  </div>

                  <div className="already-registered-log-in-wrapper">
                    <div className="already-registered-log">
                      Already registered? Log in.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <ToastContainer />  
    </Form>
  );
};

export default RegistrationCopy;
