import React, { useState } from 'react';
import axios from 'axios';
import "./ForgotPassword.css"
import { API_URL } from '../../store/apiurl';
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

 
const URL = `${API_URL}/api/v1/auth/send-reset-password-link`;
const ForgotPassword = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const home = () =>{
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');   
    setMessage('');

    try {
      const response = await axios.post(

        URL,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to send reset link. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="password-reset-container">
      <h2>Reset Password</h2>
      <p>Enter your email address to receive a password reset link</p>
      
      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
         <Button
                  variant="outline-danger"
                  className="w-100 logout-btn"
                  size="sm"
                  onClick={home}
                >
                 Return Home
                </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;