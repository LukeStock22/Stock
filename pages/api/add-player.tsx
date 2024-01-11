// pages/api/add-player.tsx

import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).end(); // Method Not Allowed
  }

  try {
    const { playerName, ownerName, franchiseName, position, price } = request.body;

    if (!playerName || !ownerName || !franchiseName || !position || !price) {
      throw new Error('Player details are required');
    }

    await sql`
      INSERT INTO Players (Name, Owner, Franchise, Position, Price)
      VALUES (${playerName}, ${ownerName}, ${franchiseName}, ${position}, ${price});
    `;
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }

  const players = await sql`SELECT * FROM Players;`;
  return response.status(200).json({ players });
}

