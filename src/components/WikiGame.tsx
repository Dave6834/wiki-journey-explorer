
import { useState } from "react";
import { Dice5 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { WikiResult } from "./WikiResult";

const randomWords = [
  "Elephant", "Paris", "Renaissance", "Coffee",
  "Democracy", "Quantum Physics", "Leonardo da Vinci",
  "Industrial Revolution", "Mount Everest", "Jazz",
  "Ancient Egypt", "Internet", "Shakespeare",
  "Evolution", "Space Race", "Mediterranean Sea"
];

export const WikiGame = () => {
  const [startWord, setStartWord] = useState("");
  const [endWord, setEndWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const getRandomWord = () => {
    return randomWords[Math.floor(Math.random() * randomWords.length)];
  };

  const handleRandomize = (field: "start" | "end") => {
    const word = getRandomWord();
    if (field === "start") {
      setStartWord(word);
    } else {
      setEndWord(word);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startWord || !endWord) {
      toast({
        title: "Missing words",
        description: "Please enter both start and end words",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/functions/v1/wiki-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startWord, endWord }),
      });

      if (!response.ok) {
        throw new Error('Failed to find connection');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find connection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-wiki-muted to-white p-8">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light tracking-tight text-wiki-text">
            Wiki Journey Explorer
          </h1>
          <p className="text-gray-600">
            Discover fascinating connections between concepts through Wikipedia
          </p>
        </div>

        <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Input
                  value={startWord}
                  onChange={(e) => setStartWord(e.target.value)}
                  placeholder="Enter starting concept..."
                  className="transition-all duration-200"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRandomize("start")}
                  className="shrink-0 hover:bg-wiki-muted transition-colors"
                >
                  <Dice5 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Input
                  value={endWord}
                  onChange={(e) => setEndWord(e.target.value)}
                  placeholder="Enter destination concept..."
                  className="transition-all duration-200"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRandomize("end")}
                  className="shrink-0 hover:bg-wiki-muted transition-colors"
                >
                  <Dice5 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-wiki-accent hover:bg-wiki-accent/90 text-white transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Finding Connection...
                </span>
              ) : (
                "Start Journey"
              )}
            </Button>
          </form>
        </Card>

        {result && <WikiResult result={result} />}
      </div>
    </div>
  );
};
