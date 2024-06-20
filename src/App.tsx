import styled from "styled-components";
import Header from "./components/headerComponents/Header";
import Body from "./components/bodyComponents/Body";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import WriteFeedBody from "./components/bodyComponents/WriteFeedBody";
import MyFeedBody from "./components/bodyComponents/MyFeedBody";
import DetailFeedBody from "./components/bodyComponents/DetailFeedBody";
import MyDetailFeedBody from "./components/bodyComponents/MyDetailFeedBody";
import EditMyWriteFeedBody from "./components/bodyComponents/EditMyWriteFeedBody ";
import NotificationBody from "./components/bodyComponents/NotificationBody";
import Mypage from "./components/bodyComponents/Mypage";
import AuthLayout from "./components/AuthLayout";
import Login from "./components/login/Login";

function App() {
  return (
    <AppContainer>
      <HashRouter>
        <Header />
        <Routes>
          <Route>
            <Route path="/" element={<Body />}></Route>
            <Route path="/detail/feed" element={<DetailFeedBody />}></Route>
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/my/feed" element={<MyFeedBody />}></Route>
            <Route path="/write/feed" element={<WriteFeedBody />}></Route>

            <Route path="/detail/my/feed" element={<MyDetailFeedBody />}></Route>
            <Route path="/edit/my/feed" element={<EditMyWriteFeedBody />}></Route>
            <Route path="/detail/my/notification" element={<NotificationBody />}></Route>
            <Route path="/my/info" element={<Mypage />}></Route>
          </Route>
        </Routes>
      </HashRouter>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div``;
