import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Dispatcher from '../../../../common/Dispatcher'
import Subscriber from '../../../../common/Subscriber'
/**
*
*/
export default class PubsubComponent extends React.Component{
	
	/**
    * render
    * @return {ReactElement} markup
    */
	render(){

	    return (
	      <div style={{"height":"550px", "overflow":"auto"}}>
	      	<h3>Demo of Pub/Sub Component</h3>
	      	<div>A button dispatch "test1":<Dispatcher action={{"type":"test1", "data":"The button is clicked"}}><button>Test</button></Dispatcher></div>
	      	<div>An input dispatch "test1" on "onChange":<Dispatcher action={{"type":"test1"}} event="Change"><input type="text"/></Dispatcher></div>
	      	<div>An input dispatch "test2" on "Enter down":<Dispatcher action={{"type":"test2"}} event="KeyDown" keyFilter="Enter"><input type="text"/></Dispatcher></div>
	      	<div>An input dispatch "test3" on "Enter down" and set state "pubsubTest.test1" with value of input:<Dispatcher action={{"type":"test3"}} event="KeyDown" keyFilter="Enter" setState="pubsubTest.test1"><input type="text"/></Dispatcher></div>
	      	<div>A select dispatch "test2" on "onChange":<Dispatcher action={{"type":"test2"}} event="Change"><select><option value="a">A</option><option value="b">B</option><option value="c">C</option></select></Dispatcher></div>
	      	<br/><br/>
	      	<div>A P subscribes actionType "test1":<Subscriber ActionType="test1" setField="innerHTML"><p/></Subscriber></div>
	      	<div>A Input subscribes actionType "test2":<Subscriber ActionType="test2"><input/></Subscriber></div>
	      	<div>A select subscribes "test2":<Subscriber ActionType="test2"><select><option value="a">A</option><option value="b">B</option><option value="c">C</option></select></Subscriber></div>
	      	<div>A input connected to "pubsubTest.test1":<input value={this.props.test1}/></div>
	      	<br/><br/>
	      	You may or may not have a corresponding reducer for the action depending on if you want to update the state.
		 </div>
	    );
	}
}