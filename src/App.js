import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { playChessMusic } from "./services/ChessMusic";
import Header from "./components/Header/Header";
import QuizInit from "./pages/QuizInit/QuizInit";
import HearChords from "./pages/HearChords/HearChords";
import Quiz from "./pages/Quiz/Quiz";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/quizinit" element={<QuizInit />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/hearchords" element={<HearChords />} />
      </Routes>
    </>
  );
}

export default App;
