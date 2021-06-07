import React from 'react';
import Header from '../HomePage/Header'
import Divider from '@material-ui/core/Divider'
import Footer from '../HomePage/Footer'

export default function Terms() {
    return(
        <div>
            <Header />
            <Divider /><br />
            <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-colorTextPrimary MuiTypography-gutterBottom MuiTypography-alignCenter">
                Terms
            </h1>
            <p>BLA BLA BLA</p>
            <Footer />
        </div>
    );

}