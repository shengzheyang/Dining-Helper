import React from 'react';
import ReactDOM from 'react-dom';
import BasicInfoPage from './pages/basicInfoPage';
import OptionsPage from './pages/optionsPage';
import MapPage from './pages/mapPage';

import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends React.Component {
	render(){
		return(
    	<Router >
    	 <div>
    		<Route exact path="/" component={BasicInfoPage} />
        <Route path="/optionsPage" component={OptionsPage} />
				<Route path="/mapPage" component={MapPage} />
    	</div>
    	</Router>
    );
  }
}

// ========================================
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
