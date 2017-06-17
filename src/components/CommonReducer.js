import cs from '../services/CommunicationService'
import ns from '../services/NodeService'

const CommonReducer = (state = {'appLoaded':false}, action) => {
  switch (action.type) {
  	case '_CALLBACK_':
  		action.options.callback(action.options.action);
  		return state;
  	case 'AppLoaded':
  		return Object.assign({}, state, {
  			appLoaded: true
        })
  	case 'fetchMultiDone':
  		return state;  	
  	case 'RemoteService':
  		let options = action.options;
  		
  		//In case of forward
  		if (options.options.actionType !==undefined) {
  			action.asyncDispatch({"type":options.options.actionType, "data": options.data});
  		}
  		//If stateField is specified, we set the field with the response data
  		if (options.options.stateField!==undefined) {
  			let modifiedFields = {};
  			modifiedFields[options.options.stateField] = options.data
  	  		let res = Object.assign({}, state, modifiedFields)
  	  		return res
  		}
  		return state;
    default:
      return state
  }
  function collectVolume(data) {
	  let res = {};
	  let v = data.Volumes;
	  for (var i=0; i<v.length; i++) {
		  var volume = v[i];
		  for (var j=0; j<volume.Attachments.length;j++) {
			  var vv = volume.Attachments[j];
			  if (res[vv.InstanceId]===undefined) {
				  res[vv.InstanceId] = []
			  }
			  res[vv.InstanceId].push(volume);
		  }
	  }
	  return res;
  }
  function collectInstance(data) {
	  let res = {};
	  let list = data.Instances.Reservations
	  for (let i=0; i<list.length;i++) {
		  let reservation = list[i];
		  for (let j=0; j<reservation.Instances.length;j++) {
			  let instance = reservation.Instances[j];
			  let regionId = instance.Placement.AvailabilityZone;
			  regionId = regionId.substring(0,regionId.length-1)
			  if (res[regionId]===undefined) {
				  res[regionId] = []
			  }
			  res[regionId].push(instance);
		  }
	  }
	  return res;
  }
  function collectRegions(data) {
	  let res = {};
	  for (let i=0; i<data.Regions.Regions.length;i++) {
		  let region = data.Regions.Regions[i];
		  region["geo"] = regionGEO[region.RegionName]
		  res[region.RegionName] = region;
	  }
	  return res;
  }
  
  function collectDataCenter(data) {
	  let res = {};
	  for (let i=0; i<data.DataCenters.length;i++) {
		  let dc = data.DataCenters[i];
		  res[dc.name] = dc;
	  }
	  return res;
  }

}



export default CommonReducer