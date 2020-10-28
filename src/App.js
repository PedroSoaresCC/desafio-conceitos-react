import React , { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setrepositories] = useState([]);

  async function handleAddRepository() {
      const response = await api.post('repositories', {
          title: `Novo projeto ${Date.now()}`,
          url: "url",
          techs: ['react', 'angular ']
        
      })
      
      setrepositories([...repositories, response.data]);
  }

  useEffect(() => {
      api.get('repositories').then(response => {
          setrepositories(response.data)
      })
  }, [repositories])

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title} 
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
