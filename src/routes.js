import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Home from './pages/home';
import Movie from './pages/movie';

export default function Routes(){

    return(
        <BrowserRouter>
            <Route path="/" exact component={Home}/>
            <Route path="/movie/:id" component={Movie}/>        
        </BrowserRouter>
    );

}