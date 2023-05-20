import "./App.css";
import Registration from "./components/pages/Registration";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Profile from "./components/pages/Profile";
import ForgetPassword from "./components/pages/ForgetPassword";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/profile"}>
          <Profile />
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
