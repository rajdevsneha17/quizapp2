import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const AssessmentPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple');
        const formattedQuestions = response.data.results.map((question, index) => ({
          question: question.question,
          options: question.incorrect_answers.concat(question.correct_answer).map((option, idx) => ({
            option,
            score: option === question.correct_answer ? 4 : idx + 1 // Assign scores, with correct answer getting the highest score
          }))
        }));
        setQuestions(formattedQuestions);
        setAnswers(Array(formattedQuestions.length).fill(null));
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions");
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = questions[currentQuestionIndex].options[optionIndex].score;
    setAnswers(newAnswers);
    setError('');
  };

  const handleNextQuestion = () => {
    if (answers[currentQuestionIndex] === null) {
      setError('Please select an answer.');
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFinishAssessment = () => {
    if (answers[currentQuestionIndex] === null) {
      setError('Please select an answer before proceeding.');
    } else {
      const totalScore = answers.reduce((total, score) => total + (score || 0), 0);
      localStorage.setItem('totalScore', totalScore);
      localStorage.setItem('maxScore', questions.length * 4);

      const userLoginData = localStorage.getItem('userLoginData');
      const userSignupData = localStorage.getItem('userSignupData');
      
      if (!userLoginData && !userSignupData) {
        localStorage.setItem('intendedDestination', 'score');
        toast.error("You must have an account")
        navigate('/signup'); // or navigate('/login')
      } else {
        navigate('/score', { state: { totalScore, maxScore: questions.length * 4 } });
      }
    }
  };

  return (
    <div>
      <div><Navbar /></div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-center">Assessment Questions</h2>
          {questions.length > 0 && currentQuestionIndex < questions.length ? (
            <div>
              <h3 className="text-lg font-bold mb-2 text-wrap" style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
              {questions[currentQuestionIndex].question}
              </h3>
              {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2">
                  <input
                    type="radio"
                    id={`option_${currentQuestionIndex}_${optionIndex}`}
                    name={`question_${currentQuestionIndex}`}
                    checked={answers[currentQuestionIndex] === option.score}
                    onChange={() => handleOptionSelect(optionIndex)}
                    className="mr-2"
                  />
                  <label htmlFor={`option_${currentQuestionIndex}_${optionIndex}`}>{option.option}</label>
                </div>
              ))}
              {error && <p className="text-red-500">{error}</p>}
              <div className="mt-4">
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    onClick={handleFinishAssessment}
                  >
                    Finish Assessment
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;