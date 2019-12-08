import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userId: this.props.viewerId
		}
	}

	render(){
		return (
			// <div>{this.state.userId}</div>
    	<Router>
			<div>
				<Route exact path="/" render={() => (
					<Redirect to="/basicInfoPage"/>
					)}/>
				<Route path="/optionsPage" 
					render={(props) => <OptionsPage {...props} />} />
				<Route path="/mapPage" component={MapPage} 
					render={(props) => <MapPage {...props} />} />
				<Route path="/basicInfoPage/:pollingId?"  render={(props) => <BasicInfoPage {...props} userId={this.state.userId} />} />
				<Route path="/finalResultPage" component={finalResultPage} />
			</div>
    	</Router>
    );
  }
}

export default App;

