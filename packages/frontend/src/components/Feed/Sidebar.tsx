import React from 'react';
import Suggestions from '../Sidebar/Suggestions';
import User from '../Sidebar/User';

const Sidebar = () => {
  return (
    <div className="p-4">
      <User />
      <Suggestions />
    </div>
  );
};

export default Sidebar;
