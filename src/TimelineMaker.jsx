// src/App.js
import React, { useState } from 'react';
import { Navbar, Card, Button, Elevation, PanelProps, PanelStack } from '@blueprintjs/core';
import Draggable from 'react-draggable';
import './css/App.css';

const TimelineMaker = () => {
  return (
    <div className="App">
      <div className="draggableCanvas">
        <Draggable>
          <Card className="card" interactive={true} elevation={Elevation.ONE}>
            <p>Timeline Component</p>
            <Button>Submit</Button>
          </Card>
        </Draggable>
        <Draggable>
          <Card className="card" interactive={true} elevation={Elevation.ONE}>
            <p>Timeline Component</p>
            <Button>Submit</Button>
          </Card>
        </Draggable>
        <Draggable>
          <Card className="card" interactive={true} elevation={Elevation.ONE}>
            <p>Timeline Component</p>
            <Button>Submit</Button>
          </Card>
        </Draggable>
        <Draggable>
          <Card className="card" interactive={true} elevation={Elevation.ONE}>
            <p>Timeline Component</p>
            <Button>Submit</Button>
          </Card>
        </Draggable>
      </div>
    </div>
  );
};

export default TimelineMaker;
