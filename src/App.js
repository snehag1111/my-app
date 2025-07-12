import { BrowserRouter, Route, Routes } from "react-router-dom"
import MovieListPage from "./MovieListPage";

const App = () => {

    return (
        <div>
            <Routes>
                <Route path="/" element={<MovieListPage />} >
                    <Route path="/movie/:movieId" element={<MovieListPage />} />
                </Route>
            </Routes>
        </div>
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