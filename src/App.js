import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";

import { playChessMusic } from "./services/ChessMusic";
import Header from "./components/Header";
import QuizInit from "./pages/quizinit/QuizInit";
import HearChords from "./pages/hear-chords/HearChords";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "./pages/quiz/Quiz";

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
