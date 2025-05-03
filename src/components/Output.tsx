import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { executeCode } from '../api';

interface OutputProps {
    editorRef: React.RefObject<any>;
    language: string;
    version: string;
}

const Output: React.FC<OutputProps> = ({ editorRef, language, version}) => {

    const [output, setOutput] = useState<string>("");

    const runCode = async() => {
        const code = editorRef.current.getValue();
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
    <div>
        <div className="d-flex align-items-center w-100" style={{ padding: "0 2%"}}>
                <button className="btn btn-success" onClick={runCode} style={{ margin: "0 2% 0 0"}}>Run</button>
                <button className="btn btn-danger">Stop</button>
        </div>
        
        <div className="row mt-4" style={{ padding: "0 2% 2% 2%"}}>
            <div>
                <div className="card shadow-sm">
                    <div className="card-header">Output</div>
                    <div className="card-body">
                        <textarea className="form-control" value={output} placeholder="Output will be displayed here..." readOnly>
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Output;