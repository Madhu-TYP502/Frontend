import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './Pages/LoginForm';
import Layout from './Components/layout/Layout';
import Missing from './Components/layout/Missing';
import AdminLayout from './Components/layout/AdminLayout';
import SupervisorLayout from './Components/layout/SupervisorLayout';
import TrainerLayout from './Components/layout/TrainerLayout';
import RequiredAuth from './Components/RequiredAuth';
import Unauthorized from './Components/layout/Unauthorized';

const ROLES =
{
  'ADMIN' : 'admin',
  'SUPERVISOR':'supervisor',
  'TRAINER':'trainer'
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<LoginForm />} />

        {/* Protected routes */}
        <Route element = {<RequiredAuth allowedRoles={[ROLES.ADMIN]}/>}>
        <Route path="admin" element={<AdminLayout/>} />
        </Route>
        
        <Route element = {<RequiredAuth allowedRoles={[ROLES.SUPERVISOR]}/>}>
        <Route path="supervisor" element={<SupervisorLayout />} />
        </Route>

        <Route element = {<RequiredAuth allowedRoles={[ROLES.TRAINER]}/>}>
        <Route path="trainer" element={<TrainerLayout />} />
        </Route>

        <Route path="unauthorized" element={<Unauthorized/>} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing/>} />

    </Routes>
  );
}

export default App;