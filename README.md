React-Redux Patterns
========================

By Mark Qian 6/2017 (markqian@hotmail.com)

<b>A. The demo page:</b> 

http://coolshare.github.io/ReactReduxPatterns/

<b>B. Description:</b>

This package is designed to get you up and running as a comprehensive web application.
Another major goal of this package is to illustrate commonly used patterns in a React application.
I will first focus on some of the patterns I introduced for my own used in my projects at work.
Than I will list some commonly used ones.

 - <b>Access store globally</b><br>
   **Problem**: access to some store and store related methods from anywhere is not easy and using many store related 
   methods as-is does not meet our need. For example, we need a dispatch with callback but the as-is dispatch of Redux store
   does not provide that. We need a global access point to access store and store related methods.<br/><br/> 
   **Solution**: Creating a singleton wrapper instance that can be accessed globally. It holds the reference of Redux store and the wrapper of 
   store related methods that satisfies custom need. See code details at <a href="https://github.com/coolshare/ReactReduxPattern/blob/master/src/services/CommunicationService.js">/services/CommunicationService.js</a>. 
   The CommunicationService will do a lot more that I will describe below. 
  
 - <b>Make dispatch callbackable</b><br>
   **Problem**: dispatch of Redux store does not allow callback. This is not convenient since you sometimes want to write the handler in the same place
   of dispatching instead of somewhere else such as in a reducer.<br/><br/> 
   **Solution**: one key issue with this is that the callback has to be invoked after every handler including reduces and subscribers is done their jobs.
   So my approach is to trigger an asynchronous dispatch in a middleware and the asynchronous dispatching is picked up in the next round of event process in
   a common reducer where the callback is invoked. See code details at <a href="https://github.com/coolshare/ReactReduxPattern/blob/master/src/services/CommunicationService.js">/services/CommunicationService.js</a> and <a href="https://github.com/coolshare/ReactReduxPattern/blob/master/src/components/CommonMiddleware.js">/components/CommonMiddleware.js</a>. 
   
 - <b>Popup Stack</b><br>
   **Problem**: In your application, in many case to achieve a better user experience, you need to allow users to jump into another point in the component 
   hierarchy. If you simply route (deep linking programmatically or allow user to jump by clicking in some case) to the point you may lost the current stay. The use may totally get lost after they finish the job in current stack level. So you need a state "Stack" <br/><br/> 
   **Solution**: I built a component/container, "StackViewContainer". It keeps all level of the stack "modal" so that users have to close all the popups to
   return when "drilling down" or jumping around. In the running demo, try it out by clicking link "React Patterns" at the top and click at "Popup Patter" on the 
   left menu which links to an arbitrary component, "Housing Info". This "Housing Info" is "modal" since it hides everything behind but you do not feel it as
   a dialog. Next you can popup more by clicking "Trading Info" at the top-right. You can not go nowhere except clicking at "X" button to return. See code details at <a href="https://github.com/coolshare/ReactReduxPattern/blob/master/src/components/StackViewContainer.js">/components/StackViewContainer.js</a>. Invokation is easy as
   cs.popup(MyComponent, "MyComponent");
   
