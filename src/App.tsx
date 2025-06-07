import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Repositories from './pages/Repositories';
import Profile from './pages/Profile';
import Branches from './pages/Branches';
import GraphQLMutations from './pages/GraphQLMutations';
import CreateRepository from './pages/CreateRepository';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Repositories />} />
          <Route path="profile" element={<Profile />} />
          <Route path="branches" element={<Branches />} />
          <Route path="mutations" element={<GraphQLMutations />} />
          <Route path="create-repo" element={<CreateRepository />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
