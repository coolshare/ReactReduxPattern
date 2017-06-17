import React from 'react';
import PatternsLeftPaneComponent from './PatternsLeftPaneComponent'


export default class PatternsLeftPaneContainer extends React.Component {
	constructor(props) {
		super(props);
		this.data = {
			    id: 'Patterns',
			    name: 'React Patterns',
			    children: [{
			        id: 'Container',
			        name: 'Container/Component',
			        children: [{
			    	        id: 'Photo',
			    	        name: 'Photo Player'
			    	    }, {
			    	        id: 'Video',
			    	        name: 'Video Player'
			    	    }]
			    	}, {
			        id: 'Popup Pattern',
			        name: 'Popup Pattern'
			    },{
			        id: 'Callback Pattern',
			        name: 'Callback Pattern'
			    },{
			        id: 'Dispatch in Reducer Pattern',
			        name: 'Dispatch in Reducer Pattern'
			    }]
			};
	}
	
	render() {
	    return (
	      < PatternsLeftPaneComponent data={this.data}
	        /> 
	    )
	  }
}
