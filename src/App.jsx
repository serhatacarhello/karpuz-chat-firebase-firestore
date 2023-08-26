import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./pages/auth/Registration";
import Home from "./pages/home";
import Profile from "./pages/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Registration />} />
        <Route path="/" index element={<Home />} />
        <Route path="/profile" index element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
