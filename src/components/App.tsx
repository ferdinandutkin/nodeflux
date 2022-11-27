import React from 'react';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {NodeEditor} from "./NodeEditor";
import {Logs} from "./Logs"
import {Login} from "./Login";
import {Layout} from "./Layout";
import {Bots} from "./Bots";
import {Register} from "./Register";
import {RedirectIfNotAuthenticated} from "./routing/RedirectIfNotAuthenticated";
import {RedirectIfAuthenticated} from "./routing/RedirectIfAuthenticated";
import {AllBots} from "./AllBots";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={
                          <RedirectIfNotAuthenticated to="/login">
                              <Bots/>
                          </RedirectIfNotAuthenticated>} />
                  <Route path="all-bots" element={
                      <RedirectIfNotAuthenticated to="/login">
                          <AllBots/>
                      </RedirectIfNotAuthenticated>}
                  />
                  <Route path="editor" element={
                          <RedirectIfNotAuthenticated to="/login">
                              <NodeEditor />
                          </RedirectIfNotAuthenticated>} >
                      <Route path=":botId" element={
                          <RedirectIfNotAuthenticated to="/login">
                            <NodeEditor />
                          </RedirectIfNotAuthenticated>}/>
                  </Route>
                  <Route path="logs" element={
                      <RedirectIfNotAuthenticated to="/login">
                          <Logs />
                      </RedirectIfNotAuthenticated>} >
                      <Route path=":botId" element={
                          <RedirectIfNotAuthenticated to="/login">
                              <Logs />
                          </RedirectIfNotAuthenticated>}/>
                  </Route>
                  <Route path="login" element={
                      <RedirectIfAuthenticated to='/bots'>
                          <Login/>
                      </RedirectIfAuthenticated>
                  } />
                  <Route path="register" element={
                      <RedirectIfAuthenticated to='/bots'>
                        <Register/>
                      </RedirectIfAuthenticated>
                  }/>
                  <Route path="bots" element={
                      <RedirectIfNotAuthenticated to="/login">
                          <Bots/>
                      </RedirectIfNotAuthenticated>
                      }/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
