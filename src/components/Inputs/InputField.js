import React from "react";
import Form from "react-bootstrap/Form";

const InputField = ({label, type, value, onChange}) => {
  return (
    <div className="register-6--04">
      <div className="register-7--04">
        <div className="first-name">{label}</div>
      </div>
      <Form.Control
        placeholder={label}
        className="register-7--12"
        type={type}
        required
        value = {value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
