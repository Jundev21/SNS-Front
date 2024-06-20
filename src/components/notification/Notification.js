import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Notification() {
  const [alarms, setAlarms] = useState([]);
  const [newAlarms, setNewAlarms] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAlarm();

    const eventSource = new EventSource("/api/v1/users/notification/subscribe?token=" + localStorage.getItem("token"), { withCredentials: true });

    eventSource.addEventListener("open", function (event) {
      console.log("connection is connected");
    });

    eventSource.addEventListener("alarm", function (event) {
      setNewAlarms(1);
      handleGetAlarm();
    });

    eventSource.addEventListener("error", function (event) {
      if (event.target.readyState === EventSource.CLOSED) {
        console.log("eventsource closed (" + event.target.readyState + ")");
      }
      eventSource.close();
    });

    return () => {
      eventSource.close();
      console.log("connection is disconnected");
    };
  }, []);

  const handleGetAlarm = useCallback(() => {
    axios({
      url: "/api/v1/users/notification",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setAlarms(res.data.responseBody);
        // setTotalPage(res.data.result.totalPages);
      })
      .catch((error) => {
        console.log(error);
        // navigate('/authentication/sign-in');
      });
  }, []);

  const HandleNotification = () => {
    setNewAlarms(0);
    navigate("/detail/my/notification", { state: alarms });
  };

  return (
    <NotiParent>
      <div className="bi bi-bell-fill fs-3" onClick={HandleNotification}></div>
      {newAlarms !== 0 && <NotiChild />}
    </NotiParent>
  );
}

export default Notification;

const NotiParent = styled.span`
  display: flex;
  align-items: center;
  position: relative;
  color: #807979;
  cursor: pointer;
`;

const NotiChild = styled.span`
  position: absolute;
  top: -3px;
  right: -12px;
  background-color: red;
  color: white;
  font-size: 16px;
  padding: 8px 8px;
  border-radius: 100%;
`;
