import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/get_response/', { message });
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error fetching response:', error);
        }
    };

    return (
        <div className="App">
            <h1>Q&A Interface with Groq</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your question..."
                    required
                />
                <button type="submit">Ask</button>
            </form>
            {response && (
                <div>
                    <h3>Response:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
}

export default App;
