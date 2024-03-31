import React from "react";
import Form from "react-bootstrap/Form";

const InputSelect = ({label, options, value, onChange}) => {
  return (
    <div className="register-6--06">
      <div className="register-7--07">
        <div className="city">{label}</div>
      </div>
      <Form.Select aria-label="Default select example" value={value}>
        {/* <option>{label}</option> */}
        {options.map((option, index) => {
          return <option value="1" key = {index} onChange={onChange}>{option}</option>;
        })}
      </Form.Select>
    </div>
  );
};

export default InputSelect;
