import React, { useEffect, useState } from 'react';
import Editor, { loader } from "@monaco-editor/react";
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from "y-monaco";
import LanguageSelector from './LanguageSelector';
import { LANGUAGE_TEMPLATES } from '../constants';

interface CodeEditorProps {
  darkMode: boolean;
  editorRef: React.RefObject<any>;
  roomName?: string;
  provider: WebrtcProvider;
  setOutput: (output: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ darkMode, editorRef, roomName, provider, setOutput }) => {
  const [language, setLanguage] = useState("python");
  const [value, setValue] = useState(LANGUAGE_TEMPLATES["python"]);

  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme("customDarkTheme", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#505050",
          "editor.lineHighlightBackground": "#0000FF20",
          "editorLineNumber.foreground": "#008800",
          "editorCursor.foreground": "#FF0000",
        }
      });

      monaco.editor.defineTheme("customLightTheme", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#ffffff",
          "editor.lineHighlightBackground": "#f0f0f0",
          "editorLineNumber.foreground": "#888888",
          "editorCursor.foreground": "#000000",
          "editor.foreground": "#000000",
        }
      });
    });
  }, []);

  const handleMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    const ydoc = provider.doc;
  
    if (ydoc && provider) {
      const type = ydoc.getText("monaco");
      new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setValue(LANGUAGE_TEMPLATES[newLanguage]);
  };

  return (
    <div>
      <div className="card shadow-sm">
        <LanguageSelector editorRef={editorRef} language={language} onSelect={handleLanguageChange} setOutput={setOutput} />
        <div className="card-body custom-panel">
          <Editor
            height="70vh"
            language={language}
            value={value}
            theme={darkMode ? "customDarkTheme" : "customLightTheme"}
            onMount={handleMount}
            onChange={(val) => setValue(val || "")}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;