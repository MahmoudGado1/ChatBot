import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero } from "./Page";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Chat1 from "./Page/Chat1";
import Chat2 from "./Page/Chat2";
import Chat3 from "./Page/Chat3";
import Chat4 from "./Page/Chat4";
import Register from "./Page/Register";
import Login from "./Page/Login";
import TranslateButton from "./components/TranslateButton"; // Import Translate Button
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoutes";
import NotFound from "./Page/NotFound";
import Profile from "./Page/Profile";

const App = () => {
  return (
    <Router>
      <Nav />
      <TranslateButton /> {/* ✅ Add Translate Button Here */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
      <Route path="/" element={<Hero />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/chat-1" element={<Chat1 />} />
          <Route path="/chat-2" element={<Chat2 />} />
          <Route path="/chat-3" element={<Chat3 />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/chat-4" element={<Chat4 />} />
        </Route>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />

    </Router>
  );
};

export default App;
