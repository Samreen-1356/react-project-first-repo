import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import UsersList from "./pages/UsersList";
import AddUser from "./pages/AddUser";
import UserDetail from "./pages/UserDetail";
import Posts from "./pages/Posts";
import PostPerUser from "./pages/PostPerUser";
import PostsChart from "./pages/PostsChart";
import Settings from "./pages/Settings";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import PostSearch from "./Pages/PostSearch";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts-user/:id" element={<PostPerUser />} />
        <Route path="/chart" element={<PostsChart />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/post-search" element={<PostSearch />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;