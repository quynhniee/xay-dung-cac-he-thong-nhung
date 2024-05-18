import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import the necessary components
import { Dashboard } from './layouts/Dashboard'; // Import the Dashboard component
import Layout, {Content} from "antd/es/layout/layout";
import {Navigation} from "./components/Navigation";
import Home from "./layouts/Home";
import {useEffect} from "react";


function App() {

    async function getData() {

    }
    useEffect(() => {
        getData()
    }, []);
  return (
    <Router>
      <div className="App">
        <Layout>
            <Navigation/>
          <Content  style={{ padding: '0 48px', minHeight: '100vh' }}>
            <Routes>
              <Route index element={<Dashboard />} path="/dashboard" />
              <Route element={<Home />} path="/home" />
            </Routes>
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

export default App;