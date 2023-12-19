import React, { useState } from 'react'; 
import './css/App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Navbar, Alignment, Button, Icon, DialogFooter, ButtonGroup, Classes } from '@blueprintjs/core';
import CsvHandler from './RenderCards';
import Sidebar from './Sidebar';
import FilesDialogButton from './FilesButton';
import ROAR from './assets/ROAR.png'
import { Dialog, IFrame } from "@blueprintjs/core";

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import SurveyRender from './SurveyRender';



function App() {
  const [csvHistory, setCsvHistory] = useState([]);
  const [curIndex, setCurIndex] = useState(0)
  const [csvData, setCsvData] = useState([]);

  const changeCSV = (index) => {
    setCurIndex(index);
  }

  const objectToCSV = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for(const row of data){
        const values = headers.map(header => {
            const escaped = (''+row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}
  const [isAppOpen, setAppOpen] = useState(false);
  const handleButtonClick = async () => {
    setAppOpen(true)
    const csvContent = objectToCSV(csvData[curIndex]?.data || []);
    await uploadCsvToFirestore(csvContent);
  }
  

  const downloadCSV = (csvContent, fileName) => {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  // Your Firebase config from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBDqQ5iXNFRjKOowhbkof-aw_6KQN3wwQU",
  authDomain: "yeatman-survey.firebaseapp.com",
  projectId: "yeatman-survey",
  storageBucket: "yeatman-survey.appspot.com",
  messagingSenderId: "300976396722",
  appId: "1:300976396722:web:5e08fb67e6b96c9294ecab",
  measurementId: "G-2L2G3S9J0P"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

  
const uploadCsvToFirestore = async (csvString) => {
  try {
      const docRef = await addDoc(collection(db, 'csvData'), {
          data: csvString,
          timestamp: serverTimestamp() 
      });
      console.log("CSV uploaded with ID: ", docRef.id);
  } catch (error) {
      console.error("Error uploading CSV: ", error);
  }
};

  

  return (
    <div className="App">
      {/* Top Bar */}
      <Navbar className="bp5-dark">
        <Navbar.Group align={Alignment.LEFT}>
              <Icon icon="layout-hierarchy" />
              <Navbar.Heading style={{padding: "2vw"}}>ROAR Survey Builder</Navbar.Heading>
              <Navbar.Divider />
              <Button className="bp5-large" icon="home" text="Home" />
              <FilesDialogButton csvHistory={csvData.map(item => item.name)} csvData={csvData}  />
          </Navbar.Group>
      </Navbar>

      {/* Sidebar - You can style this to your desired width */}
      <div className="sidebar">
        <Sidebar csvHistory={csvData.map(item => item.name)} changeCSV={changeCSV} />
      </div>

      {/* Main Section */}

      <div className="mainsection">
        <h1 className="big-heading bp5-heading">ROAR-Survey Generator</h1>
        <div className="TimelineMaker">
          <CsvHandler
            csvData={csvData}
            setCsvData={setCsvData}
            csvHistory={csvHistory}
            setCsvHistory={setCsvHistory}
            changeCSV={changeCSV}
            curIndex={curIndex} />
          <ButtonGroup>
            <Button
                rightIcon="import"
                intent="success"
                text="Download CSV"
                onClick={() => {
                    const csvContent = objectToCSV(csvData[curIndex]?.data || []);
                    downloadCSV(csvContent, `csvData-${curIndex}.csv`);
                }}
            />
            <Button
                rightIcon="database"
                text="Deploy to Github"
              onClick={() => {
                handleButtonClick()
                const csvContent = objectToCSV(csvData[curIndex]?.data || []);
                uploadCsvToFirestore(csvContent)
              }}
            />
          </ButtonGroup>
          <SurveyRender isAppOpen={isAppOpen} setAppOpen={setAppOpen}/>
        </div>
      </div>
    </div>
  );
}

export default App;
