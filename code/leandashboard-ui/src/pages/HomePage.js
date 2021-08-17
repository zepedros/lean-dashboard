import Divider from '@material-ui/core/Divider';
import React from "react";
import Description from '../components/HomePage/Description';
import Footer from '../components/HomePage/Footer';
import Header from '../components/HomePage/Header';
import Integrations from '../components/HomePage/Integrations';
import SectionShortDescription from '../components/HomePage/SectionShortDescription';

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