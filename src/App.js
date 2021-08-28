import Header from "./components/layout/Header";
import Content from "./components/layout/Contents";
import Footer from "./components/layout/footer";
import 'antd/dist/antd.css';
import { Layout } from "antd";
import Login from "./components/layout/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Registration from "./components/layout/Registration";
import User from "./components/layout/User";
import ForgotPassword from "./components/layout/ForgotPassword";
import { useHistory } from "react-router";


function App() {
  const history = useHistory();

  if(localStorage.getItem("tokenAuthen") === undefined){
    history.push("/login");
  }
  // if(localStorage.getItem("tokenAuthen") === null){
  //   history.push("/login");
  // }
  return (

    <>
      <Router>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/registration">
            <Registration/>
          </Route>

          <Route path="/user">
            <User/>
          </Route>

          <Route path="/forgot-password">
            <ForgotPassword/>
          </Route>

          <Route path="/">
            <Layout style={{ width: '100%' }}>
              <Header style={{width:100 , marginTop:1000}} index="2"/>
              <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }} />
              <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
          </Route>
        </Switch>
      </Router>

    </>



  );
}

export default App;
