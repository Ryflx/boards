import { useEffect, useState } from 'react';

function FetchBoards() {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const query = '{ boards (limit:5) { name id description items_count } }';

    fetch("https://api.monday.com/v2", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMxODU5Njc5NywiYWFpIjoxMSwidWlkIjo1NTU4NTE4MywiaWFkIjoiMjAyNC0wMi0wN1QxMDoxODoxMS4yMDNaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjExODcxMzcsInJnbiI6ImV1YzEifQ.QVSvSPU-T9j6flnKw64Xt-JCLKCQ6zkS5GUcGKGLSvg'
      },
      body: JSON.stringify({
        'query': query
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setBoards(data.data.boards); // Assuming the response structure is { data: { boards: [...] } }
      setIsLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []); // Empty dependency array means this effect runs once on mount

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Monday Boards</h1>
      <ul>
        {boards.map(board => (
          <li key={board.id}>{board.name} | Items:{board.items_count}</li>
        ))}
      </ul>
    </div>
  );
}

export default FetchBoards;
