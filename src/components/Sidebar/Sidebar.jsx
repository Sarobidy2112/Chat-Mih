import React, { useState } from 'react';
import './style.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <main className="main">
      <div className={`sideBar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="logo">
          <i className="fas fa-comments icon-logo"></i>
          {!isCollapsed && <span className="name-logo">Chat Mih</span>}
        </div>

        {!isCollapsed && (
          <div className="sidebar-list scrollable">
            {[...Array(5)].map((_, index) => (
              <div className="content" key={index}>
                <h4 className="date">Mon 07-30-2025</h4>
                <ul className="content-list">
                  <li>Calcul vectoriel et matriciel</li>
                  <li>404 Error not Found</li>
                  <li>Calcul Probabilité et statistique</li>
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="logout">
          <i className="fas fa-sign-out-alt icon-logout"></i>
          {!isCollapsed && <span>Logout</span>}
        </div>
      </div>
      <i 
        className="fa-solid fa-ellipsis-vertical menu" 
        onClick={() => setIsCollapsed(!isCollapsed)}
      ></i>
    </main>
  );
};

export default Sidebar;


// import React from 'react'
// import './index.css'
// const sidebar = () => {

//   return (
//     <main className="main">
//         <i className="fa-solid fa-ellipsis-vertical menu"></i>
//         <div className="sideBar">
//             <div className="logo">
//                 <i className="fas fa-comments icon-logo"></i>
//                 <span className="name-logo">Chat Mih</span>
//             </div>

//             <div className="sidebar-list scrollable">
//                 <div className="content">
//                     <h4 className="date">Mon 07-30-2025</h4>
//                     <ul className="content-list">
//                         <li>Calcul vectoriel et matriciel</li>
//                         <li>404 Error not Found</li>
//                         <li>Calcul Probabilité et statistique</li>
//                     </ul>
//                 </div>
//                 <div className="content">
//                     <h4 className="date">Mon 07-30-2025</h4>
//                     <ul className="content-list">
//                         <li>Calcul vectoriel et matriciel</li>
//                         <li>404 Error not Found</li>
//                         <li>Calcul Probabilité et statistique</li>
//                     </ul>
//                 </div>
//                 <div className="content">
//                     <h4 className="date">Mon 07-30-2025</h4>
//                     <ul className="content-list">
//                         <li>Calcul vectoriel et matriciel</li>
//                         <li>404 Error not Found</li>
//                         <li>Calcul Probabilité et statistique</li>
//                     </ul>
//                 </div>
//                 <div className="content">
//                     <h4 className="date">Mon 07-30-2025</h4>
//                     <ul className="content-list">
//                         <li>Calcul vectoriel et matriciel</li>
//                         <li>404 Error not Found</li>
//                         <li>Calcul Probabilité et statistique</li>
//                     </ul>
//                 </div><div className="content">
//                     <h4 className="date">Mon 07-30-2025</h4>
//                     <ul className="content-list">
//                         <li>Calcul vectoriel et matriciel</li>
//                         <li>404 Error not Found</li>
//                         <li>Calcul Probabilité et statistique</li>
//                     </ul>
//                 </div>
//             </div>

//             <div className="logout">
//                 <i className="fas fa-sign-out-alt icon-logout"></i>
//                 <span>Logout</span>
//             </div>
//         </div>
//     </main>
//   )
// }

// export default sidebar