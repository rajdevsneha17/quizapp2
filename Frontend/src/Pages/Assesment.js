import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const AssessmentPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]); // Changed from scores to indices
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple');
        const formattedQuestions = response.data.results.map((question) => {
          const options = [...question.incorrect_answers, question.correct_answer];
          // Shuffle options
          for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
          }
          return {
            question: question.question,
            options: options.map((option) => ({
              option,
              score: option === question.correct_answer ? 4 : 0 // Correct answer gets 4, incorrect answers get 0
            }))
          };
        });
        setQuestions(formattedQuestions);
        setSelectedOptions(Array(formattedQuestions.length).fill(null));
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions");
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex; // Store the selected option's index
    setSelectedOptions(newSelectedOptions);
    setError('');
  };

  const handleNextQuestion = () => {
    if (selectedOptions[currentQuestionIndex] === null) {
      setError('Please select an answer.');
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFinishAssessment = () => {
    if (selectedOptions[currentQuestionIndex] === null) {
      setError('Please select an answer before proceeding.');
    } else {
      const totalScore = selectedOptions.reduce((total, selectedIndex, index) => {
        const question = questions[index];
        return total + (question.options[selectedIndex]?.score || 0);
      }, 0);
      localStorage.setItem('totalScore', totalScore);
      localStorage.setItem('maxScore', questions.length * 4);

      const userLoginData = localStorage.getItem('userLoginData');
      const userSignupData = localStorage.getItem('userSignupData');
      
      if (!userLoginData && !userSignupData) {
        localStorage.setItem('intendedDestination', 'score');
        toast.error("You must have an account");
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
                    checked={selectedOptions[currentQuestionIndex] === optionIndex}
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
