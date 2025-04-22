import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numberId, setNumberId] = useState('e');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9876/numbers/${numberId}`);
      setResponse(res.data);
    } catch (error) {
      alert("Failed to fetch from microservice.");
      setResponse(null);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <h1>📊 Average Calculator</h1>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="numberId"><strong>Select Number Type:</strong></label>
        <select
          id="numberId"
          value={numberId}
          onChange={(e) => setNumberId(e.target.value)}
          style={{ marginLeft: 10, padding: 5 }}
        >
          <option value="p">Prime (p)</option>
          <option value="f">Fibonacci (f)</option>
          <option value="e">Even (e)</option>
          <option value="r">Random (r)</option>
        </select>
        <button onClick={handleFetch} style={{ marginLeft: 10, padding: '5px 10px' }}>
          Fetch Numbers
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {response && (
        <div style={{ background: '#f2f2f2', padding: 20, borderRadius: 10 }}>
          <h3>📥 Response</h3>
          <p><strong>Window Previous State:</strong> {JSON.stringify(response.windowPrevState)}</p>
          <p><strong>Window Current State:</strong> {JSON.stringify(response.windowCurrState)}</p>
          <p><strong>Numbers Fetched:</strong> {JSON.stringify(response.numbers)}</p>
          <p><strong>Average:</strong> {response.avg}</p>
        </div>
      )}
    </div>
  );
}

export default App;
