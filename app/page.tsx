import { SpellChecker } from '@/components/spell-checker';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            Website Spell Checker
          </h1>
          <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
            Enter a website URL to check for spelling and grammar mistakes
          </p>
          <SpellChecker />
        </div>
      </div>
    </div>
  );
}