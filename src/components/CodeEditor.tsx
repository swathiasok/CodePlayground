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

  useEffect(() => {
    if (!provider) return;

    const ydoc = provider.doc;
    const yLanguage = ydoc.getMap('language');
    
    if (yLanguage.size === 0) {
      yLanguage.set('current', language);
    } else {
      // Otherwise use the shared language
      setLanguage(yLanguage.get('current') as string);
      setValue(LANGUAGE_TEMPLATES[yLanguage.get('current') as string] || '');
    }

    // Set up output syncing
    const yOutput = ydoc.getMap('output');
    if (yOutput.has('current')) {
      setOutput(yOutput.get('current') as string);
    }

    // Listen for language changes
    const languageObserver = () => {
      const newLang = yLanguage.get('current');
      if (newLang !== language) {
        setLanguage(newLang as string);
        // Only set the template value if there's no existing content
        if (!editorRef.current || editorRef.current.getValue().trim() === '') {
          setValue(LANGUAGE_TEMPLATES[newLang as string] || '');
        }
      }
    };
    const outputObserver = () => {
      setOutput(yOutput.get('current') as string);
    };

    yLanguage.observe(languageObserver);
    yOutput.observe(outputObserver);

    return () => {
      yLanguage.unobserve(languageObserver);
      yOutput.unobserve(outputObserver);
    };
  }, [provider, language, setOutput]);

  const handleMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    const ydoc = provider.doc;
  
    if (ydoc && provider) {
      const type = ydoc.getText("monaco");
      new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    if (!provider) return;
    
    const ydoc = provider.doc;
    const yLanguage = ydoc.getMap('language');
    
    // Update language in the shared document
    yLanguage.set('current', newLanguage);
    setLanguage(newLanguage);
    
    // Only set template if editor is empty
    if (!editorRef.current || editorRef.current.getValue().trim() === '') {
      setValue(LANGUAGE_TEMPLATES[newLanguage]);
    }
  };

  const updateSharedOutput = (output: string) => {
    if (!provider) return;
    
    const ydoc = provider.doc;
    const yOutput = ydoc.getMap('output');
    yOutput.set('current', output);
  };

  return (
    <div>
      <div className="card shadow-sm">
        <LanguageSelector editorRef={editorRef} language={language} onSelect={handleLanguageChange} setOutput={setOutput} updateSharedOutput={updateSharedOutput}/>
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