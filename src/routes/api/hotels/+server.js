
import { createConnection } from '$lib/db/mysql';

export async function GET({ params }) {
    const { uuid } = params;
    const connection = await createConnection();
    const [rows] =  await connection.execute('SELECT * FROM hotels');
    
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  }

  export async function POST({ request }) {
      const data = await request.json();

      console.log(data)

      const connection = await createConnection();

      const [result] = await connection.execute(
          'INSERT INTO hotels (name, stars, location, description, price, rating) VALUES (?, ?, ?, ?, ?, ?)',
          [data.name, data.stars, data.location, data.description, data.price, data.rating]
      );
  
      const newHotelId = result.insertId;
      const [rows] = await connection.execute('SELECT * FROM hotels WHERE id = ?', [newHotelId]);
  
      await connection.end();
  
      return new Response(JSON.stringify(rows[0]), {
          status: 201,
          headers: { 'content-type': 'application/json' }
      });
  }