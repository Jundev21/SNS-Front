import styled from "styled-components";
import Logo from "../../img/logo.jpg";
import { useAppDispatch } from "../../redux/hooks";
import { setSearchWordTK } from "../../redux/dataSlice";

function HeaderLogo() {
  const dispatch = useAppDispatch();

  const handleInitLogo = () => {
    let getSessionData = sessionStorage.getItem("SearchHistory");

    if (!getSessionData) {
      sessionStorage.setItem("SearchHistory", JSON.stringify([""]));
    } else {
      let historyArr: Array<string> = JSON.parse(getSessionData);
      historyArr.unshift("");
      let newData = new Set(historyArr);
      let makeArr = [...newData];
      sessionStorage.setItem("SearchHistory", JSON.stringify(makeArr));
    }
    dispatch(setSearchWordTK(""));
  };

  return (
    <>
      <LogoContainer src={Logo} onClick={() => handleInitLogo()} />
    </>
  );
}

export default HeaderLogo;

const LogoContainer = styled.img`
  width: 180px;
  cursor: pointer;
`;
