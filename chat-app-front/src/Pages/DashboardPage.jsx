import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const DashboardPage = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  
  const getChatrooms = () => {
    axios
      .get("http://localhost:8001/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        //console.log(response.data)
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };



  React.useEffect(() => {
    getChatrooms();
  }, []);

  return (
    <div className='card'>
      <div className='cardHeader'>Chatroom</div>
      <div className='cardBody'>
        <div className='inputGroup'>
          <label htmlFor='chatroomName'>Chatromm Name</label>
          <input type="chatroomName" name="chatroomName" id="email" placeholder='ChatterBox' />
        </div>
      </div>
      <button>Create Chatroom</button>

      <div className="chatrooms">
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <div>{chatroom.name}</div>
            <Link to={"/chatroom/" + chatroom._id}>
              <div className='join'>Join</div>
            </Link>
          </div>
        ))}
      </div>
    </div>


  );
};

export default DashboardPage
