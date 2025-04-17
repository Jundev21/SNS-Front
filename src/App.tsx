import styled from "styled-components";
import Header from "./components/header/Header";
import Body from "./pages/Body";
import {HashRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import WriteFeedBody from "./components/feed/WriteFeedBody";
import MyFeedBody from "./pages/MyFeedBody";
import DetailFeedBody from "./pages/DetailFeedBody";
import MyDetailFeedBody from "./pages/MyDetailFeedBody";
import NotificationBody from "./pages/NotificationBody";
import Mypage from "./components/body/Mypage";
import AuthLayout from "./components/router/AuthLayout";
import EditMyWriteFeedBody from "./pages/EditMyWriteFeedBody ";

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
