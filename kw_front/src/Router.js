import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./common/Navigation";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Navigation />
        </div>
        <div>
          <Routes>
            <Route />
            <Route />
            <Route />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Router;
