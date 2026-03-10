import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import FeaturedPage from "./pages/FeaturedPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import CollectionsPage from "./pages/CollectionsPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="favorites" element={<FeaturedPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:cuisine" element={<CategoryDetailPage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
