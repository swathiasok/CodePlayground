import React from "react";
import {LANGUAGES} from "../constants";
import "../styles/LanguageSelector.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { getLanguages, executeCode } from "../api";

interface LanguageSelectorProps {
    editorRef: React.RefObject<any>;
    language: string;
    onSelect: (lang: string) => void;
    setOutput: (output: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ editorRef, language, onSelect, setOutput }) => {
    const [languages, setLanguages] = React.useState<{ [key: string]: string }>({});

    React.useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const data = await getLanguages();
                const languageList = LANGUAGES;
                const languageMap: { [key: string]: string } = {};
                data.forEach((langObj: any) => {
                    if (languageList.includes(langObj.language)){
                        languageMap[langObj.language] = langObj.version;
                    }
                });

                setLanguages(languageMap);
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };
        fetchLanguages();
    }, []);

    const runCode = async() => {
        const code = editorRef.current.getValue();
        const version = languages[language];
        console.log(language, version);
        
        if (!code) {
            alert("Please enter some code to run.");
            return;
        }
        try {
            const {run:result} = await executeCode(code, language, version);
            console.log("Code execution result:", result);
            
            setOutput(result.output);
        }
        catch (error) {
            console.error("Error executing code:", error);
            alert("An error occurred while executing the code.");
        } 
    }   

    return (
        <div className="card-header custom-panel">
            <div className="d-flex justify-content-between align-items-center w-100">
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {language}
                    </button>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {Object.entries(languages).map(([lang, version], index) => (
                        <button
                            key={index}
                            className="dropdown-item"
                            onClick={() => onSelect(lang)}
                        >
                            {lang} <span className="text-muted">({version})</span>
                        </button>
                        ))}
                    </div>
                </div>
                <div>
                    <button className="btn btn-success" onClick={runCode} style={{ margin: "0 2% 0 0"}}>Run</button>
                </div>
            </div>
      </div>
    );
}

export default LanguageSelector;
