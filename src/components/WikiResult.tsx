
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface WikiResultProps {
  result: {
    path: string[];
    connection: string;
  };
}

export const WikiResult = ({ result }: WikiResultProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <h2 className="text-xl font-medium text-wiki-text mb-4">Journey Path</h2>
        <div className="flex items-center flex-wrap gap-2">
          {result.path.map((step, index) => (
            <div key={index} className="flex items-center">
              <span className="px-3 py-1 bg-wiki-muted rounded-md text-sm">
                {step}
              </span>
              {index < result.path.length - 1 && (
                <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <h2 className="text-xl font-medium text-wiki-text mb-4">
          Interesting Connection
        </h2>
        <p className="text-gray-600 leading-relaxed">{result.connection}</p>
      </Card>
    </div>
  );
};
