
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import p2 from '../../images/p2.png';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio
} from 'mdb-react-ui-kit';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    type: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8001/api/user/register', user);
      if (res.data.success) {
        message.success('Account created successfully');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Unable to register. Please try again.');
    }
  };

  return (
    <>
      <Navbar expand="lg" className="home-navbar">
        <Container fluid>
          <Navbar.Brand>
            <Link to={'/'}>CareSync Portal</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll />
            <Nav>
              <Link to={'/'}>Overview</Link>
              <Link to={'/login'}>Sign in</Link>
              <Link to={'/register'}>Create account</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MDBContainer className="my-5">
        <MDBCard style={{ border: 'none' }}>
          <MDBRow style={{ background: '#edf2ff' }} className="g-0 p-3">
            <MDBCol md="6">
              <MDBCardBody className="d-flex mx-3 flex-column">
                <div className="d-flex flex-row mb-2">
                  <span className="h1 fw-bold">Create your CareSync profile</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                  Register as a patient to book appointments or as an admin/clinic coordinator to
                  manage doctor profiles and visits.
                </p>

                <div className="p-2">
                  <Form onSubmit={handleSubmit}>
                    <label className="my-1 form-label" htmlFor="fullNameInput">
                      Full name
                    </label>
                    <MDBInput
                      id="fullNameInput"
                      style={{ height: '40px' }}
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      type="text"
                      size="sm"
                    />

                    <label className="my-1 form-label" htmlFor="emailInput">
                      Email
                    </label>
                    <MDBInput
                      id="emailInput"
                      style={{ height: '40px' }}
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      type="email"
                      size="sm"
                    />

                    <label className="my-1 form-label" htmlFor="passwordInput">
                      Password
                    </label>
                    <MDBInput
                      id="passwordInput"
                      style={{ height: '40px' }}
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      type="password"
                      size="sm"
                    />

                    <label className="my-1 form-label" htmlFor="phoneInput">
                      Phone number
                    </label>
                    <MDBInput
                      id="phoneInput"
                      style={{ height: '40px' }}
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      type="tel"
                      size="sm"
                    />

                    <Container className="my-3">
                      <p style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>Register as</p>
                      <MDBRadio
                        name="type"
                        id="inlineRadio1"
                        checked={user.type === 'admin'}
                        value="admin"
                        onChange={handleChange}
                        label="Administrator / Clinic staff"
                        inline
                      />
                      <MDBRadio
                        name="type"
                        id="inlineRadio2"
                        checked={user.type === 'user'}
                        value="user"
                        onChange={handleChange}
                        label="Patient / Doctor"
                        inline
                      />
                    </Container>

                    <Button
                      style={{ marginTop: '20px' }}
                      className="mb-4 bg-dark"
                      variant="dark"
                      size="lg"
                      type="submit"
                    >
                      Create account
                    </Button>
                  </Form>
                  <p className="mb-4" style={{ color: '#4b5563', fontSize: '0.9rem' }}>
                    Already have an account?{' '}
                    <Link to={'/login'} style={{ color: '#2563eb' }}>
                      Sign in
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCol>

            <MDBCol md="6">
              <MDBCardImage
                style={{ mixBlendMode: 'darken' }}
                src={p2}
                alt="register illustration"
                className="rounded-start w-100"
              />
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Register;
