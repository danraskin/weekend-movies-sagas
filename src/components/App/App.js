import {HashRouter as Router, Route, Redirect} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import NewMovie from '../NewMovie/NewMovie';
import EditMovie from '../EditMovie/EditMovie';
import Header from '../App/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>        
          {/* <Redirect from="/e" to="/movies" />  */}
        <Route exact path="/">
          <MovieList />
        </Route>

        <Route exact path="/newmovie">
          <NewMovie />
        </Route>
        
        <Route exact path="/details/:id">
          <MovieDetails />
        </Route>
        <Route exact path ="/edit/:id">
          <EditMovie />
        </Route>

      </Router>
    </div>
  );
}


export default App;
