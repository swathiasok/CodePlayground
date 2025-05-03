import React from "react";

const FileExplorer = () => {
    const [files, setFiles] = React.useState<string[]>([]);

  return (
    <div className="col-md-2">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
            Files
            <button className="btn" onClick={() => 
            {
                const fileName = `File ${files.length + 1}`;
                setFiles([...files, fileName]);
            }
            }>
                +
            </button>
        </div>
        <ul className="list-group list-group-flush">
            {files.map((file, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {file}
                <button className="btn" onClick={() => 
                {
                    setFiles(files.filter((f) => f !== file));
                }
                }>
                    x
                </button>
                </li>
            ))}
        </ul>   
      </div>
    </div>
  );
};

export default FileExplorer;
