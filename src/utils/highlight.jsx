export const highlightMatch = (text, query) => {
  // If there's no search term, just return the plain text
  if (!query) return <span>{text}</span>;

  // Normalize both text and query to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // Find where the query first appears
  const index = lowerText.indexOf(lowerQuery);

  // If the query isn't found, just return the text
  if (index === -1) return <span>{text}</span>;

  // Split the text into three parts: before, match, after
  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      <span>{before}</span>
      <mark>{match}</mark>
      <span>{after}</span>
    </>
  );
};