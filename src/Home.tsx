import React, {useState, useRef} from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import Collaborator from './components/Collaborator';
import Output from './components/Output';
import { useRoomContext } from './context/RoomContext';
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from 'react-router-dom';

function App() {
    const [darkMode, setDarkMode] = useState(true);
    const editorRef = useRef(null);
    const { state } = useLocation();
    const { rooms } = useRoomContext();
    const { room } = state;
    const collaborators = rooms.get(room) || [];
  
  return (
    <div className={`container-fluid p-3 ${darkMode ? "dark-mode" : ""}`}>
    <div className="d-flex justify-content-between align-items-center mb-4">
        <p>Room Name: {room}</p>
      <h1 className="flex-grow-1 text-center m-0">Code Editor</h1>
            <Form.Check
                type="switch"
                label={darkMode ? "Light Mode" : "Dark Mode"}
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
    </div>
  
    <div className="row">
      {/* Left: Collaborator */}
      <div className="col-md-3">
        <Collaborator collaborators={collaborators}/>
      </div>
    
      {/* Center: Code Editor */}
      <div className="col-md-6">
        <CodeEditor editorRef={editorRef} roomName={room} />
      </div>
  
      {/* Right: Output */}
      <div className="col-md-3">
        <Output editorRef={editorRef} language="javascript" version="15.10.0"/>
      </div>
    </div>
  </div>
  );
}

export default App;