import Header from './Header';
import SectionShortDescription from './SectionShortDescription'
import Integrations from './Integrations'
import Divider from '@material-ui/core/Divider'
import Description from './Description'
import Footer from './Footer'
import React from "react";
import {IntlProvider } from "react-intl"
import Portuguese from "../../i18n/messages/pt-PT"

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