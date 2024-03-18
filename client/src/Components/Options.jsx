import { useContext, useState } from "react";
import { SocketContext } from "../Context";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Box,
  Heading,
  Grid,
  Button,
  Input,
  FormLabel,
  Container,
  FormControl,
} from "@chakra-ui/react";
import { BiClipboard, BiPhoneCall, BiPhoneOff } from "react-icons/bi";
const Options = () => {
  const {
    me,
    name,
    setName,
    callAccepted,
    callEnded,
    leaveCall,
    callUser,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  return (
    <>
      <Container maxW="1200px" m="35px 0" p="0">
        <Box p="10px" border="2px" borderColor="black" borderStyle="solid">
          <FormControl
            display="flex"
            flexDirection="column"
            noValidate
            aria-autocomplete="none"
          >
            <Grid templateColumns="repeat(2, 1fr)" mt="12">
              <Grid colSpan={1} p="6">
                <Heading as="h6"> Account Info </Heading>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  width="100%"
                />
                <CopyToClipboard text={me} mt="20">
                  <Button
                    leftIcon={<BiClipboard />}
                    colorScheme="teal"
                    variant="solid"
                    >
                    {/* {console.log(me)} */}
                    Copy ID
                  </Button>
                </CopyToClipboard>
              </Grid>
              <Grid colSpan={1} p="6">
                <Heading as="h6"> Make a Call </Heading>
                <FormLabel> User id to call </FormLabel>
                <Input
                  type="text"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  width="100%"
                />
                {callAccepted && !callEnded ? (
                  <Button
                    leftIcon={<BiPhoneOff />}
                    onClick={leaveCall}
                    mt="20"
                    colorScheme="teal"
                    variant="info"
                  >
                    Hang up
                  </Button>
                ) : (
                  <Button
                    leftIcon={<BiPhoneCall />}
                    onClick={() => callUser(idToCall)}
                    mt="20"
                    colorScheme="teal"
                    variant="solid"
                  >
                    Call
                  </Button>
                )}
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default Options;
