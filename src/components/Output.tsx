import React from 'react';
import { Col } from 'react-bootstrap';

interface OutputProps {
    output: string;
}

const Output: React.FC<OutputProps> = ({output}) => {

  return (
    <div>
        <div className="row mt-4" style={{ padding: "0 2% 2% 2%"}}>
            <div>
                <div className="card shadow-sm">
                    <div className="card-header custom-panel">Output</div>
                    <div className="card-body custom-panel">
                        <textarea className="form-control" value={output} placeholder="Output will be displayed here..." style={{backgroundColor: 'white !important'}} readOnly>
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Output;