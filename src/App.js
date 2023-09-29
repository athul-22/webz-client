import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import {Home, Login, Profile, Register, ResetPassword} from './pages';
import { useSelector } from "react-redux";

//✅ TO CHECK WEATHER USER HAVE A TOKEN OR NOT - IF NOT REDIRECT TO LOGIN PAGE 
function Layout() {
  const {user} = useSelector(state => state.user);
  const location = useLocation();

  console.log(user);

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )

}

function App() {
  const { theme } = useSelector((state)=> state.theme)
  console.log(theme);

  return (
    <div data-theme={theme} className="w-full min-h-[100vh">
      {/* <p className="text-blue"> Hello World</p> */}
      <Routes>
        {/* WITH TOKEN ACCESS ONLY USER CAN ACCESS THIS WRAPPED ROUTES */}
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id?" element={<Profile />} />
        </Route>
        {/* COMMON ROUTES FOR ALL USERS */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
