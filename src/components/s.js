import React, { useState } from 'react';

function CustomAlert() {
    var inputval;
  const [inputType, setInputType] = useState('text');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputType(event.target.value);
    setInputValue(event.target.value); 
    inputval = event.target.value; 
  };

  return (
    <div>
      <label htmlFor="inputType"></label>
      <select
        name="Services"
        value={inputType}
        onChange={handleInputChange}
        className="form-control my-3"
      >
        <option value="">Select Service you want</option>
        <option value="technical">Technical</option>
        <option value="electrical">Electrical</option>
        <option value="plumbing">Plumbing</option>
        <option value="carpentry">Carpentry</option>
        <option value="mechanic">Mechanic</option>
        <option value="painter">Painter</option>
      </select>
    </div>
  );
}
export default CustomAlert;


