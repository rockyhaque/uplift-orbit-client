import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import JobDetails from "../pages/JobDetails/JobDetails";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJob from "../pages/MyPostedJob/MyPostedJob";
import UpdateJob from "../pages/UpdateJob/UpdateJob";
import PrivateRoute from "./PrivateRoute";
import MyBids from "../pages/MyBids/MyBids";
import BidRequests from "../pages/BidRequests/BidRequests";
import AllJobs from "../pages/AllJobs/AllJobs";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
            path: "/job/:id",
            element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
            loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
        },
        {
            path: "/update/:id",
            element: <PrivateRoute><UpdateJob></UpdateJob></PrivateRoute>,
            loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
        },
        {
          path: "/addJob",
          element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
        },
        {
          path: "/myPostedJob",
          element: <PrivateRoute><MyPostedJob></MyPostedJob></PrivateRoute>
        },
        {
          path: "/myBids",
          element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
        },
        {
          path: "/bidRequests",
          element: <PrivateRoute><BidRequests></BidRequests></PrivateRoute>
        },
        {
          path: "/jobs",
          element: <AllJobs></AllJobs>
        }
      ]
    },
  ]);