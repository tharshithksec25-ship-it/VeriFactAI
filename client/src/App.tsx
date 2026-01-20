import { useState } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { Analyzer } from './components/Analyzer';
import { ResultCard } from './components/ResultCard';
import { type AnalysisResult } from './types';

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Analysis failed. Please check your connection.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Header />
      <div className="space-y-12 pb-20">
        <section className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            Verify Content Credibility
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light">
            Analyze news, articles, and social posts using advanced AI to detect misinformation, bias, and manipulation risks.
          </p>
        </section>

        <Analyzer onAnalyze={handleAnalyze} isAnalyzing={loading} error={error} />

        {result && <ResultCard result={result} />}
      </div>
    </Layout>
  );
}

export default App;
