"use client"
import { useState, useEffect } from 'react';

type Question = {
  id: number;
  question: string;
  correct_answer: string;
  answers: Record<string, string>;
};

const Quiz = ({ questions }: { questions: Question[] }) => {
  const totalQuestions = questions.length; // Total number of questions
  const [score, setScore] = useState(100); // Start score at 100%
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false); // Track if the result should be shown
  const [userSelection, setUserSelection] = useState<string | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<{ key: string; answer: string; label: string }[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]); // Store user answers

  useEffect(() => {
    const currentAnswers = questions[currentQuestionIndex]?.answers;
    if (currentAnswers) {
      const shuffled = Object.entries(currentAnswers)
        .map(([key, answer]) => ({ key, answer }))
        .sort(() => Math.random() - 0.5)
        .map((item, index) => ({ ...item, label: String.fromCharCode(65 + index) })); // A=65, B=66, etc.
      setShuffledAnswers(shuffled);
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswer = (selectedAnswer: string) => {
    setUserSelection(selectedAnswer); // Save user selection
    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    // Check if the selected answer matches the correct answer
    if (selectedAnswer !== correctAnswer) {
      setScore(prevScore => prevScore - (100 / totalQuestions)); // Decrease score based on total questions
    }
    setUserAnswers(prev => [...prev, selectedAnswer]); // Store user answer
    setShowResult(true); // Show result after answering
  };

  const handleRestart = () => {
    setScore(100);
    setCurrentQuestionIndex(0);
    setShowResult(false); // Reset result display
    setUserAnswers([]); // Reset user answers
  };

  const handleFinish = () => {
    const userAnswersString = userAnswers.join(',');
    window.location.href = `/complete?score=${score}&answ=${userAnswersString}`;
  };

  return (
    <>
    <div className="m-5 mt-10 flex min-w-80 items-center justify-between md:mx-auto md:max-w-2xl">
        <div>
          <form method="post" action="/full" onSubmit={handleRestart}>
            <button className="font-headings font-semibold text-blue-800 hover:underline" type="button" onClick={handleRestart}>
              Restart
            </button>
          </form>
        </div>
        <h1 className="text-center font-headings text-2xl font-bold md:text-4xl text-blue-950">
          Question {questions[currentQuestionIndex]?.id} of {questions.length} {/* Use total questions count */}
        </h1>
    </div>

    <form method="post" action="/full">
      <div className="m-5 mt-3 min-w-80 rounded-2xl bg-[#f3f3f3] p-4 md:mx-auto md:mt-7 md:max-w-2xl md:p-8">
        <p className="mb-4 text-right font-headings text-[18px] font-bold text-blue-950">
          Score: {score.toFixed(0)}% {/* Display the current score as a percentage */}
        </p>
        <p className="mb-7 font-headings text-[18px] font-bold text-blue-950">
          {questions[currentQuestionIndex]?.question} {/* Display the current question */}
        </p>

        {shuffledAnswers.map(({ key, answer, label }) => (
          <button
            key={key}
            className={`mb-4 w-full rounded-lg border p-4 text-left cursor-pointer ${showResult ? (key === questions[currentQuestionIndex]?.correct_answer ? 'border-green-500' : (userSelection === key ? 'border-red-500' : 'border-[#dadcde]')) : 'border-[#dadcde]'}`}
            type="button"
            onClick={() => handleAnswer(key)}
            disabled={showResult} // Disable button if result is shown
          >
            { showResult && key !== questions[currentQuestionIndex]?.correct_answer && userSelection === key && (
                <div className={`mb-3 rounded-lg bg-red-500 px-4 py-2 md:inline-block md:px-3 md:py-0 text-white`}>
                    <span>Incorrect</span>
                </div>
            )}
            { showResult && key === questions[currentQuestionIndex]?.correct_answer && (
                <div className={`mb-3 rounded-lg bg-green-500 px-4 py-2 md:inline-block md:px-3 md:py-0 text-white`}>
                    <span>Correct</span>
                </div>
            )}
            <div className="flex items-start gap-4 md:items-center">
              <div className={`h-7 min-h-7 w-7 min-w-7 rounded-full border-1 border-blue-950 text-center font-headings font-bold ${showResult && key === userSelection ? 'bg-blue-950' : ''} ${showResult && key === userSelection ? 'text-white' : 'text-blue-950'}`}>
                {label} {/* Display answer label as A, B, C, D */}
              </div>
              <div className="font-bold text-blue-950">{answer}</div>
            </div>
          </button>
        ))}

        {/* Hidden inputs remain unchanged */}
        <input type="hidden" name="questionId" value={questions[currentQuestionIndex]?.id} />
        <input type="hidden" name="_action" value="answer" />
        <input type="hidden" name="answer" value="" />
        <input type="hidden" name="startTime" value="1723272474351" />
      </div>

        {showResult &&
            <div className="w-full p-7">
            <div className="md:mx-auto md:max-w-2xl md:text-right">
              <button
                type="button"
                onClick={() => {
                  if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
                    setShowResult(false); // Reset result display for the next question
                  } else {
                    handleFinish(); // Call handleFinish when all questions are answered
                  }
                }}
                className="w-full rounded-full bg-purple px-12 py-2 font-headings text-[18px] font-bold text-white bg-blue-950 hover:bg-blue-500 hover:underline md:w-auto"
                disabled={!showResult} // Enable only if an answer has been selected
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next question' : 'Finish'} {/* Change button text */}
              </button>
            </div>
            </div>
        }
    </form>
    </>
  );
};

export default Quiz;