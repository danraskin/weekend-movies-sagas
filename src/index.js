import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails)
    yield takeEvery('CREATE_MOVIE', createNewMovie);
    yield takeEvery('EDIT_MOVIE', editMovie);
    yield takeEvery('DELETE_MOVIE', deleteMovie);
}

// SAGA FUNCTIONS

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const moviesRes = yield axios.get('/api/movie');
        console.log('get all:', moviesRes.data);
        yield put({ type: 'SET_MOVIES', payload: moviesRes.data });

    } catch {
        console.log('GET all movies error');
    }   
}

function* fetchAllGenres() {
    // GET all genres from DB. will use this in ADD MOVIE page.
    try {
        const genresRes = yield axios.get('/api/genre');
//        console.log('get all genres: ', genresRes.data);
        yield put({ type: 'SET_GENRES', payload: genresRes.data });

    } catch {
        console.log('GET all genres error');
    }
}

function* fetchMovieDetails(action) {
    // GET movie details from DB. use this in MovideDetails page.
    try {
        const movieId = action.payload;
        const detailsRes = yield axios.get(`/api/movie/${movieId}`);
        yield put({ type: 'SET_MOVIE_DETAILS', payload: detailsRes.data });
    } catch {
        console.log('GET movie details error');
    }
}

function* createNewMovie(action) {
    console.log('in createNewMovie ',action.payload);
    try {
        const newMovie = action.payload;
        yield axios({
            method: 'POST',
            url: '/api/movie',
            data: newMovie
        });
        yield put({type: 'FETCH_MOVIES' });
    } catch {
        console.log('POST new movie error');
    }
}

function* editMovie(action) {
    try {
        const movieId = action.payload.movieId;
        const { title, description, genres } = action.payload;
        const movieDetails = {title, description, genres}; //these two lines removie movieID from payload
        console.log('in edit movie', movieDetails);
        yield axios({
            method: 'PUT',
            url: `/api/movie/${movieId}`,
            data: movieDetails
        })
        yield put({type: 'FETCH_MOVIES' });

    } catch {
        console.log('PUT /api/movie/id error');
    }
}

function* deleteMovie(action) {
    try {
        const movieId = action.payload;
        yield axios.delete(`api/movie/${movieId}`);
        yield put({type: 'FETCH_MOVIES' });
    } catch {
        console.log('DELETE /api/movie/id error');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


// REDUCERS
// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const movieDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return {...action.payload};
        case 'CLEAR_MOVIE_DETAILS':
            return {};
        default:
            return state;
    } 
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
