import { BrowserRouter, Route, Routes } from "react-router-dom"
import MovieListPage from "./MovieListPage";

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<MovieListPage />}>
                <Route path="movie/:movieId" element={<MovieListPage />} />
                <Route path="new" element={<MovieListPage />} />
                <Route path="edit/:id" element={<MovieListPage />} />
            </Route>
        </Routes>
    );
};

const MainApp = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

export default MainApp;