import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import Footer from '../HomePage/Footer';
import Header from '../HomePage/Header';

export default function About() {
    return (
        <div>
            <Header />
            <Divider />
            <Container maxWidth="sm">
                <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary MuiTypography-gutterBottom MuiTypography-alignCenter">
                    About us
                </h1>
                <p>BLA BLA BLA</p>
            </ Container >
            <Footer />
        </div>
    );
}