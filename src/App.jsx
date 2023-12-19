import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NoteContextProvider from "./Context/NoteContext";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element:<ProtectedRoute><Layout /></ProtectedRoute> ,
      children: [
        { index: true, element: <Home /> },
       
      ],
      
    },
    { path: "/Login", element: <Login /> },
    { path: "/signup", element: <Register /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <UserContextProvider>
        <NoteContextProvider>
        <RouterProvider router={router}></RouterProvider>
        </NoteContextProvider>
      </UserContextProvider>
    </>
  );
}
