import React from 'react';
import ReactDOM from 'react-dom';
import BasicInfoPage from './pages/basicInfoPage';
import OptionsPage from './pages/optionsPage';
import MapPage from './pages/mapPage';

import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

window.attachApp = (viewerId, threadType) => {
	const apiUri = `https://${window.location.hostname}`;
	let app;
	console.log(apiUri, threadType, viewerId);
	app = (<App viewerId={viewerId} />);
  
	ReactDOM.render(app, document.getElementById('content'));
};

class App extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			userId: this.props.viewerId
		}
	}

	render(){
		return (
    	<Router>
			<div>
				<Route exact path="/" render={() => (
					<Redirect to="/basicInfoPage"/>
					)}/>
				<Route path="/optionsPage" 
					render={(props) => <OptionsPage {...props} />} />
				<Route path="/mapPage" 
					render={(props) => <MapPage {...props} />} />
				<Route path="/basicInfoPage/:pollingId?"  render={(props) => <BasicInfoPage {...props} userId={this.state.userId}/>} />
			</div>
		</Router>
	);
  }
}
