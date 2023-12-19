import React, { useState, useEffect } from 'react';
import { Dialog } from '@blueprintjs/core';

const SurveyRender = ({ isAppOpen, setAppOpen }) => {
    const [isIframeLoaded, setIframeLoaded] = useState(false);

    useEffect(() => {
        if(isAppOpen) {
            setTimeout(() => {
                setIframeLoaded(true);
            }, 3000); // Load iframe after 30 seconds
        }
    }, [isAppOpen]);

    return (
        <Dialog
            style={{ width: "80%", height: "80vh" }}
            isOpen={isAppOpen}
            onClose={() => {
                setAppOpen(false);
                setIframeLoaded(false);  // Reset iframe loading state on close
            }}
            title="Your ROAR Survey"
            canOutsideClickClose={true}
            canEscapeKeyClose={true}
        >
            <div>
                {
                    isIframeLoaded ?
                    <iframe 
                        src="https://yeatman-survey.web.app/" 
                title="Your ROAR Survey"
                style={{ width: "100%", height: "calc(80vh - 40px)", border: "none" }}

                    />
                    :
                    <div>
                        Loading...
                        {/* Add any Blueprint.js spinner or loading component here for a more visually appealing loading screen */}
                    </div>
                }
            </div>
        </Dialog>
    );
};

export default SurveyRender;
