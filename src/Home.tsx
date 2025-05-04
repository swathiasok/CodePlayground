import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import Collaborator from './components/Collaborator';
import Output from './components/Output';
import * as Y from "yjs";
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebsocketProvider } from 'y-websocket';
import {
  Form
} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from 'react-router-dom';

function Home() {
    const [darkMode, setDarkMode] = useState(true);
    const [collaborators, setCollaborators] = useState<string[]>([]);
    const editorRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const { state } = useLocation();
    const { room, name } = state;
    const roomName = room;
    const providerRef = useRef<WebrtcProvider | null>(null);
    const ydoc = useRef(new Y.Doc()).current;
    const [output, setOutput] = useState<string>("");
    
    useEffect(() => {
        console.log(`Connecting to room: ${roomName}`);
        const provider = new WebrtcProvider(roomName, ydoc, {
          signaling: [
            'wss://signaling.yjs.dev',
            'wss://y-webrtc-signaling-eu.herokuapp.com'
          ],
        });

        providerRef.current = provider;
        const awareness = provider.awareness;

        console.log(`Connected to room: ${roomName}`);

        const persistence = new IndexeddbPersistence(roomName, ydoc);
        provider.on('status', ({ connected }) => {
          console.log(`WebRTC connection status: ${connected ? 'connected' : 'disconnected'}`);
          setIsConnected(connected);
        });

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

        persistence.on('synced', () => {
          console.log('Document loaded from IndexedDB');
        });
      
        return () => {
          awareness.off('change', updateCollaborators);
          provider.destroy();
          persistence.destroy();
        };
      }, [roomName, state.name]);

  
  return (
    <div className={`container-fluid p-3 ${darkMode ? "dark-mode" : "light-mode"}`}>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
          <p>Room Name: {roomName}</p>
          <span className={`connection-status ${isConnected ? "connected" : "connecting"}`}>
            {isConnected ? "● Connected" : "○ Connecting..."}
          </span>
        </div>
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
          {providerRef.current && (
            <CodeEditor 
              darkMode={darkMode} 
              editorRef={editorRef} 
              roomName={roomName} 
              provider={providerRef.current} 
              setOutput={setOutput}
            />
          )}
        </div>
  
      {/* Right: Output */}
      <div className="col-md-3">
        <Output output={output}/>
      </div>
    </div>
  </div>
  );
}

export default Home;