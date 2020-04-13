import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {  
        id: "123",
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
    });
    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
