import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket = io("http://localhost:3001");

const ContextProvider = ({ children }) => {
  const [callAccept, setCallAccept] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [call, setCall] = useState({});
  const [stream, setStream] = useState(null);
  const [name, setName] = useState("");
  const userVideo = useRef();
  const connectionRef = useRef();
  const [me, setMe] = useState("");
  const myVideo = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
          // console.log(currentStream);
          setStream(currentStream);
        if (myVideo.current) 
        {
            myVideo.current.srcObject = currentStream;
        }
        // console.log("stream:" ,stream);
        // console.log( myVideo);
      });

    socket.on("me", (id) => {

      setMe(id);
      // console.log(id);
    })
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  // useEffect(()=>{
  //   console.log(stream,"my stream")
  // },[stream])

  const answerCall = () => {
    setCallAccept(true);
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
        if(userVideo.current)
        {

            userVideo.current.srcObject = currentStream;
        }
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccept(true);
      peer.signal(signal);
    });
    // peer.signal(call.signal);
    connectionRef.current = peer;
  };
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };
  return (
    <SocketContext.Provider
      value={
        {call,
        callAccept,
        myVideo,
        stream,
        name,
        setName,
        callEnded,
        userVideo,
        connectionRef,
        me,
        callUser,
        leaveCall,
        answerCall
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
