import { Routes, Route } from "react-router-dom";
import HomePage from "./page/homepage";
import SiginPage from "./page/signin";
import SignupPage from "./page/signup";
import { useEffect } from "react";
import { getAuthToken } from "./lib/api";
import NotFound from "./page/notfoud";

function App() {
  const getUser = async () => {
    const authToken = await getAuthToken();
    localStorage.setItem("authToken", authToken);
  };
  useEffect(() => {
    const authToken = localStorage.getItem("authToken") as string;
    if (!authToken) {
      getUser();
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/signin" element={<SiginPage />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
