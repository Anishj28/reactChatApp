
import socketIO from "socket.io-client"
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/chat/Chat";



function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route exact path="/" element={<Join></Join>} />
            <Route path="/chat" element={<Chat></Chat>} ></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
