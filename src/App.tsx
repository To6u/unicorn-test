import React from "react";
import "./App.sass";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import Catalog from "./components/Catalog";
import Basket from "./components/Basket";

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="App">
        <Header className="header">
          <Link to="/">Юникорн</Link>
          <Basket />
        </Header>
        <Content>
          <Switch>
            <Route path={`/category/:idCategory/product/:idProduct`}>
              <Catalog />
            </Route>
            <Route path={`/category/:idCategory`}>
              <Catalog />
            </Route>
            <Route path="/">
              <Catalog />
            </Route>
          </Switch>
        </Content>
        <Footer>Тестовое задание Юникорн</Footer>
      </Layout>
    </Router>
  );
};

export default App;
