import { useEffect, useState } from 'react';

function FetchBoards() {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newBoardName, setNewBoardName] = useState('');


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

   // Function to create a new board
   const createBoard = () => {
    const query = `mutation {
      create_board (board_name: "${newBoardName}", board_kind: public) {
        id
        name
      }
    }`;

    fetch("https://api.monday.com/v2", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMxODU5Njc5NywiYWFpIjoxMSwidWlkIjo1NTU4NTE4MywiaWFkIjoiMjAyNC0wMi0wN1QxMDoxODoxMS4yMDNaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjExODcxMzcsInJnbiI6ImV1YzEifQ.QVSvSPU-T9j6flnKw64Xt-JCLKCQ6zkS5GUcGKGLSvg' // Make sure to use your actual API key
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
      console.log('Board created:', data);
      setNewBoardName(''); // Reset input field
      // Here you could fetch the boards again to refresh the list or update the state directly
    })
    .catch(error => {
      console.error("Error creating board:", error);
      setError(error.message);
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Monday Boards</h1>
      <div>
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Enter new board name"
        />
        <button onClick={createBoard}>Create Board</button>
      </div>
      <ul>
        {boards.map(board => (
          <li key={board.id}>{board.name} | Items: {board.items_count}</li>
        ))}
      </ul>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
  
}

export default FetchBoards;
