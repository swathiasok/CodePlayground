import React, { useState } from 'react';
import { ListGroup, Collapse} from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// const collaborators = ['Alice', 'Bob', 'Charlie'];

interface CollaboratorProps {
    collaborators: string[];
}

const CollaboratorList: React.FC<CollaboratorProps> = ({collaborators}) => {
  const [open, setOpen] = useState(true);

  return (
    <ListGroup className="mb-3 custom-panel">
        <ListGroup.Item
            action
            onClick={() => setOpen(!open)}
            className="d-flex justify-content-between align-items-center custom-panel"
            style={{ cursor: 'pointer' }}
        >Collaborators
            {open ? <FaChevronUp /> : <FaChevronDown />}
        </ListGroup.Item>

        <Collapse in={open}>
            <div>
            {collaborators.map((name, idx) => (
                <ListGroup.Item key={idx}>
                {name}
                </ListGroup.Item>
            ))}
            </div>
        </Collapse>
    </ListGroup>
  );
};

export default CollaboratorList;