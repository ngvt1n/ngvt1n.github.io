const employment = document.getElementById('employment');
let markdown = '';

fetch('./resume.md')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(md => {
    employment.innerHTML = parseMarkdown(md);
    document.dispatchEvent(new Event('parse-complete'));
  })
  .catch(error => {
    console.error('Error reading resume.md:', error);
  });

function parseMarkdown(markdown) {
  const lines = markdown.split('\n');
  const parsedLines = lines.map(line => {
    if (line.startsWith('##')) {
      line = line.replace('##', 'VV').replace('\r', '')
      line += '.'.repeat(80 - line.length) + '\n';
      return line
    } else if (line.startsWith('- ')) {
      return line.replace('- ', '|-- ');
    } else if (line.startsWith('    - ')) {
      return line.replace('    - ', '|   |-- ');
    } else if (line.startsWith('        - ')) {
      return line.replace('        - ', '|   |   |-- ');
    }
    return line;
  });
  return parsedLines.join('\n');
}
