import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/ui/Layout';
import Login from './components/auth/Login';
import tokenAuth from './config/token';

const token = localStorage.getItem('token');
if ( token ) tokenAuth(token);

function App() {
  return (
     <Layout>
        <Login />
     </Layout>
  );
}

export default App;
