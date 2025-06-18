import React, { useState, useEffect } from 'react';

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedbackList, setFeedbackList] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const backendBaseUrl = 'https://feedback.pingdevops.info';

  useEffect(() => {
    fetch(`${backendBaseUrl}/feedback`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch feedback');
        return res.json();
      })
      .then(data => setFeedbackList(data.reverse())) // newest first
      .catch(err => {
        console.error('Error fetching feedback:', err);
        setStatusMessage('Unable to load feedback entries');
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setStatusMessage('Submitting...');
    fetch(`${backendBaseUrl}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to submit feedback');
        return res.text();
      })
      .then((message) => {
        setStatusMessage(message);
        setFormData({ name: '', email: '', message: '' });
        return fetch(`${backendBaseUrl}/feedback`);
      })
      .then(res => res.json())
      .then(data => {
        setFeedbackList(data.reverse());
        setCurrentPage(1); // go to first page after new submission
      })
      .catch(err => {
        console.error('Submission error:', err);
        setStatusMessage('Failed to submit feedback');
      });
  };

  // 🧮 Pagination logic
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentEntries = feedbackList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(feedbackList.length / entriesPerPage);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>Submit Feedback</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        /><br /><br />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
        /><br /><br />
        <textarea
          placeholder="Message"
          rows="4"
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          required
        /><br /><br />
        <button type="submit">Submit</button>
      </form>

      <p style={{ color: 'green' }}>{statusMessage}</p>

      <h2>All Feedbacks</h2>
      <ul>
        {currentEntries.map((fb) => (
          <li key={fb.id}>
            <strong>{fb.name}</strong> ({fb.email}): {fb.message}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅ Previous
        </button>

        <span style={{ margin: '0 1rem' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default App;
