import Quiz from '@/components/Quiz';
import questions from '../lib/abcd.json'; // Adjust the path as necessary

export default function Home() {
  return (
      <Quiz questions={questions} />
  );
}