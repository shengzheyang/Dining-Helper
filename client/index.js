import React from 'react';
import ReactDOM from 'react-dom';
import BasicInfoPage from './pages/basicInfoPage';
import OptionsPage from './pages/optionsPage';
import MapPage from './pages/mapPage';

import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

class App extends React.Component {
	// constructor(props){
	// 	super(props);
	// 	this.state.pollingId = listId
	// }

	render(){
		return(
    	<Router>
    	 <div>
				<Route exact path="/" render={() => (
					<Redirect to="/basicInfoPage"/>
				 )}/>
        		<Route path="/optionsPage" component={OptionsPage} />
				<Route path="/mapPage" component={MapPage} />
				<Route path="/basicInfoPage/:pollingId?" component={BasicInfoPage} />
    	</div>
    	</Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
