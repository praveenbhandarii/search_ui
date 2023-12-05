import React, { useState } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const isFormValid =
    formErrors.name === "" &&
    formErrors.email === "" &&
    formErrors.phone === "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation rules
    if (name === "name") {
      setFormErrors({
        ...formErrors,
        name: value.trim() === "" ? "Name is required" : "",
      });
    } else if (name === "email") {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      setFormErrors({
        ...formErrors,
        email: !emailPattern.test(value) ? "Invalid email address" : "",
      });
    } else if (name === "phone") {
      // Phone validation example: Check if it's a valid US phone number
      const phonePattern = /^\d{10}$/;
      setFormErrors({
        ...formErrors,
        phone: !phonePattern.test(value) ? "Invalid phone number" : "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data, e.g., submit it to an API
    console.log("Form data submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {formErrors.name && <span className="error">{formErrors.name}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {formErrors.email && <span className="error">{formErrors.email}</span>}
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {formErrors.phone && <span className="error">{formErrors.phone}</span>}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
