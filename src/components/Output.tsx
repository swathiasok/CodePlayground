import React, {useEffect, useRef, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { exec } from 'child_process';
import { executeCode } from '../api';

interface OutputProps {
    editorRef: React.RefObject<any>;
    language: string;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {

    const [output, setOutput] = useState<string>("");

    const runCode = async() => {
        const code = editorRef.current.getValue();
        if (!code) {
            alert("Please enter some code to run.");
            return;
        }
        try {
            const {run:result} = await executeCode(code, language);
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
        <div className="d-flex justify-content-between">
            <button className="btn btn-success" onClick={runCode}>Run</button>
            <button className="btn btn-danger">Stop</button>
        </div>
        <div className="row mt-4">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-header">Input</div>
                    <div className="card-body">
                        <textarea className="form-control" placeholder="Enter input..."></textarea>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-header">Output</div>
                    <div className="card-body">
                        <textarea className="form-control" value={output}>
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Output;