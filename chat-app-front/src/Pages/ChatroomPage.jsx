import React from "react";

// import io from "socket.io-client"

const ChatroomPage = ({ match, socket }) => {
  // const chatroomId = match.params._id;
  // const socket = io("http://localhost:8000", {
  //   query: {
  //     token: localStorage.getItem("CC_Token"),
  //   },
  // });


  return <div className="chatroomPage">
    <div className="chatroomSection">
      <div className="cardHeader">Chatroom Name</div>
      <div className="chatroomContent">
        <span className="otherMessage">Bon:</span>Salut!!
      </div>
      <div className="chatroomContent">
        <span className="ownMessage">Bonheur:</span>Salut ça va?!!
      </div>
    </div>
    <div className="chatroomActions">
      <div>
        <input type="text" name="message" placeholder="Placez un mot" />
      </div>
      <div>
        <button className="join">Envoyer</button>
      </div>
    </div>

  </div>;

};
export default ChatroomPage;
