import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ResetPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const FormContainer = styled.form`
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: rgb(140, 103, 0);
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.error ? '#ff4444' : '#ddd'};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: rgb(140, 103, 0);
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: rgb(140, 103, 0);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;

  &:hover {
    background-color: rgb(120, 88, 0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.p`
  color: #00C851;
  text-align: center;
  margin-bottom: 1rem;
`;

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [errors, setErrors] = useState({ confirmPassword: '' });

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return false;
    }
    if (newPassword.length < 8) {
      setErrors({ confirmPassword: 'Password must be at least 8 characters' });
      return false;
    }
    setErrors({ confirmPassword: '' });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) return;

    setIsSubmitting(true);
    
    try {
      const res = await fetch(`http://localhost:5008/api/v1/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();
      setMessage({ text: data.message, type: 'success' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResetPasswordContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Reset Your Password</Title>
        
        {message.text && (
          <SuccessMessage style={{ color: message.type === 'success' ? '#00C851' : '#ff4444' }}>
            {message.text}
          </SuccessMessage>
        )}

        <InputField
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength="8"
        />

        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={validatePasswords}
          required
          error={!!errors.confirmPassword}
        />

        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}

        <SubmitButton type="submit" disabled={isSubmitting || !!errors.confirmPassword}>
          {isSubmitting ? 'Processing...' : 'Reset Password'}
        </SubmitButton>
      </FormContainer>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;