import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Hero } from "./Page";
import Nav from "./components/Nav";
import Chat1 from "./Page/Chat1";
import Register from "./Page/Register";
import Login from "./Page/Login";
import TranslateButton from "./components/TranslateButton";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoutes";
import NotFound from "./Page/NotFound";
import Profile from "./Page/Profile";
import Chat2 from "./Page/Chat2";
import Chat3 from "./Page/Chat3";
import Chat4 from "./Page/Chat4";

const Loading = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
    <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
  </div>
);

const ScrollToAboutUs = ({ setLoading }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#about-us") {
      setLoading(true);
      setTimeout(() => {
        window.location.href = "/#about-us";
        setLoading(false);
      });
    }
  }, [location, setLoading]);

  return null;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Router>
      {loading && <Loading />}
      <Nav />
      <TranslateButton />
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToAboutUs setLoading={setLoading} />

      <Routes>
        <Route path="/" element={<Hero />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/chat-1" element={<Chat1 />} />
          <Route path="/chat-2" element={<Chat2 />} />
          <Route path="/chat-3" element={<Chat3 />} />
          <Route path="/chat-4" element={<Chat4 />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
