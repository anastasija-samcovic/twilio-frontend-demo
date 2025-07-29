import { ReactElement, useState } from "react";
import AppContainer from "./AppContainer";
import { Box } from "@twilio-paste/box";
import { getToken } from "../api";
import { bindActionCreators } from "redux";
import { actionCreators, AppState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import ModalInputField from "./modals/ModalInputField";
import { Button } from "@twilio-paste/core";

function App(): ReactElement {
  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators, dispatch);
  const token = useSelector((state: AppState) => state.token);
  const [enteredToken, setEnteredToken] = useState("");

  const loginWithToken = () => {
    getToken(enteredToken)
      .then((token) => {
        console.log(token);
        login(token);
      })
      .catch(() => {
        console.log("nije dobro");
      });
  };

  return (
    <Box
      style={{
        marginTop: 50,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {token ? (
        <AppContainer />
      ) : (
        <Box>
          <ModalInputField
            label="Identity"
            placeholder="Enter identity"
            isFocused={true}
            onChange={(entered: string) => {
              setEnteredToken(entered);
            }}
            onBlur={() => {
              console.log("lalalla");
            }}
            id="id"
            input={enteredToken}
          />
          <Box marginTop="space40">
            <Button variant="secondary" onClick={loginWithToken}>
              Log in
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App;
