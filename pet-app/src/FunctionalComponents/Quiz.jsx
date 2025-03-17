import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import "../Css/Quiz.css";

const API_URL = import.meta.env.VITE_API_URL;

function Quiz() {
  const { userName, userType } = useContext(AuthContext); // Get user info from Context
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const questions = [
    { question: "How much time do you have to dedicate to your pet?", options: [{ text: "A lot of time", value: "high" }, { text: "Some time", value: "medium" }, { text: "Little time", value: "low" }] },
    { question: "What kind of living space do you have?", options: [{ text: "Large house", value: "large" }, { text: "Small apartment", value: "small" }] },
    { question: "Are you looking for a low-maintenance pet?", options: [{ text: "Yes", value: "yes" }, { text: "No", value: "no" }] },
    { question: "What is your income type?", options: [{ text: "Stable income", value: "stable" }, { text: "Variable income", value: "variable" }] },
    { question: "Do you have all the necessary resources (food, vet care, space) to care for a pet?", options: [{ text: "Yes", value: "yes" }, { text: "No", value: "no" }] },
  ];

  const petTypes = { dog: "Dog", cat: "Cat", fish: "Fish", bird: "Bird" };

  const determinePet = (answers) => {
    if (answers[0] === "high" && answers[1] === "large" && answers[3] === "stable" && answers[4] === "yes") return petTypes.dog;
    else if (answers[0] === "medium" && answers[1] === "small" && answers[3] === "stable" && answers[4] === "yes") return petTypes.cat;
    else if (answers[2] === "yes" && answers[3] === "stable" && answers[4] === "yes") return petTypes.fish;
    else if (answers[4] === "yes") return petTypes.bird;
    else return "Please ensure you have the necessary resources to care for a pet.";
  };

  const handleAnswer = async (answer) => {
    const updatedResponses = [
      ...answers,
      {
        question: questions[currentQuestion].question, // Store question
        answer: answer, // Store answer
      },
    ];
    setAnswers(updatedResponses);
  
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const pet = determinePet(updatedResponses.map((r) => r.answer));
      setResult(pet);
  
      // Send questions & answers to backend
      try {
        await axios.post(`${API_URL}/saveQuizResponse`, {
          userName,
          userType: "customer", // Ensure userType is customer
          responses: updatedResponses, // Send question-answer pairs
        });
        console.log("Quiz response saved!");
      } catch (error) {
        console.error("Error saving quiz response:", error);
      }
    }
  };
  

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="quiz-container">
      {result ? (
        <div className="result">
          <h2>{result}</h2>
          {typeof result === "string" && result.includes("Please ensure") ? (
            <p>Please review your answers and ensure you have the necessary resources to care for a pet.</p>
          ) : (
            <p>Congratulations! Your perfect pet match is a {result}.</p>
          )}
          <button onClick={handleReset}>Take Quiz Again</button>
          <div className="result-buttons">
            <Link to="/">
              <button>Back to Home</button>
            </Link>
            <Link to="/pet-details">
              <button>View Pet Details</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="question-container">
          <h2>{questions[currentQuestion].question}</h2>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleAnswer(option.value)}>{option.text}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Quiz;
