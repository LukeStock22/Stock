// pages/fantasy-cricket/add-players.tsx
import { useState } from 'react';
import axios from 'axios';

const AddPlayersPage: React.FC = () => {
  const [playerDetails, setPlayerDetails] = useState({
    playerName: '',
    ownerName: '',
    franchiseName: '',
    position: '',
    price: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlayerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/add-player', playerDetails);
      console.log('Player added successfully!');
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <div>
      <h1>Add Players</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Player Name:
          <input
            type="text"
            name="playerName"
            value={playerDetails.playerName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Owner Name:
          <input
            type="text"
            name="ownerName"
            value={playerDetails.ownerName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Franchise Name:
          <input
            type="text"
            name="franchiseName"
            value={playerDetails.franchiseName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={playerDetails.position}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={playerDetails.price}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
};

export default AddPlayersPage;
