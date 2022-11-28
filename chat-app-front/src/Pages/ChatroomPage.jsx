import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// import io from "socket.io-client"

const ChatroomPage = ({ socket }) => {
   const {id} =useParams() ;
   const chatroomId = id;

   useEffect(() => {
    console.log(socket)
   } , [])

  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");


  const sendMessage = () => {
    console.log('socket')
    console.log(socket)
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });
console.log(socket)
      messageRef.current.value = "";
    }
  };


  React.useEffect(() => {
    const token = localStorage.getItem("CC_Tocken");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }

    
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages)
      });
  
  }, [messages]);


  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });
    }

    return () => {

      if (socket) {
        socket.emit("LeaveRoom", {
          chatroomId,
        });
      }
    };

  }, []);

  return (


      <div className="chatroomPage">
        <div className="chatroomSection">
          <div className="cardHeader">Chat</div>
          <div className="chatroomContent">
            {messages.map((message, i) => (
              <div key={i} className="message">
                <span
                  className={
                    userId === message.userId ? "ownMessage" : "otherMessage"
                  }
                >
                  {message.name}:
                </span>{" "}
                {message.message}
              </div>
            ))}
          </div>
          <div className="chatroomActions">
            <div>
              <input
                type="text"
                name="message"
                placeholder="Say something!"
                ref={messageRef}
              />
            </div>
            <div>
              <button className="join" onClick={sendMessage} >
              
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ChatroomPage;



// return <div className="chatroomPage">
//   <div className="chatroomSection">
//     <div className="cardHeader">Chatroom Name</div>
//     <div className="chatroomContent">
//       {messages.map((message, i) => (
//         <div key={i}{chatroomId} className="message">
//           <span className="otherMessage">{message.name}:</span>{" "}
//           {message.message}
//         </div>
//       ))}

//     </div>

//   </div>
//   <div className="chatroomActions">
//     <div>
//       <input type="text" name="message" placeholder="Placez un mot" ref={messageRef} />
//     </div>
//     <div>
//       <button className="join" onClick={sendMessage}>Envoyer</button>
//     </div>
//   </div>

// </div>;

// };