import Divider from '@material-ui/core/Divider';
import React from 'react';
import Footer from '../HomePage/Footer';
import Header from '../HomePage/Header';

export default function PrivacyPolicy() {
    return (
        <div>
            <Header />
            <Divider />
            <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary MuiTypography-gutterBottom MuiTypography-alignCenter">
                Privacy Policy
            </h1>
            <p>BLA BLA BLA</p>
            <Footer />
        </div>
    );

}