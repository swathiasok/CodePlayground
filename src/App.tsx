import React, { useState } from 'react';
import './App.css';
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRoomContext } from './context/RoomContext';

function App() {
  const [isNewRoom, setIsNewRoom] = useState(true);
  const [roomName, setRoomName] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { addUserToRoom } = useRoomContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const room = isNewRoom ? Math.floor(10000 + Math.random() * 90000).toString() : roomName;
    addUserToRoom(room, name);
  
    navigate('/home', { state: { room } });
  };

  return (
    <Container fluid className="dark-mode">
      <Row>
        {/* Left */}
        <Col md={6} className="p-0">
          <img
            src="/images/home.png"
            alt="Logo"
            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
          />
        </Col>

        {/* Right */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: '100vh', padding: '2rem' }}
        >
          <Form style={{ width: '100%', maxWidth: '400px' }}>
            <Form.Group className="mb-3" controlId="formToggle">
              <Form.Check
                type="switch"
                label={isNewRoom ? "Creating New Room" : "Joining Existing Room"}
                checked={isNewRoom}
                onChange={() => setIsNewRoom(!isNewRoom)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} required/>
            </Form.Group>

            {!isNewRoom && (
              <Form.Group className="mb-3" controlId="formRoom">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter room name"
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Button variant="primary" type="submit" className="w-100" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;