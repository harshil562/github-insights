import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import MockAdapter from 'axios-mock-adapter';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  max-width: 550px;
  margin: auto;
  margin-top: 100px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const Label = styled.label`
  margin: 10px 0 5px;
  padding-left: 10px; /* Added left padding */
  display: flex;
  flex-direction: column;
  font-weight: bold; /* Make labels more prominent */
`;

const Input = styled.input`
  margin-bottom: 20px;
  margin-top: 6px;
  padding: 8px; /* Reduced padding */
  font-size: 14px; /* Reduced font size */
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 400px;
  width: calc(100% - 20px); /* Full width minus padding */
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 40px;
  font-size: 16px;
  background-color: #007bff; /* Blue color as per industry standards */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-left: 8px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Configure = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [orgName, setOrgName] = useState('');
  const [repoName, setRepoName] = useState('');
  const [integrationType, setIntegrationType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.integration) {
      setIntegrationType(location.state.integration);
    }
  }, [location.state]);

  useEffect(() => {
    // This sets up the mock adapter
    const mock = new MockAdapter(axios);
    mock.onPost('https://2628-103-138-232-20.ngrok-free.app/integration').reply(200, {
      message: 'Integration has been created successfully!'
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: "SCM integration",
      token: token,
      tenant_id: "test5",
      integration_type: integrationType.toUpperCase(),
      metadata: {
        owner: orgName,
        repo_id: repoName
      }
    };

    try {
      await axios.post('https://2628-103-138-232-20.ngrok-free.app/integration', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Simulate a delay before showing the success message
      setTimeout(() => {
        toast.success('Integration has been created successfully!');
        setLoading(false);
      }, 2000); // 2-second delay
    } catch (error) {
      console.error('Error submitting form', error);
      toast.error('Failed to integrate. Please try again.');
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Integrate {integrationType.charAt(0).toUpperCase() + integrationType.slice(1)}</h2>
        <Label style={{ paddingBottom: 2 }}>
          Name
          <Input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Label>
        <Label>
          PAT Token
          <Input required type="password" value={token} onChange={(e) => setToken(e.target.value)} />
        </Label>
        <Label>
          Org Name
          <Input required type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
        </Label>
        <Label>
          Repo Name
          <Input required type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
        </Label>
        <Button type="submit" disabled={loading}>
          Submit
          {loading && <Spinner />}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Configure;
