import FetchTodo from './Fetch.jsx'; // Adjust the path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Custom CSS for further styling

function App() {
  return (
    <div className="App bg-dark text-white">
      <header className="App-header py-3 mb-4 border-bottom">
        <div className="container">
          <FetchTodo />
        </div>
      </header>
    </div>
  );
}

export default App;
