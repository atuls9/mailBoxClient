import "./App.css";
import Registration from "./components/pages/Registration";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Profile from "./components/pages/Profile";
import ForgetPassword from "./components/pages/ForgetPassword";
import Compose from "./components/Compose";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/profile"}>
          <Profile />
        </Route>
        <Route exact path={"/composemail"}>
          {auth && <Compose />}
        </Route>
        <Route exact path={"/"}>
          <Registration />
        </Route>
        <Route path={"/forgetpassword"}>
          <ForgetPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
