import React, { useState, useEffect } from "react";

const PrevBTN = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Prev</button>
    </div>
  );
};

const NextBTN = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Next</button>
    </div>
  );
};

const SubmitBTN = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Submit QUIZ</button>
    </div>
  );
};

const QuestionCart = ({
  questionData,
  setQuestionData,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}) => {
  const initialTimers = questionData.map(() => 10); // Initialize timers array with 10 seconds for each question
  const [timers, setTimers] = useState(initialTimers);
  const [selectedOption, setSelectedOption] = useState(null); // State to store selected option

  useEffect(() => {
    const countdown = setTimeout(() => {
      const updatedTimers = timers.map((time, index) => {
        if (index === currentQuestionIndex && time > 0) {
          return time - 1;
        }
        return time;
      });
      setTimers(updatedTimers);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [currentQuestionIndex, timers]);

  const handleNextQuestion = () => {
    setSelectedOption(null); // Reset selected option
    setCurrentQuestionIndex((prevValue) => prevValue + 1);
  };

  const handlePrevQuestion = () => {
    setSelectedOption(null); // Reset selected option
    setCurrentQuestionIndex((prevValue) => prevValue - 1);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <h4>
        Question {questionData[currentQuestionIndex].question_no}:{" "}
        {questionData[currentQuestionIndex].question}
      </h4>
      <p>Time Remaining: {timers[currentQuestionIndex]} seconds</p>
      {questionData[currentQuestionIndex]?.options?.map((option, index) => (
        <div key={index}>
          <button onClick={() => handleOptionSelect(option)}>
            {option}
          </button>
        </div>
      ))}
      <p>Selected Option: {selectedOption}</p>
      {currentQuestionIndex !== 0 && (
        <PrevBTN onClick={handlePrevQuestion} />
      )}
      {currentQuestionIndex === questionData.length - 1 ? (
        <SubmitBTN onClick={() => { }} />
      ) : (
        <NextBTN onClick={handleNextQuestion} />
      )}
    </div>
  );
};

export default QuestionCart;
