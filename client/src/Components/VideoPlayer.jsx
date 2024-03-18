import {React,useState,createContext,useContext} from 'react'
import { Grid,Box,Heading } from '@chakra-ui/react'


import {SocketContext } from '../Context'
const VideoPlayer = () => {
    const { name, callAccepted, myVideo, setName,userVideo, callEnded, stream, call } = useContext(SocketContext)
  return (
      <Grid justifyContent="center" templateColumns='repeat(2, 1fr)' mt="12">
        {"Current User"}
        {
             stream&&(
                <Box>
                    {console.log("Entered")}
                    <Grid colSpan={1}>
                        <Heading as="h5">
                            {name||'Name'}
                        </Heading>
                        <video playsInline muted ref={myVideo} autoPlay width="600" />
                            {/* <source src={myVideo} type="video/mp4"/> */}
                            {/* </video> */}
                    </Grid>
                </Box>
            )
        }
              {/* user's video */}
        {
            callAccepted && !callEnded && (
                <Box>
                    <Grid colSpan={1}>
                        <Heading as="h5">
                            {call.name || 'Name'}
                        </Heading>
                        <video playsInline ref={userVideo} autoPlay width="600" />
                    </Grid>
                </Box>
            )
        }        
      </Grid>
  )
}

export default VideoPlayer