import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import AddPost from './pages/Post/AddPost';
import SinglePost from './pages/Post/SinglePost';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/post" element={<AddPost />} />
            <Route exact path="/singlepost/:id" element={<SinglePost />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
