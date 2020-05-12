import React, {useEffect , createContext , useContext,useReducer} from 'react';

import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';

import {reducer , intialState} from './reducers/userReducer'
import Home from "./components/screens/Home";
import Login from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import CreatePost from './components/screens/CreatePost';

export const UserContext = createContext()

const Routing =()=>{ 
  const history = useHistory()
  const {state ,dispatch} = useContext(UserContext)
   useEffect(()=>
  {
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  if(user)
  {
    dispatch({type:"USER", payload : user})
  }
  else{
    history.push('/signin')
  }
  },[])
  return (
    <Switch>
    <Route exact path="/">
    <Home />
  </Route>
  <Route path="/signup">
    <Signup />
  </Route>
  <Route path="/signin">
    <Login />
  </Route>
  <Route path="/profile">
    <Profile />
  </Route>
  <Route path="/create">
  <CreatePost/>

  </Route>
  </Switch>

  )
}



function App() {

  const [state ,dispatch] = useReducer(reducer,intialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
          <BrowserRouter>
      <Navbar />
      <Routing/>
    
    </BrowserRouter>

    </UserContext.Provider>


  );
}

export default App;