- <b>Wrapper for Redux</b><br>
   **Problem**: Redux does a simple pub/sub. All the reducers and subscribers will be invoke for any dispatching (This is really not efficient at all. I am wondering
   why they don't use type to map the listeners so that not all the listeners are called for each single action dispatching). 
   So you have to place if statement in all the subscribers to only let the corresponding invocation through.
   **Solution**: I wrote a wrapper, "subscribe" to hide the filtering within the wrapper. See code details at <a href="https://github.com/coolshare/ReactReduxPattern/blob/master/src/services/CommunicationService.js">/services/CommunicationService.js</a>;   
   
- <b>Pub/sub Pattern</b><br>
   **Problem**: In some case, you want to handle a dispatching in a variety of places/components instead of reducers, specially when the dispatching may not impact just
   state. But Redux never upates variables like LastAction when Redux can not find a reducer. So you can not even identify that a dispatching is sent to whom in a subscriber (listener) since the action is never saved anywhere.
 of action. <br/><br/> 
   **Solution**: I add a middleware to collect the action before all the listeners are invoked and then use the collected action in the listeners. In this way, you can handle a dispatched action anywhere out side reducer.
   
      
/**** here are some commonly used ones***/

 - <b>A general web UI layout</b>: 
 
   1). top links to divide business concept into multiple area ("Main" and "Second")<br />
   2). tabs to further divide an area into sub areas<br />
   3). accordions at the right side (in TabA) to provide management UI for different features<br />
   4). master/detail layout to provide an editing environment to handle collection data (Right pane in TabA)<br />
   5). other type of UI like map<br />  
 
 - <b>React patterns</b>. the following patterns are used in the application
 
   1). *Container/Component*. It is used under /components/Patterns: all the components are written with this pattern.<br/>
   2). *State hoisting and Stateless function (pure function)*: Events are changes in state. Their data needs to be passed to stateful container components parents. Example (in VideoContainer.js and VideoComponent.js):
   
	   The event handler resides in VideoContainer and VideoComponent hoists the data entered by users to
	   VideoContainer:
	   
	   class _VideoContainer extends React.Component {
	   		handlePeriod(s) {
				...		
			}
			render() {
				...
			    return (
	   				< VideoComponent  handlePeriod={this.handlePeriod.bind(this)}}... />
	   				...
	   			}
	   		} 
    	export default class VideoComponent extends React.Component{
    		render() {
			  	...
	    		return (
	      			<select onChange={(e)=>this.props.handlePeriod(e.target.value)}>
						...
	        		</select>
	        	}
	       }
    	}
   and VideoComponent is a stateless "function".
   
   3). *conditional rendering*. The is an alternative of routing to show different content/page. Example (in MapContainer.js):
   
		class _MapContainer extends Component {
			...
			render() {
			    return (
			    	...
				    	{(this.props.currentMap==="GoogleMap") && <div><center><div>Some bus stops in SF</div></center><GoogleMapContainer style={{"minHeight":"400px"}}/></div>}
				    	{(this.props.currentMap==="MapBox") && <MapBoxContainer style={{"minHeight":"400px"}}/>}				    				...
			    )
			}
		}
	
		const MapContainer = connect(
				  store => {
					    return {
					    	currentMap: store.MapContainerReducer.currentMap
					    };
					  }
					)(_MapContainer);
		export default MapContainer
	
   4).*Render Callbacks*: a function passed as a prop to a component, which allows that component to render something
   		A common use-case of a render callback was to allow a child to render something using data it did not receive in props.
   	Example (RightPane.js)
   	
   		class _RightPane extends React.Component{
			render(){
				let ChildPane = ({ children  }) => children (this.props.currentPage)
				return (
					 <div>
					 	<ChildPane>
					 		{id=>id==="TodoList"?<TodoList/>:id==="HousingInfo"?<HousingInfo/>:null}
					 	</ChildPane>
					 </div>
				)
			}
		}

The goal of this _RightPane is to display <TodoList/> or <HousingInfo/> according this.props.currentPage passed by the parent container (<FormTableContainer>). We first declare ChildPane as a "function" which access another function (children) as parameter and then invoke the function(children passed as parameter) inside ChildPane. ChildPane is used in the render content where Children receives its function parameter (children) as 
		{id=>id==="TodoList"?<TodoList/>:id==="HousingInfo"?<HousingInfo/>:null}
Then this function is invoke as

        children (this.props.currentPage)
        
where id above is this.props.currentPage. What is good on this pattern? The benefit is that ChildPane can be used somewhere else with different content instead of "{id=>id==="TodoList"?<TodoList/>:id==="HousingInfo"?<HousingInfo/>:null}" with the "this.props.currentPag" built-in like a closure.

 5).*Proxy Component*: Wrapping a component with attributes and reuse it.
   
   Example (in TodoList.js)
   
    const Td = props => <td style={{"width":"33%", "border": "1px solid black"}} {...props}/>
		
    class _TodoList extends React.Component{
       ...
        render(){
          ...
            return (		                                    
                <tr  key={index} style={{"background":"#FFF"}}>
                <Td>{todo.id}</Td>
                <Td>{todo.text}</Td>
                <Td> <input style={{"marginLeft":"10px"}} 
                  ...
	   			
        }
    }
    			
   5).*Proxy Component*: a higher-order component is a function that takes a component and returns a new component.
   
   Example (in TodoList.js)   
   
 - <b>Basic function/feature</b> of Redux: connect of React-redux, middleware, dispatching actions, subscription and so on. 
   This kit uses a pure Redux pattern in the area communication and view update so no "setState" is used except local    
   state like input content state impact button enable state. 

 - <b>Other</b> the 3nd-party lib are used included:
 
   mapbox-gl, googlemap, react-data-grid, infinite-tree, react-image-gallery, react-tabs, react-youtube 
 
   
<b>C. Instructions for installation</b>

1. download the zip file of this package and unzip it to, say c:\ReactReduxStarterKit<br/>
   or simply run the following<br/>
   
      cd c:\
      git clone https://github.com/coolshare/ReactReduxPatterns.git ReactReduxPatterns<br/>
      
2. install environment

      cd c:\ReactReduxPatterns<br/>
      npm install
      
3. run the application

      npm start
      
4. build a production version

      webpack -p
      
      
   
Go Mark's home page http://MarkQian.com to see more.