import Header from './Header';
import SectionShortDescription from './SectionShortDescription'
import Integrations from './Integrations'
import Divider from '@material-ui/core/Divider'
import Description from './Description'
import Footer from './Footer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignIn from '../Login/SignIn'


import React from "react";

export default function HomePage() {
    return(
        <div className="App">
            <Header />
            <SectionShortDescription />
            <Divider /> <br />
            <Integrations />
            <Divider /> <br />
            <Description />
            <Footer />  
        </div>
    )
};