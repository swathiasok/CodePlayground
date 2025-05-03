import React, { useState } from 'react';
import { ListGroup, Collapse, Button } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// const collaborators = ['Alice', 'Bob', 'Charlie'];

interface CollaboratorProps {
    collaborators: string[];
}

const CollaboratorList: React.FC<CollaboratorProps> = ({collaborators}) => {
  const [open, setOpen] = useState(false);

  return (
    <ListGroup className="mb-3">
      <ListGroup.Item
        action
        onClick={() => setOpen(!open)}
        className="d-flex justify-content-between align-items-center"
        style={{ cursor: 'pointer' }}
      >
        <strong>Collaborators</strong>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </ListGroup.Item>

      <Collapse in={open}>
        <div>
          {collaborators.map((name, idx) => (
            <ListGroup.Item key={idx} style={{ background: "#f8f9fa" }}>
              {name}
            </ListGroup.Item>
          ))}
        </div>
      </Collapse>
    </ListGroup>
  );
};

export default CollaboratorList;