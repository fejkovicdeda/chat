import { useEffect, useState } from "react";


const apiKey = "b0e9eb0c6edda46d48658d14575d178dd55f8fb4b3323e2b";


function App() {

  useEffect(() => {
    return () => setUserState("not_logged_in");
  }, []);

  const login = async () => {
    const userResult = await registerSession(username, displayname);
    console.log(userResult)
    if (userResult) {
      setUserState("not_joined");
    }
  };

  const [username, setUsername] = useState(null);
  const [displayname, setDisplayname] = useState(null);
  const [userState, setUserState] = useState("not_logged_in");
  return (
    <div className="App">
      {userState === "not_logged_in" ? (
        <div>
          <button onClick={login}>Login/Create user</button>
          <form>
            <div>
              <label>username:</label>
              <input onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label>displayname:</label>
              <input onChange={(e) => setDisplayname(e.target.value)} />
            </div>
          </form>
        </div>
      ) : userState === "not_joined" ? (
        <ChannelList userState={userState} setUserState={setUserState}/>
      ): (
        <ChannelView />
      )}
    </div>
  );
}

function ChannelView({userState,setUserState}) {
  const [channelState, setChannelState] = useState("not_joined");

  useEffect(() => {
   
    return () => setUserState("not_joined");
  }, [setUserState]);

  const leaveChannelRoom = async () => {
    await leaveChannel({
      channelId: "global_channel",
    });
  };

  if (userState !== "not_joined") {
    return (
      <>
        <div>Channel joined</div>
        <MessageComponent />
        <button onClick={leaveChannelRoom}>Leave channel</button>
      </>
    );
  }

  return <div>
      <div>Join a channel</div>
      <ChannelList setUserState={setUserState}/>
    </div>;
}

function ChannelList({setUserState}){
  const [channelList, setChannelList] = useState(null);

  useEffect(() => {
    fetchChannelList();
  }, [])

  const joinChannelId = async (channelId) => {
    await joinChannel(channelId);
    setUserState("has_joined");
  }

  async function fetchChannelList(){
    const channelListResult = await queryChannels();
    if(channelListResult.models){
      setChannelList(channelListResult.models);
    }
  }

  if(!channelList){
    return <div>No channels</div>
  }

  return channelList.map(channelEntry => {
    return <div><span>{channelEntry.channelId}</span><button onClick={() => joinChannelId(channelEntry.channelId)}>Join</button></div>
  })
}

function MessageComponent() {
  const [textMessage, setTextMessage] = useState(null);

  const sendTextMessage = async () => {
    await sendMessage("global_channel", textMessage);
  };

  return (
    <div>
      <div>
        <input onChange={(e) => setTextMessage(e.target.value)} />
        <button onClick={sendTextMessage}>Send</button>
      </div>
      <MessageList />
    </div>
  );
}

function MessageList() {
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    const messagesCollection = queryMessages("global_channel");
    messagesCollection.on("dataUpdated", (e) => setMessageList(e));
    queryChannels();
    return () => {
      messagesCollection?.dispose();
      setMessageList([]);
    };
  }, []);

  return messageList?.map((msg) => (
    <div>
      <span>{msg.userId}</span>:<span>{msg.data.text}</span>
    </div>
  ));
}

export default App;
