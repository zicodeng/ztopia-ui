import { memo, useState } from 'react';
import faker from 'faker';

export const DEFAULT_VALUE = `
<h1>Headings</h1>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>

<h1>Paragraphs</h1>
<p>${faker.lorem.paragraphs(2)}</p>
<p>${faker.lorem.paragraphs(6)}</p><p>${faker.lorem.paragraphs(3)}</p>

<h1>Ordered List</h1>
<ol>
  <li>${faker.lorem.sentences(1)}</li>
  <li>${faker.lorem.sentences(3)}</li>
  <li>${faker.lorem.sentences(2)}</li>
</ol>

<h1>Unordered List</h1>
<ul>
  <li>${faker.lorem.sentences(2)}</li>
  <li>${faker.lorem.sentences(1)}</li>
  <li>${faker.lorem.sentences(1)}</li>
</ul>

<h1>Inline Code</h1>
<pre>console.log("Hello, World!");</pre>

<h1>Blockquote</h1>
<blockquote>${faker.lorem.paragraphs(2)}</blockquote>

<h1>Link</h1>
<a href="https://www.google.com">Google.com</a>
`;

export const InlineTextEditorDemo = memo(({ children }) => {
  const [editor, setEditor] = useState(null);
  const onReady = (editor) => {
    setEditor(editor);
  };
  const printEditorContent = () => {
    if (editor) console.log(editor.getContent());
  };
  return children({ onReady, printEditorContent });
});
