import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

function NotificationBody() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const HandleNotification = (targetBoard) => {
    navigate("/detail/feed", { state: targetBoard });
  };

  return (
    <BodyContainer>
      <BodyWrapper>
        {state === undefined || (state.senderInfo.countVisited !== 1 && state.notificationType.length === 0) ? (
          <NotificationContainer>
            <NoNotificationContent>
              <Message>새로운 알림이 없습니다.</Message>
            </NoNotificationContent>
          </NotificationContainer>
        ) : (
          <NotificationContainer>
            {state.senderInfo.countVisited === 1 && (
              <NotificationContent>
                <Message>{state.senderInfo.userName} 님 환영합니다.</Message>
              </NotificationContent>
            )}
            {state.notificationType.map((el, idx) => {
              return (
                <NotificationContent key={idx} onClick={() => HandleNotification(el.targetBoard)}>
                  <Message>
                    {el.sender} 님이 {el.message}
                  </Message>
                  <MessageDate>{dayjs(el.notificationTime).format("YYYY.MM.DD HH:mm")}</MessageDate>
                </NotificationContent>
              );
            })}
          </NotificationContainer>
        )}
      </BodyWrapper>
    </BodyContainer>
  );
}

export default NotificationBody;

const BodyContainer = styled.div`
  width: 100%;
  height: 60vh;
`;

const BodyWrapper = styled.div`
  height: 100%;
  width: 900px;
  margin: auto;
  padding: 30px 0;
`;

const NotificationContainer = styled.ul`
  padding: 20px 0;
`;

const NotificationContent = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 50px;
  border-bottom: 1px solid rgb(238, 238, 238);

  &:first-child {
    border-top: 1px solid rgb(238, 238, 238);
  }
`;

const NoNotificationContent = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 50px;
  border-bottom: 1px solid rgb(238, 238, 238);

  &:first-child {
    border-top: 1px solid rgb(238, 238, 238);
  }
`;

const Message = styled.div`
  cursor: pointer;
`;

const MessageDate = styled.div``;
