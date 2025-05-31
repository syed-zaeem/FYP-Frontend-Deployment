import { Page } from "./dashboard/page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import TrendingTopics from "./Pages/TrendingTopics";
import Charts from "./Pages/Charts";
import Home from "./Pages/Home";
import Home_CustomTopics from "./Pages/Home_CustomTopics";
import Admin_HomePage from "./pages/Admin_HomePage";
import Admin_Users from "./pages/Admin_Users";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CustomerAccountInfo from "./pages/CustomerAccountInfo";
import CustomerSubscriptionsPage from "./pages/CustomerSubscriptionsPage";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout() {
  return (
    <>
      {/* Sidebar, Navbar, or other layout components */}
      <Navbar />
      <main>
        <Outlet /> {/* Nested routes will render here */}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/" element={<CustomerSubscriptionsPage />} /> */}
            <Route exact path="/TrendingTopics" element={<TrendingTopics />} />
            <Route exact path="/Charts" element={<Charts />} />
            <Route exact path="/CustomTopics" element={<Home_CustomTopics />} />
            <Route
              exact
              path="/AccountSettings"
              element={<CustomerAccountInfo />}
            />
          </Route>

          <Route exact path="/Register" element={<Signup />} />
          <Route exact path="/Login" element={<Login />} />

          <Route exact path="/Admin" element={<Page />}>
            <Route exact path="/Admin/Dashboard" element={<Admin_HomePage />} />
            <Route exact path="/Admin/Users" element={<Admin_Users />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}
