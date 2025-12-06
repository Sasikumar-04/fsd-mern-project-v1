
import { Tabs, message } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const getUser = () => {
    const userdata = JSON.parse(localStorage.getItem('userData'));
    if (userdata) {
      setUser(userdata);
    }
  };

  const handleAllMarkRead = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8001/api/user/getallnotification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        const updatedUser = {
          ...user,
          notification: [],
          seennotification: [
            ...(user.seennotification || []),
            ...(user.notification || [])
          ]
        };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        message.success(res.data.message);
        setUser({ ...user, notification: [] });
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const handledeleteAllMark = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8001/api/user/deleteallnotification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        setUser({ ...user, seennotification: [] });
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h2 className="p-3 text-center">Notifications</h2>
      <Tabs>
        <Tabs.TabPane tab="New" key={0}>
          <div className="d-flex justify-content-end">
            <h4
              style={{ cursor: 'pointer' }}
              onClick={handleAllMarkRead}
              className="p-2"
            >
              Mark all as read
            </h4>
          </div>
          {user?.notification?.map((notificationMsg, index) => (
            <div
              key={index}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                notificationMsg.onClickPath &&
                navigate(notificationMsg.onClickPath)
              }
            >
              <div className="card-text">{notificationMsg.message}</div>
            </div>
          ))}
          {(!user || (user.notification || []).length === 0) && (
            <p className="text-muted text-center mt-3">
              No new notifications at the moment.
            </p>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="History" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              style={{ cursor: 'pointer' }}
              onClick={handledeleteAllMark}
              className="p-2"
            >
              Clear history
            </h4>
          </div>
          {user?.seennotification?.map((notificationMsg, index) => (
            <div
              key={index}
              style={{ cursor: 'pointer' }}
              className="card"
              onClick={() =>
                notificationMsg.onClickPath &&
                navigate(notificationMsg.onClickPath)
              }
            >
              <div className="card-text">{notificationMsg.message}</div>
            </div>
          ))}
          {(!user || (user.seennotification || []).length === 0) && (
            <p className="text-muted text-center mt-3">
              No older notifications to show.
            </p>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Notification;
