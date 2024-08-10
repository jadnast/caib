"use client";
import { useSearchParams } from 'next/navigation';
import questions from '../../lib/abcd.json'; 

type Question = {
    id: number;
    question: string;
    correct_answer: string;
    answers: Record<string, string>;
};

const Page = () => {
    const searchParams = useSearchParams();
    const userAnswers = searchParams.get('answ')?.split(',') || [];
    const score = searchParams.get('score');

    return (
        <>
            <h1 className="mx-5 my-8 text-center font-headings text-4xl font-bold text-blue-950">You've completed the test!</h1>
            <div className="m-5 rounded-lg bg-white p-4 pt-8 text-center md:mx-auto md:max-w-4xl text-blue-950">
                <p>Your score is:</p>
                <p className="my-3 text-6xl font-bold">{score ? Number(score).toFixed(0) : 'N/A'}%</p>
                <p className='mb-8'>The passing score on the real test is 80%.</p>
                <a href='/' className="w-full rounded-full border-2 border-purple bg-purple py-2 font-headings text-[18px] font-bold text-white bg-blue-950 hover:bg-blue-500 hover:underline md:w-auto md:px-12" type="submit">
                    Take the test again
                </a>
                <hr className="mx-auto my-6 h-px w-full border-0 bg-[#dadcde] md:my-8 md:w-1/2" />
                <p>Review your answers below...</p>
            </div>

            {questions?.map((question, index) => {
                const isCorrect = userAnswers[index] === question.correct_answer;
                return (
                    <div className="m-5 mt-3 min-w-80 rounded-2xl bg-[#f3f3f3] p-4 md:mx-auto md:mt-7 md:max-w-2xl md:p-8" key={index}>
                        <div>
                            <div className="font-headings text-[14px] text-[#73767d]">Question {index + 1} of {questions.length}</div>
                            <p className="mb-7 font-headings text-[18px] font-bold text-blue-950">
                                {question.question}
                            </p>
                            {Object.entries(question.answers).map(([optionKey, optionValue], optionIndex) => {

                                return (
                                    <button 
                                        key={optionIndex} 
                                        className={`mb-4 w-full rounded-lg border p-4 text-left cursor-default 
                                            ${question.correct_answer == optionKey ? 'border-green-500' : 'border-[#dadcde]'}
                                            ${userAnswers[index] == optionKey && question.correct_answer != userAnswers[index] ? 'border-red-500' : 'border-[#dadcde]'}
                                            `} 
                                            
                                        type="button" 
                                        disabled
                                    >
                                        { userAnswers[index] == optionKey && question.correct_answer != userAnswers[index] &&
                                            <div className={`mb-3 rounded-lg ${question.correct_answer == optionKey ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 md:inline-block md:px-3 md:py-0 text-white`}>
                                                <span>Incorrect</span>
                                            </div>
                                        }
                                        { question.correct_answer == optionKey &&
                                            <div className={`mb-3 rounded-lg ${question.correct_answer == optionKey ? 'bg-green-500' : 'bg-[#dadcde]'} px-4 py-2 md:inline-block md:px-3 md:py-0 text-white`}>
                                                <span>{question.correct_answer == optionKey ? 'Correct' : ''}</span>
                                            </div>  
                                        }
                                        <div className="flex items-start gap-4 md:items-center">
                                            <div className={`h-7 min-h-7 w-7 min-w-7 rounded-full border-1 border-blue-950 text-center font-headings font-bold ${userAnswers[index] === optionKey ? 'bg-blue-950' : ''} ${userAnswers[index] === optionKey ? 'text-white' : 'text-blue-950'}`}>{optionKey.toUpperCase()}</div>
                                            <div className="font-bold text-blue-950">{optionValue}</div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Page;
