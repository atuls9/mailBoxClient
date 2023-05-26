import "./App.css";
import Registration from "./components/pages/Registration";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Profile from "./components/pages/Profile";
import ForgetPassword from "./components/pages/ForgetPassword";
import Compose from "./components/Compose";
import { useSelector, useDispatch } from "react-redux";
import LandingPage from "./components/pages/LandingPage";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { authActions } from "./components/store/auth";

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
  });
  // const email = useSelector((state) => state.auth.email);
  // let emaliRegEx;

  // useEffect(() => {
  //
  //   if (auth) {
  //     emaliRegEx = localStorage.getItem("email").replace(/[^a-zA-Z0-9 ]/g, "");
  //     axios
  //       .get(
  //         `https://mailboxclient-24879-default-rtdb.firebaseio.com/${emaliRegEx}/received.json`
  //       )
  //       .then((res) => {
  //         console.log(" getdata", res);
  //         if (res.data) {
  //           const firebaseIDs = Object.keys(res.data);
  //           console.log("firebaseIDs", firebaseIDs);
  //           const newItems = [];
  //           Object.values(res.data).forEach((el) => {
  //             console.log("el.body", el.body);

  //             newItems.push({
  //               ...el.body,
  //               id: firebaseIDs[newItems.length],
  //               key: firebaseIDs[newItems.length],
  //             });
  //           });
  //           console.log("newItems", newItems);
  //           dispatch(receivedActions.getReceivedMail(newItems));
  //         }
  //         // dispatch(expenseActions.getItems(newItems));
  //       });
  //   }
  // }, [auth]);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path={"/profile"}>
          <Profile />
        </Route>
        <Route exact path={"/composemail"}>
          {auth && <Compose />}
        </Route>
        <Route exact path={"/"}>
          {!auth && <Registration />}
          {auth && <LandingPage />}
        </Route>
        <Route path={"/forgetpassword"}>
          <ForgetPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
