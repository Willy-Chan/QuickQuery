import React, { useState } from 'react';
import { Card, Dialog, Button, Label, Checkbox } from '@blueprintjs/core';
import Draggable from 'react-draggable';
import { useXarrow } from 'react-xarrows';


const DraggableCard = ({ cardData, id, onEdit, style }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const updateXarrow = useXarrow();

  const toggleDialog = () => {
      setIsDialogOpen(!isDialogOpen);
  };
    
  const handleInputChange = (index, key, value) => {
    // Create a copy of cardData and update the value
    const updatedData = [...cardData];
    updatedData[index][key] = value;

    // Notify the parent
    onEdit(updatedData);
};

  return (
      <div>
          <Draggable onDrag={updateXarrow} onStop={updateXarrow} defaultPosition={{ x: parseInt(style.x, 10), y: parseInt(style.y, 10) }}>
              <Card 
                  id={id}
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                  className="card"
                  interactive={true}
              >
              <h5 class="bp5-heading">Survey Block</h5>
              <Button onClick={toggleDialog}>Details</Button>
              </Card>
          </Draggable>

          <Dialog
              isOpen={isDialogOpen}
              onClose={toggleDialog}
              title="Survey Block Stimuli"
        canOutsideClickClose={true}
        style={{ width: 'auto', maxWidth: '100%' }}
          >
              <div className="bp3-dialog-body">
                  <table class="bp5-html-table bp5-html-table-striped bp5-html-table-bordered">
                      <thead>
                          <tr>
                              <th>Item</th>
                              <th>Target</th>
                <th>Distractor 1</th>
                <th>Distractor 2</th>
                <th>Distractor 3</th>
                          </tr>
                          </thead>
                          
        
            <tbody>
                {cardData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.keys(row).map((key) => (
                            key !== "break" ? (
                                <td key={key}>
                                    <input
                                        className="bp5-input {{.modifier}}"
                                        placeholder="ERROR!"
                                        type="text"
                                        value={row[key]}
                                        onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
                                    />
                                </td>
                            ) : null
                        ))}
                    </tr>
                ))}
            </tbody>
                      
                      
                  </table>
        </div>
            <div className="small_padding">
                    <Checkbox className="bp5-inline" label="Sequential Stimuli?"/>
              </div>
              <div className="bp3-dialog-footer">
                  <div className="bp3-dialog-footer-actions">
                      <Button onClick={toggleDialog}>Close</Button>
          </div>

        </div>
          </Dialog>
      </div>
  );
};

export default DraggableCard