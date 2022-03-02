import React from "react";


import Frontpage from "./Component/Frontpage";

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInPage from "./Component/Sign_in_page";


function App() {

  return (
    <div >
      {/* <Grids /> */}

      {/* <Login /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />}></Route>
          <Route path="/frontpage" element={<Frontpage />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
  //  <div>
  //     <Header></Header>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Home />}></Route>
  //         <Route
  //           path="/restaurantDetails/:rName"
  //           element={<RestaurantDetails />}
  //         ></Route>
  //         <Route path="/filter" element={<Filter />}></Route>
  //         <Route path="/filter/:pageNo" element={<Filter />}></Route>
  //         <Route path="/filter/:pageNo/:mealType" element={<Filter />}></Route>
  //       </Routes>
  //     </BrowserRouter>
  //   </div>
  // )