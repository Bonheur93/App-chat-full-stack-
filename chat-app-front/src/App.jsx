import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import IndexPage from "./Pages/IndexPage";
import ChatroomPage from "./Pages/ChatroomPage";
import io from "socket.io-client";
import makeToast from "./Toaster";




function App() {
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
   
      const newSocket = io("http://localhost:8001", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      console.log(newSocket)

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "socket est deconnecté!");
      });

      newSocket.on("connect", () => {
        makeToast("succes!", "socket est connecté!");
      });
      setSocket(newSocket);
    
  }, []);



  return (
    <Routes>
      <Route path="/" element={<IndexPage />} exact />
      <Route path="/login" element= {<LoginPage />} exact />
      <Route path="/register" element={<RegisterPage />} exact />
      <Route path="/dashboard" element= {<DashboardPage />} exact />
      <Route path="/chatroom/:id" element = {<ChatroomPage socket={socket} />}  exact />
    </Routes>
  );
};

export default App;