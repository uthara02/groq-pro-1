// src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/get_response/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
      setError('');

    } catch (error) {
      setError(`Error fetching response: ${error.message}`);
      setResponse('');
    }
  };

  return (
    <div className="App">
      <h1>Q&A Interface</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={question} 
          onChange={handleQuestionChange} 
          placeholder="Ask a question..."
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
