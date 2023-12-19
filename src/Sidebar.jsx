import React, { useContext, useRef, useState } from 'react';
import { Button, Collapse, Icon, H5, MenuItem, Menu } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './css/App.css';
import CsvHandler from './RenderCards';


const Sidebar = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [wiggle, setWiggle] = useState(true);
  
    const toggleSidebar = () => {
        if (props.csvHistory.length === 1) {
          setWiggle(false);
          setIsSidebarOpen(!isSidebarOpen);
        } else {
            setIsSidebarOpen(!isSidebarOpen);
        }
    }
      
  
      return (
          <div className="bp5-monospace-text">
              <Button
                  className={`bp5-button ${wiggle ? 'wiggle' : ''}`} // Apply 'wiggle' class if 'wiggle' state is true
                  text="CSV History"
                  icon={<Icon icon={isSidebarOpen ? 'symbol-triangle-down' : 'symbol-triangle-up'} />}
                  onClick={toggleSidebar}
              />
              
              {!wiggle && ( // Use logical AND for conditional rendering
            <Collapse isOpen={isSidebarOpen}>
              <Menu >
              {props.csvHistory.map((csv, index) => (
                  <div key={index}>
                    <MenuItem icon="document" text={csv} style={{ marginLeft: '10px' }} onClick={() => props.changeCSV(index)} />
                  </div>
              ))}
  
              </Menu>
                  </Collapse>
              )}
          </div>
      );
  }
  
  export default Sidebar;
  