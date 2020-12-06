import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavbar from "./components/navbar/navbar";
import React from "react";
import Main from "./components/main/main";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Login from "./components/auth/login/login";
import Signup from "./components/auth/signup/signup";
import Dashboard from "./components/dashboard/dashboard";
import axio from "axios";
import { loadUser } from "./actions/auth.action";
import { useDispatch, useSelector } from "react-redux";
import PrivateRouter from "./routing/privatroute";
import CreateProfile from "./components/dashboard/createProfile/create_profile";
import EditProfile from "./components/dashboard/editProfile/edit_profile";
import AddExperience from "./components/dashboard/addExperience/add_experience";
import AddEducation from "./components/dashboard/addEducation/addEducaton";
import Profiles from "./components/profiles/profiles";
import Profile from "./components/profiles/profile/profile";
import Posts from "./components/posts/posts";
import Post from "./components/posts/post/post";
import AddPost from "./components/posts/addPost/AddPost";

function App(props) {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => {
    return state.auth.isAuth;
  });

  return (
    <div>
      <MyNavbar />
      <Route path="/" exact component={Main}></Route>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/signup" exact component={Signup}></Route>
      <PrivateRouter
        path="/dashboard"
        exact
        component={Dashboard}
      ></PrivateRouter>
      <PrivateRouter
        path="/create-profile"
        exact
        component={CreateProfile}
      ></PrivateRouter>
      <PrivateRouter
        path="/edit-profile"
        exact
        component={EditProfile}
      ></PrivateRouter>
      <PrivateRouter
        path="/add-experience"
        exact
        component={AddExperience}
      ></PrivateRouter>
      <PrivateRouter
        path="/add-education"
        exact
        component={AddEducation}
      ></PrivateRouter>
      <Route path="/profiles" exact component={Profiles}></Route>
      <Route path="/profile/:id" exact component={Profile}></Route>
      <PrivateRouter path="/posts" exact component={Posts}></PrivateRouter>
      <PrivateRouter path="/post/:id" exact component={Post}></PrivateRouter>
      <PrivateRouter path="/add-post" exact component={AddPost}></PrivateRouter>
    </div>
  );
}

export default withRouter(App);
