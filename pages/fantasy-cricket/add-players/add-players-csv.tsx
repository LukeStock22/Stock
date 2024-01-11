// pages/fantasy-cricket/add-players/add-players-csv.tsx

import { useState } from 'react';
import axios from 'axios';

const AddPlayersCSVPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('Please select a CSV file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      await axios.post('/api/add-players-csv', formData);

      // Handle success, maybe show a success message
      console.log('Players added successfully!');
    } catch (error) {
      // Handle error, maybe show an error message
      console.error('Error adding players:', error);
    }
  };

  return (
    <div>
      <h1>Add Players from CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
};

export default AddPlayersCSVPage;
