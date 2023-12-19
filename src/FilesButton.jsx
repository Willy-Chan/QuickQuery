import React, { useState } from 'react';
import { Button, Dialog, Classes, HTMLTable } from '@blueprintjs/core';
import './css/App.css'

const FilesDialogButton = ({ csvHistory, csvData }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    console.log(csvData)
    const toggleDialog = () => {
        setIsDialogOpen(prev => !prev);
    };

    return (
        <>
            <Button className="bp5-large" icon="document" text="Files" onClick={toggleDialog} />
            
            <Dialog isOpen={isDialogOpen} onClose={toggleDialog} title="CSV History" style={{ width: '30%' }}>
                <div className={Classes.DIALOG_BODY}>
                    <HTMLTable striped bordered >
                        <thead>
                            <tr>
                                <th>CSV Name</th>
                                <th>CSV Preview</th>
                            </tr>
                        </thead>
                        <tbody>
                            {csvHistory.map((csvName, index) => (
                                <tr key={index}>
                                    <td>{csvName}</td>
                                    <td>{csvData[index]?.data.slice(0, 5).map(row => (
                                        <div key={row.item}>{row.item}</div> // Assuming each row has an id and name. Modify this based on your CSV structure.
                                    ))}</td>
                              </tr>
                            ))}
              </tbody>
              <p>...</p>
                    </HTMLTable>
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={toggleDialog}>Close</Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default FilesDialogButton;
