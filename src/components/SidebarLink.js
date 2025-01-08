import React from 'react';

const SidebarLink = ({ icon: Icon, text, active }) => (
    <div className={`flex items-center gap-3 px-6 py-3 cursor-pointer rounded-r-full ${
      active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
    }`}>
      <Icon className="w-5 h-5" />
      <span className="font-bold">{text}</span>
    </div>
  );

  export default SidebarLink;


