import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://a1a4ca0d581574a7ca9d88d7d7f949c5-904221654.us-east-1.elb.amazonaws.com/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("Feedback submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Failed to submit feedback.");
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <br />
        <div>
          <label>Email: </label>
          <input name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <br />
        <div>
          <label>Message: </label>
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default App;
