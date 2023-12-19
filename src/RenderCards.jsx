import React, { useEffect, useState } from 'react';
import { FileInput, Card, Elevation, Button, Dialog, Menu, Icon, Collapse, MenuItem } from '@blueprintjs/core';
import './css/App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import Papa from 'papaparse';
import Draggable from 'react-draggable';
import Xarrow, {useXarrow, xarrowPropsType, Xwrapper} from 'react-xarrows';
import DraggableCard from './EventCard';


const CsvHandler = (props) => {
  console.log(props)

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    props.setCsvHistory(prevHistory => [...prevHistory, file.name]);
    parseCSV(file);
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        props.setCsvData(prevData => [...prevData, { name: file.name, data: result.data }]);
      },
      header: true
    });
  };
  

  const createCardsFromCSVData = (data) => {
    let cards = [];
    let tempData = [];
    
    data.forEach((row, index) => {
      if (row.break === "TRUE" || index === data.length - 1) {
        cards.push(tempData);
        tempData = [];
      } else {
        tempData.push(row);
      }
    });

    return cards;
  };


  console.log(props.csvData)
  const resetAll = () => {
    props.setCsvData([])
    props.setCsvHistory([])
  };

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <Button icon="refresh" intent="danger" text="Reset" onClick={resetAll} />
        <FileInput text="Choose a file..." onChange={handleCSVUpload} accept=".csv" style={{ padding: '4px' }}/>

      </div>
      <div className="draggableCanvas">
        <ConnectedCards cards={createCardsFromCSVData(props.csvData[props.curIndex]?.data || [])} />
      </div>
    </div>
  );
};


const ConnectedCards = ({ cards }) => {
  const [cardsData, setCardsData] = useState(cards);

  const handleCardEdit = (index, updatedData) => {
    // Update cards state with the edited data from DraggableCard
    const updatedCards = [...cardsData];
    updatedCards[index] = updatedData;
    setCardsData(updatedCards);
    // Update your main dataset here, maybe using a callback or context
  };

  const calculatePosition = (index) => {
    return {
        x: (index * 100) + 'vw',
        y: (index * 100) + 'vh'
    };
};

  return (
    <div style={{ position: 'relative', gap: '500px' }}>
          <Xwrapper>
              {cards.map((cardData, index) => (
                <DraggableCard
                  key={index}
                  cardData={cardData}
                  id={`card-${index}`}
                  style={calculatePosition(index)}
                  onEdit={(updatedData) => handleCardEdit(index, updatedData)}/>
              ))}

              {cards.map((_, index) => {
                  if (index === 0) return null;
                  return (
                      <Xarrow
                          key={index}
                          start={`card-${index - 1}`}
                          end={`card-${index}`}
                          headSize={6}
                          strokeWidth={2}
                          path="grid"
                      />
                  );
              })}
          </Xwrapper>
      </div>
  );
};




export default CsvHandler;

