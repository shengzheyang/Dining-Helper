import React from 'react';
import ReactDOM from 'react-dom';
import BasicInfoPage from './pages/basicInfoPage';
import OptionsPage from './pages/optionsPage'
import {BrowserRouter as Router, Route} from "react-router-dom";
//import "react-datepicker/dist/react-datepicker.css"
//import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'

class App extends React.Component {
	render(){
		return(
    	<Router >
    	 <div>
    		<Route exact path="/" component={BasicInfoPage} />
        <Route path="/optionsPage" component={OptionsPage} />
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