import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch("/fhir_flashcards.json")
      .then((res) => res.json())
      .then((data) => setFlashcards(data));
  }, []);

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const currentCard = flashcards[index];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">FHIR Flashcards</h1>
      {flashcards.length > 0 ? (
        <Card className="w-full max-w-xl text-center shadow-xl bg-white rounded-xl transition-transform duration-300 ease-in-out">
          <CardContent className="p-8">
            <p className="text-2xl font-semibold text-gray-800 min-h-[100px] flex items-center justify-center">
              {showAnswer ? currentCard.answer : currentCard.question}
            </p>
            <div className="mt-8 flex justify-center">
              {!showAnswer ? (
                <Button onClick={() => setShowAnswer(true)}>Flip Card</Button>
              ) : (
                <Button onClick={nextCard}>Next</Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="text-lg text-gray-600">Loading flashcards...</p>
      )}
    </div>
  );
}