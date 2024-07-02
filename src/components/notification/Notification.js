import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

function Notification() {
  const [alarms, setAlarms] = useState([]);
  const [newAlarms, setNewAlarms] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAlarm();
    const eventSource = new EventSourcePolyfill("http://localhost:8080/api/v1/users/notification/subscribe", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      heartbeatTimeout: 86400000,
      withCredentials: true,
      "Content-Type": "text/event-stream",
    });

    eventSource.onmessage = (event) => {
      console.log(event.data);
    };

    eventSource.addEventListener("open", function (event) {
      console.log("connection is connected from client");
    });

    eventSource.addEventListener("alarm", function (event) {
      console.log("새로운알람 받았습니다", event.alarms);
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

  const handleGetAlarm = () => {
    axios({
      url: "/api/v1/users/notification",
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        setAlarms(res.data.responseBody);
        // setTotalPage(res.data.result.totalPages);
      })
      .catch((error) => {
        navigate("/");
      });
  };

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
  top: 0px;
  right: -4px;
  background-color: red;
  color: white;
  font-size: 16px;
  padding: 6px;
  border-radius: 100%;
`;
