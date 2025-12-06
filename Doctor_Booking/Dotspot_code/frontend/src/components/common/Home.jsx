
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import p3 from '../../images/p3.webp';

const Home = () => {
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

      <div className="home-container">
        <div className="home-hero-text">
          <span className="home-pill">Smart appointment hub</span>
          <h1 className="home-title">
            Manage your clinic visits
            <br />
            with less waiting and more control.
          </h1>
          <p className="home-subtitle">
            CareSync Portal lets patients book appointments online and helps doctors keep
            their day organized. One simple interface for confirmations, documents, and
            follow-up.
          </p>
          <div className="home-cta-group">
            <Button className="btn-primary-hero">
              <Link to={'/login'}>Book an appointment</Link>
            </Button>
            <button className="btn-outline-hero">
              <Link to={'/register'}>Join as a patient or doctor</Link>
            </button>
          </div>
          <p className="home-secondary-text">
            No phone calls, no paper slips – just your schedule, synced.
          </p>
        </div>

        <div className="home-image-wrapper">
          <img alt="Scheduling illustration" src={p3} />
        </div>
      </div>

      <div className="home-about">
        <h1>Why CareSync Portal?</h1>
        <p>
          CareSync Portal is a simple scheduling layer between patients and healthcare
          providers. Patients can browse available doctors, upload supporting documents,
          and confirm a visit in a few clicks. Doctors see a clean list of upcoming
          appointments, requests awaiting approval, and attached files – all in one place.
          <br />
          <br />
          Instead of juggling phone calls or scattered messages, both sides work from a
          single timeline. Automated reminders and clear status updates reduce missed
          visits and confusion. Whether you run a small clinic or just want a better way
          to keep track of personal check-ups, CareSync Portal keeps appointments clear,
          structured, and easy to follow.
        </p>
      </div>
    </>
  );
};

export default Home;
