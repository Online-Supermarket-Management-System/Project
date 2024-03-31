import React from "react";
import Form from "react-bootstrap/Form";

const TextArea = ({label, type, value, onChange}) => {
  return (
    <div className="register-6--05">
      <div className="register-7--06">
        <div className="address">{label}</div>
      </div>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder={label}
        className="register-7--14"
        type={type}
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
