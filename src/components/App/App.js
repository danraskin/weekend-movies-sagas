import {HashRouter as Router, Route, Redirect} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import NewMovie from '../NewMovie/NewMovie';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Redirect from="/" to="/movies" />
        <Route exact path="/movies">
          <MovieList />
        </Route>

        <Route exact path="/newmovie">
          <NewMovie />
        </Route>
        
        <Route exact path="/details/:id">
          <MovieDetails />
        </Route>

      </Router>
    </div>
  );
}


export default App;
