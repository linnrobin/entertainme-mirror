import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "../views/LandingPage";
import MoviesPage from "../views/MoviesPage";
import TvPage from "../views/TvPage";
import MovieDetailPage from "../views/MovieDetailPage";
import TvDetailPage from "../views/TvDetailPage";

function Routes() {
  return (
    <header className="App-header">
      <Switch>
        <Route path="/movies/:id">
          <MovieDetailPage />
        </Route>
        <Route exact path="/movies">
          <MoviesPage />
        </Route>
        <Route path="/tv/:id">
          <TvDetailPage />
        </Route>
        <Route path="/tv">
          <TvPage />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>
    </header>
  );
}

export default Routes;
