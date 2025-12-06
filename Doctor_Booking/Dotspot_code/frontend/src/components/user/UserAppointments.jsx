
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

const UserAppointments = () => {
  const [userid, setUserId] = useState();
  const [type, setType] = useState(false); 
  const [userAppointments, setUserAppointments] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      const { _id, isdoctor } = user;
      setUserId(_id);
      setType(isdoctor);
    } else {
      alert('No user to show');
    }
  };

  const getUserAppointment = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8001/api/user/getuserappointments',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          params: {
            userId: userid
          }
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        setUserAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error('Unable to load your appointments');
    }
  };

  const getDoctorAppointment = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8001/api/doctor/getdoctorappointments',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          params: {
            userId: userid
          }
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        setDoctorAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error('Unable to load appointment requests');
    }
  };

  const handleStatus = async (userid, appointmentId, status) => {
    try {
      const res = await axios.post(
        'http://localhost:8001/api/doctor/handlestatus',
        {
          userid,
          appointmentId,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getDoctorAppointment();
        getUserAppointment();
      }
    } catch (error) {
      console.log(error);
      message.error('Unable to update status');
    }
  };

  useEffect(() => {
    getUser();
  }, [userid]);

  useEffect(() => {
    if (type === true) {
      getDoctorAppointment();
    } else {
      getUserAppointment();
    }
    
  }, [type]);

  const handleDownload = async (url, appointId) => {
    try {
      const res = await axios.get(
        'http://localhost:8001/api/doctor/getdocumentdownload',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          params: { appointId },
          responseType: 'blob'
        }
      );
      if (res.data) {
        const fileUrl = window.URL.createObjectURL(
          new Blob([res.data], { type: 'application/pdf' })
        );
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.setAttribute('href', fileUrl);

        const fileName = url.split('/').pop();
        downloadLink.setAttribute('download', fileName);
        downloadLink.style.display = 'none';
        downloadLink.click();
      } else {
        message.error('No file available to download');
      }
    } catch (error) {
      console.log(error);
      message.error('Download failed');
    }
  };

  return (
    <div>
      <h2 className="p-3 text-center">
        {type === true ? 'Appointment requests' : 'My appointments'}
      </h2>
      <Container>
        {type === true ? (
          
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Patient name</th>
                <th>Scheduled time</th>
                <th>Phone</th>
                <th>Attached file</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctorAppointments.length > 0 ? (
                doctorAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.userInfo.fullName}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.userInfo.phone}</td>
                    <td>
                      {appointment.document ? (
                        <Button
                          variant="link"
                          onClick={() =>
                            handleDownload(
                              appointment.document.path,
                              appointment._id
                            )
                          }
                        >
                          {appointment.document.filename}
                        </Button>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td>{appointment.status}</td>
                    <td>
                      {appointment.status === 'approved' ? (
                        <span className="text-success">Approved</span>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatus(
                              appointment.userInfo._id,
                              appointment._id,
                              'approved'
                            )
                          }
                        >
                          Approve
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <Alert variant="info" className="mb-0">
                      <Alert.Heading>No appointment requests</Alert.Heading>
                      <p className="mb-0">
                        When patients request a time slot with you, it will show up here.
                      </p>
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        ) : (
        
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Scheduled time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userAppointments.length > 0 ? (
                userAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.docName}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>
                    <Alert variant="info" className="mb-0">
                      <Alert.Heading>No bookings yet</Alert.Heading>
                      <p className="mb-0">
                        When you request or confirm a visit, it will appear in this list.
                      </p>
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default UserAppointments;
