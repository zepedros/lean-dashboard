import Divider from '@material-ui/core/Divider';
import React from "react";
import Description from './Description';
import Footer from './Footer';
import Header from './Header';
import Integrations from './Integrations';
import SectionShortDescription from './SectionShortDescription';

export default function HomePage() {
    return (
        <div className="App">
            <Header />
            <SectionShortDescription />
            <Divider />
            <Integrations />
            <Divider />
            <Description />
            <Footer />
        </div>
    )
};