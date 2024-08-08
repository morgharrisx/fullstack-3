// import React from 'react';
// import './BentoGrid.css'; 

// function BentoGrid() {
//     return (
//       <div className="wrapper">
//         <div className="grid1"></div>
//         <div className="grid2"></div>
//         <div className="grid3"></div>
//         <div className="grid4"></div>
//         <div className="grid5"></div>
//         <div className="grid6"></div>
//         <div className="grid7"></div>
//         <div className="grid8"></div>
//         <div className="grid9"></div>
//         <div className="grid10"></div>
//         <div className="grid11"></div>
//       </div>
//     );
//   }

// export default BentoGrid;


import React from 'react';
import './BentoGrid.css';

function BentoGrid() {
  return (
    <div className="container">
      <div className="row row-1">
        <div className="col">
          <div className="col-box"></div>
          <div className="col-box"></div>
        </div>
        <div className="col col-2">
          <div className="col-box"></div>
          <div className="col-box"></div>
        </div>
      </div>
      <div className="row row-2">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
      <div className="row row-3">
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </div>
  );
}

export default BentoGrid;