import React from "react";

const Collaborator = () => {
    const [collabs, setCollabs] = React.useState<string[]>([]);
    
      return (
        <div className="col-md-2">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                Collaborators
                <button className="btn" onClick={() => 
                {
                    const fileName = `User ${collabs.length + 1}`;
                    setCollabs([...collabs, fileName]);
                }
                }>
                    +
                </button>
            </div>
            <ul className="list-group list-group-flush">
                {collabs.map((collab, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {collab}
                    <button className="btn" onClick={() => 
                    {
                        setCollabs(collabs.filter((c) => c !== collab));
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
}

export default Collaborator;