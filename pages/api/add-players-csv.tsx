// pages/api/add-players-csv.tsx

import { NextApiResponse, NextApiRequest } from 'next';
import { sql } from '@vercel/postgres';
import formidable from 'formidable';
import { parse } from 'csv-parse';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const form = new formidable.IncomingForm();

  form.parse(request, async (err, fields, files) => {
    if (err) {
      return response.status(500).json({ error: err.message });
    }

    try {
      const { file } = files;

      if (!file || file.type !== 'text/csv') {
        return response.status(400).json({ error: 'Invalid file type. Please upload a CSV file.' });
      }

      // Parse CSV file
      const csvData = await parseCSV(file.path);

      // Insert players into the database
      await insertPlayersIntoDatabase(csvData);

      return response.status(200).json({ success: true });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  });
}

async function parseCSV(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const rows: any[] = [];

    const parser = parse({
      columns: true,
      skip_empty_lines: true,
    });

    parser.on('readable', function () {
      let record;
      while ((record = parser.read())) {
        rows.push(record);
      }
    });

    parser.on('end', function () {
      resolve(rows);
    });

    parser.on('error', function (error) {
      reject(error);
    });

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(parser);
  });
}

async function insertPlayersIntoDatabase(players: any[]): Promise<void> {
  for (const player of players) {
    const { playerName, ownerName, franchiseName, position, price } = player;

    await sql`
      INSERT INTO Players (Name, Owner, Franchise, Position, Price)
      VALUES (${playerName}, ${ownerName}, ${franchiseName}, ${position}, ${price});
    `;
  }
}

