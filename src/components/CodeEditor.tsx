import React, {useEffect, useRef, useState} from 'react';
import Editor, { loader } from "@monaco-editor/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import LanguageSelector from './LanguageSelector';
import { LANGUAGE_TEMPLATES } from '../constants';
import Output from './Output';

const CodeEditor = () => {
  const [language, setLanguage] = useState("python");
  const [value, setValue] = useState(LANGUAGE_TEMPLATES[language]);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("customTheme", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#505050",
          "editor.lineHighlightBackground": "#0000FF20",
          "editorLineNumber.foreground": "#008800",
          "editorCursor.foreground": "#FF0000",
        },
      });
    });
  }, []);

  function handleMount(editor: any, monaco: any) {
    editorRef.current = editor;
    editor.focus();
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider("my-room-name", ydoc);
    const type = ydoc.getText("monaco");
    const monacoBinding = new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness);
    console.log(provider.awareness);
  }

  function handleLanguageChange(newLanguage: string) {
    setLanguage(newLanguage);
    setValue(LANGUAGE_TEMPLATES[newLanguage])
    console.log(`Language changed to: ${newLanguage}`);
    
  }

  return (
    <div className="col-md-8">
      <div className="card shadow-sm">
        <LanguageSelector language={language} onSelect = {handleLanguageChange}/>
        <div className="card-body">
          <Editor 
            height="90vh"
            language={language}
            defaultValue={LANGUAGE_TEMPLATES[language]}
            value={value}
            theme="customTheme"
            onMount={handleMount}
            onChange={(value) => {
              setValue(value || "");
            }}
          />
        </div>
        <Output editorRef={editorRef} language={language}/>
      </div>
    </div>
  );
}

export default CodeEditor;