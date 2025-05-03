import React, { useEffect, useState } from 'react';
import Editor, { loader } from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from "y-monaco";
import { WebrtcProvider } from 'y-webrtc';
import LanguageSelector from './LanguageSelector';
import { LANGUAGE_TEMPLATES } from '../constants';

interface CodeEditorProps {
  editorRef: React.RefObject<any>;
  roomName?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ editorRef, roomName }) => {
  const [language, setLanguage] = useState("python");
  const [value, setValue] = useState(LANGUAGE_TEMPLATES["python"]);

  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme("customTheme", {
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
    });
  }, []);

  const handleMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    const ydoc = new Y.Doc();
    const currentRoomName = roomName || "default-room";
    const provider = new WebrtcProvider("new-room", ydoc);
    const type = ydoc.getText("monaco");

    new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setValue(LANGUAGE_TEMPLATES[newLanguage]);
  };

  return (
    <div>
      <div className="card shadow-sm">
        <LanguageSelector language={language} onSelect={handleLanguageChange} />
        <div className="card-body">
          <Editor
            height="70vh"
            language={language}
            value={value}
            theme="customTheme"
            onMount={handleMount}
            onChange={(val) => setValue(val || "")}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;