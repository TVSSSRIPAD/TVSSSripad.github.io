import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import 'highlight.js/styles/atom-one-light.css';

export default function Post() {
  const [markdown, setMarkdown] = useState('');

  const { postLink } = useParams(); 
  
  useEffect(() => {
    fetch(`/posts/${postLink}.md`)
      .then((res) => res.text())
      .then(x => {setMarkdown(x); console.log(x);});
  }, [postLink]);


  return (
    <main className="max-w-2xl mx-auto p-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-4 mb-2" {...props} />,
            p:  ({ node, ...props }) => <p className="my-2 leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc ml-6 my-2" {...props} />,
          }}
      >{markdown}</ReactMarkdown>
    </main>
  );
}

