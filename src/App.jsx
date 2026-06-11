import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import UsersList from "./pages/UsersList";
import AddUser from "./pages/AddUser";
import UserDetail from "./pages/UserDetail";
import Posts from "./pages/Posts";
import PostPerUser from "./pages/PostPerUser";
import PostsChart from "./pages/PostsChart";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts-user/:id" element={<PostPerUser />} />
        <Route path="/chart" element={<PostsChart />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;