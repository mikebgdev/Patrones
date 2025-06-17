import { useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-php';

interface CodeExamplesTabsProps {
  examples: Record<string, string>;
}

export function CodeExamplesTabs({ examples }: CodeExamplesTabsProps) {
  const langs = Object.keys(examples);
  const [active, setActive] = useState(langs[0]);

  return (
    <div className="mb-8">
      <div className="flex space-x-4 mb-4">
        {langs.map((lang) => (
          <button
            key={lang}
            onClick={() => setActive(lang)}
            className={`px-4 py-2 rounded-t-lg border-b-2 focus:outline-none transition-colors ${
              active === lang
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      <pre className={`language-${active} rounded-b-lg overflow-x-auto bg-slate-800`}>
        <code
          className="block p-4 text-slate-100"
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              examples[active],
              Prism.languages[active] || Prism.languages.javascript,
              active
            ),
          }}
        />
      </pre>
    </div>
  );
}