import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserManagement from './Components/UserManagement';
import ProductManagement from './Components/ProductManagement';
import ReviewManagement from './Components/ReviewManagement';


function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/users">User Management</Link></li>
            <li><Link to="/products">Product Management</Link></li>
            <li><Link to="/reviews">Review Management</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/users" component={UserManagement} />
          <Route path="/products" component={ProductManagement} />
          <Route path="/reviews" component={ReviewManagement} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
