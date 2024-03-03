import React from "react";

function Loader() {
  return (
    <div className="loader relative w-100 h-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div id="div1" className="animate-div"></div>
      <div id="div2" className="animate-div -delay-400"></div>
      <div id="div3" className="animate-div -delay-800"></div>
      <div id="div4" className="animate-div -delay-1200"></div>
      <div id="div5" className="animate-div -delay-1600"></div>
    </div>
  );
}

export default Loader;
