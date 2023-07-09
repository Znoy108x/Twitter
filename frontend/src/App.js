import {BrowserRouter as Router , Routes , Route , useNavigate} from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Bookmark from "./pages/Bookmark"
import NotFound from "./pages/NotFound"
import Explore from "./pages/Explore"
import TrendingTags from "./pages/TrendingTags"
import Discover from "./pages/Discover"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/Register"
import EditProfile from "./pages/EditProfile"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/auth" element={<ProtectedRoute fromAuth = {true}><Auth/></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}  />
        <Route path="/message" element={<ProtectedRoute><NotFound/></ProtectedRoute>}  />
        <Route path="/notifications" element={<ProtectedRoute><NotFound/></ProtectedRoute>}  />
        <Route path="/bookmark" element={<ProtectedRoute><Bookmark/></ProtectedRoute>}  />
        <Route path="/explore" element={<ProtectedRoute><Explore/></ProtectedRoute>}  />
        <Route path="/explore/trending/:tagName" element={<ProtectedRoute><TrendingTags/></ProtectedRoute>}  />
        <Route path="/discover" element={<ProtectedRoute><Discover/></ProtectedRoute>}  />
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>}  />
        <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>}  />
      </Routes>
    </Router>
  );
}
export default App;
