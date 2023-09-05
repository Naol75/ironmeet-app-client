import React, { useEffect, useState, useContext } from 'react';
import service from '../services/service.config';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth.context'

function Matches() {
  const { activeUserId } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await service.get('/user/matches');
        setMatches(response.data);
      } catch (error) {
        setError('Error al obtener los matches. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error al obtener los matches:', error);
      }
    };

    fetchMatches();
  }, []); 

  return (
    <div className="matches-display">
      {matches.map((match, index) => (
        <div
          key={index}
          className="match-card"
        >
          <div className="img-container">
            <img src={match.image}  alt={match.name + " profile"} />
          </div>
          <div className='chat-container'>
            <h3>{match.name}</h3>
            <Link to={`/messages/${activeUserId}/${match._id}`}>Catch up!</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Matches;