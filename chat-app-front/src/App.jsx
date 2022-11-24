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

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token.length && !socket) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("deconnecté", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "socket est deconnecté!");
      });

      newSocket.on("Connecté", () => {
        makeToast("succes!", "socket est connecté!");
      });
      setSocket(newSocket);
    }

  };

  React.useEffect(() => {
    setSocket();

  }, []);



  return (
    <Routes>
      <Route path="/" element={<IndexPage />} exact />
      <Route path="/login" element= {<LoginPage />} exact />
      <Route path="/register" element={<RegisterPage />} exact />
      <Route path="/dashboard" element= {<DashboardPage />} exact />
      <Route path="/chatroom/:id" element = {<ChatroomPage />}  exact />
    </Routes>
  );
};

export default App;