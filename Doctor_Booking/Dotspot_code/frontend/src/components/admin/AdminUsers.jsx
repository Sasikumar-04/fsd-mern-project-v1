
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8001/api/admin/getallusers',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h4 className="p-3 text-center">User directory</h4>

      <Container>
        <Table className="my-3" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Full name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Doctor access</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.type}</td>
                  <td>{user.isdoctor === true ? 'Doctor' : 'Patient'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <Alert variant="info" className="mb-0">
                    <Alert.Heading>No users available</Alert.Heading>
                    <p className="mb-0">
                      Once people start signing up, you&apos;ll see them listed here.
                    </p>
                  </Alert>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminUsers;
