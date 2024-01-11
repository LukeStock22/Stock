// pages/api/create-auction-table.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const result = await sql`
      CREATE TABLE Auction (
        Name varchar(255),
        Owner varchar(255),
        Franchise varchar(255),
        Position varchar(255),
        Price decimal
      );
    `;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
