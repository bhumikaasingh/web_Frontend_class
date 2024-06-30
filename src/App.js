import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Homepage from './pages/homepage/Homepage';
import Navbar from './components/Navbar';
import Registerpage from './pages/registerpage/Registerpage';
import Loginpage from './pages/loginpage/Loginpage';
import AdminDashboard from './pages/admin/AdminDashboard';

//toast config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminUpdate from './pages/admin/AdminUpdate';
import AdminRoutes from './protected_routes/UserRoutes';
import UserRoutes from './protected_routes/UserRoutes';
import Profile from './pages/profile/Profile';
import ForgotPassword from './pages/forgot_password/ForgotPassword';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Registerpage />} />
        <Route path='/login' element={<Loginpage />} />


        {/* Profile- make a page and route */}
        <Route element={<UserRoutes />}>
          <Route path='/profile' element={<Profile />}></Route>
        </Route>


        {/* Admin Routes */}
        <Route element={<AdminRoutes />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/update/:id' element={<AdminUpdate />} />
        </Route>



        {/* Forgot password*/}
        <Route path='/forgot_password' element={<ForgotPassword/>}></Route>




        
      </Routes>
    </Router>
  );
}
export default App;
