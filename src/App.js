import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaCogs, FaPlug } from 'react-icons/fa'; // Import icons
import Insights from './Insights'; // Rename Home to Insights
import Configure from './Configure'; // Rename IntegrationForm to Configure
import Integrations from './Integrations'; // Add Integrations page
import './App.css';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

const logoUrl = 'https://assets-global.website-files.com/6222ca42ea87e1bd1aa1d10c/62242940556df4e8146db519_white-logo.svg'; // Remote SVG link

const AppContainer = styled.div`
  display: flex;
`;

const Sidebar = styled.nav`
  width: 175px;
  background: #20232a;
  color: #fff;
  height: 100vh;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed; /* Fix the sidebar position */
  top: 0;
  left: 0;
`;

const Content = styled.div`
  margin-left: 200px; /* Offset the content by the width of the sidebar */
  padding: 20px;
  background: #f0f0f0;
  width: calc(100% - 200px); /* Adjust width considering the sidebar */
  // overflow: auto;
  height: 100vh;
`;

const NavHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const NavLogo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: #444;
  }

  svg {
    margin-right: 10px;
  }
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Sidebar>
          <NavHeader>
            <NavLogo src={logoUrl} alt="Harness Logo" />
          </NavHeader>
          <NavItem to="/">
            <FaHome />
            Insights
          </NavItem>
          <NavItem to="/integrations">
            <FaPlug />
            Integrations
          </NavItem>
          <NavItem to="/configure">
            <FaCogs />
            Configure
          </NavItem>
        </Sidebar>
        <Content>
          <Routes>
            <Route path="/" element={<Insights />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/configure" element={<Configure />} />
          </Routes>
        </Content>
      </AppContainer>
      <ToastContainer />
    </Router>
  );
};

export default App;
