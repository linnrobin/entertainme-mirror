import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import Navigation from "./components/Nagivation";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./services/graphql";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  toast.configure();

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Navigation />
          <Routes />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
