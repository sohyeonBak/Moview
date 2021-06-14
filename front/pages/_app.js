import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import '../style/all.scss'
import wrapper from '../store/configureStore';


const App = ({Component}) => {
    return(
        <>
        <Head>
            <title>MOVIEW</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        </Head>
        <Component />      
        </>  
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
  };



export default wrapper.withRedux(App);