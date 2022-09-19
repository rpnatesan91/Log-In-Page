import React from "react"
import CreateUserPage from "./CreateUserPage";
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AuthenticatePage from "./AuthenticatePage";
import SignInPage from "./SignInPage";
import PrivateRoute from "./PrivateRoute"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={AuthenticatePage} />
              <Route path="/signup" component={CreateUserPage} />
              <Route path="/login" component={SignInPage} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App
