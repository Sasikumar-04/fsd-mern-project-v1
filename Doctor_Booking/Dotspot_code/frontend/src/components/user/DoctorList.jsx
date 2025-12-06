
import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

const DoctorList = ({ userDoctorId, doctor, userdata }) => {
  const [dateTime, setDateTime] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [show, setShow] = useState(false);

  const currentDate = new Date().toISOString().slice(0, 16);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleDocumentChange = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const formattedDateTime = dateTime.replace('T', ' ');
      const formData = new FormData();
      formData.append('image', documentFile);
      formData.append('date', formattedDateTime);
      formData.append('userId', userDoctorId);
      formData.append('doctorId', doctor._id);
      formData.append('userInfo', JSON.stringify(userdata));
      formData.append('doctorInfo', JSON.stringify(doctor));

      const res = await axios.post(
        'http://localhost:8001/api/user/getappointment',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        handleClose();
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      message.error('Unable to place request');
    }
  };

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{doctor.fullName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {doctor.specialization}
          </Card.Subtitle>
          <Card.Text>
            <p>
              Phone:&nbsp;<b>{doctor.phone}</b>
            </p>
            <p>
              Address:&nbsp;<b>{doctor.address}</b>
            </p>
            <p>
              Experience:&nbsp;<b>{doctor.experience} years</b>
            </p>
            <p>
              Consultation fee:&nbsp;<b>{doctor.fees}</b>
            </p>
            <p>
              Timing:&nbsp;
              <b>
                {doctor.timings[0]} – {doctor.timings[1]}
              </b>
            </p>
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Request appointment
          </Button>

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Request a visit</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleBook}>
              <Modal.Body>
                <strong>
                  <u>Doctor</u>
                </strong>
                <br />
                {doctor.fullName}
                <hr />
                <span>
                  Specialization:&nbsp;<b>{doctor.specialization}</b>
                </span>
                <hr />
                <Row className="mb-3">
                  <Col md={{ span: 10, offset: 1 }}>
                    <Form.Group className="mb-3">
                      <Form.Label>Preferred date & time</Form.Label>
                      <Form.Control
                        name="date"
                        type="datetime-local"
                        size="sm"
                        min={currentDate}
                        value={dateTime}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Upload documents (optional)</Form.Label>
                      <Form.Control
                        accept="image/*"
                        type="file"
                        size="sm"
                        onChange={handleDocumentChange}
                      />
                      <Form.Text muted>
                        You can attach reports, prescriptions or other relevant images.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Send request
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Card.Body>
      </Card>
    </>
  );
};

export default DoctorList;
