import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";

import { playChessMusic } from "./services/ChessMusic";
import Header from "./components/Header";
import QuizInit from "./pages/QuizInit";
import HearChords from "./pages/HearChords";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<HearChords />} />
        <Route path="/quizinit" element={<QuizInit />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/hearchords" element={<HearChords />} />
      </Routes>
    </>
  );
}

export default App;
