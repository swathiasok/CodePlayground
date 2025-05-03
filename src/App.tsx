import React, {useState} from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import FileExplorer from './components/FileExplorer';
import Collaborator from './components/Collaborator';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
  <div className={`container-fluid p-3 ${darkMode ? "dark-mode" : ""}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="flex-grow-1 text-center m-0">Code Editor</h1>
        <button
          className="btn btn-outline-primary"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Main Layout - Three Sections */}
      <div className="row">
        {/* File Explorer */}
        <FileExplorer />

        {/* Code Editor */}
        <CodeEditor />

        {/* Collaborators */}
        <Collaborator />
      </div>

    </div>
  );
}

export default App;