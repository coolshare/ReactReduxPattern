import { combineReducers } from 'redux'
import TodoReducer from './MainPage/FormTable/TodoList/TodoReducer'
import MainRightPaneReducer from './MainPage/FormTable/MainRightPaneReducer'
import MainContainerReducer from './MainPage/MainContainerReducer'
import HousingReducer from './MainPage/FormTable/HousingInfo/HousingReducer'
import TradingReducer from './MainPage/FormTable/TradingInfo/TradingReducer'
import TopLinkReducer from './TopLinkReducer'
import MapContainerReducer from './MainPage/Maps/MapContainerReducer'
import GoogleMapReducer from './MainPage/Maps/GoogleMap/GoogleMapReducer'
import PatternsRightPaneReducer from './Patterns/RightPane/PatternsRightPaneReducer'
import CommonReducer from './CommonReducer'
const ReducerManager = combineReducers({
  TodoReducer,
  MainRightPaneReducer,
  MainContainerReducer,
  TopLinkReducer,
  HousingReducer,
  TradingReducer,
  MapContainerReducer,
  GoogleMapReducer,
  PatternsRightPaneReducer,
  CommonReducer
})

export default ReducerManager