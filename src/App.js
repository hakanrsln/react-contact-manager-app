import React from 'react';
import Navbar from './conponents/Navbar';
import './App.css';
import {Routes, Route, Navigate } from 'react-router-dom';
import ContactList from './conponents/ContactList';
import AddContact from './conponents/AddContact';
import ViewContact from './conponents/ViewContact';
import EditContact from './conponents/EditContact';


function App() {
  return (
    <div >
     
      <Navbar />
      <Routes>
        <Route path={'/react-contact-manager-app'} element={<Navigate to={'/contacts/list'} /> } />
        <Route path={'/contacts/list'} element={<ContactList />} />
        <Route path={'/contacts/add'} element={<AddContact />} />
        <Route path={'/contacts/view/:contactId'} element={<ViewContact />} />
        <Route path={'/contacts/edit/:contactId'} element={<EditContact  />} />
      </Routes>
      
    </div>
  );
}

export default App;
