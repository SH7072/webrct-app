import logo from "./logo.svg";
import "./App.css";
import {Box, Heading,Container} from "@chakra-ui/react";
import VideoPlayer from "./Components/VideoPlayer";
import Notifications from "./Components/Notifications";
import Options from "./Components/Options";
import {SocketContext } from './Context'

import { useContext } from "react";
function App() {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext)
  return (
    <>
    <Box>
      {/* {console.log(name,"heeh",stream)} */}
      <Container  maxW="1200px" mt="8">
        <Heading as="h2" size="2x1">Video Chat App</Heading>
        <VideoPlayer/>
        <Options/>
        <Notifications/>
      </Container>
    </Box>
      
    </>
  );
}

export default App;
