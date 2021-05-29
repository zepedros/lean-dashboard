import Header from './Header';
import SectionShortDescription from './SectionShortDescription'
import Integrations from './Integrations'
import React from "react";

export default function HomePage() {
    return(
        <div className="App">
        
            <Header />
            <SectionShortDescription />
            <Integrations />
        </div>
    )
};