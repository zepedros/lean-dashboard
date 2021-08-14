import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import Footer from '../HomePage/Footer';
import Header from '../HomePage/Header';
import GoBack from '../Common/GoBack'
export default function About() {
    return (
        <div>
            <Header />
            <Divider />
            <GoBack />
            <Container maxWidth="sm">
                
                <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary MuiTypography-gutterBottom MuiTypography-alignCenter">
                    About us
                </h1>
                <p>Under Construction</p>
            </ Container >
            <Footer />
        </div>
    );
}