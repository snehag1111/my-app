import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import MovieListPage from "./MovieListPage";
import MovieForm from "./MovieForm";
import Dialog from "./Dialog";

const App = () => {

    const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

    return (
        <Routes>
            <Route path="/" element={<MovieListPage />}>
                <Route path="movie/:movieId" element={<MovieListPage />} />
                <Route path="new" element={<MovieListPage />} />
                <Route path="edit/:id" element={<MovieListPage />} />
            </Route>
        </Routes>
    //     <div>
    //         <Routes location={backgroundLocation || location}>
    //             <Route path="/" element={<MovieListPage />} >
    //                 <Route path="/movie/:movieId" element={<MovieListPage />} />
    //             </Route>
    //         </Routes>
    //         <Routes>
    //     <Route path="/new" element={<MovieListPage showDialog />} />
    //   </Routes>
    //     </div>
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