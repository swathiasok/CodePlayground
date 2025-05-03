import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import Collaborator from './components/Collaborator';
import Output from './components/Output';
import { useRoomContext } from './context/RoomContext';
import * as Y from "yjs";
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from "y-monaco";
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from 'react-router-dom';

function Home() {
    const [darkMode, setDarkMode] = useState(true);
    const [collaborators, setCollaborators] = useState<string[]>([]);
    const editorRef = useRef(null);
    const { state } = useLocation();
    const { room, name } = state;
    const roomName = room;
    const userName = name;
    const wsProviderRef = useRef<WebsocketProvider | null>(null);
    const ydoc = useRef(new Y.Doc()).current;
    
    useEffect(() => {
        console.log(`Connecting to room: ${roomName}`);
        
        const provider = new WebsocketProvider('ws://localhost:1234', roomName, ydoc);
        wsProviderRef.current = provider;
        const awareness = provider.awareness;

        console.log(`Connected to room: ${roomName}`);
        

        // Set your own user info in awareness state
        awareness.setLocalStateField("user", { name: state.name });
      
        // Listen for awareness updates from others in the same room
        const updateCollaborators = () => {
          const states = Array.from(awareness.getStates().values());
          const activeUsers = states.map(s => s.user?.name).filter(Boolean);
          setCollaborators(activeUsers);
        };
      
        awareness.on('change', updateCollaborators);
        updateCollaborators(); // Initial population
      
        return () => {
          awareness.off('change', updateCollaborators);
          provider.destroy();
        };
      }, [roomName, state.room]);

  
  return (
    <div className={`container-fluid p-3 ${darkMode ? "dark-mode" : ""}`}>
    <div className="d-flex justify-content-between align-items-center mb-4">
        <p>Room Name: {roomName}</p>
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
        {wsProviderRef.current && (
          <CodeEditor editorRef={editorRef} roomName={roomName} provider={wsProviderRef.current} />
        )}
      </div>
  
      {/* Right: Output */}
      <div className="col-md-3">
        <Output editorRef={editorRef} language="javascript" version="15.10.0"/>
      </div>
    </div>
  </div>
  );
}

export default Home;