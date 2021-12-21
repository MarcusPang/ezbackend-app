import React from 'react';
import Suggestions from '../Sidebar/Suggestions';
import SidebarUser from '../Sidebar/User';

const Sidebar = () => {
  return (
    <div className="p-4">
      <SidebarUser />
      <Suggestions />
    </div>
  );
};

export default Sidebar;
