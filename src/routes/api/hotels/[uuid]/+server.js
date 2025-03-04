
import { createConnection } from '$lib/db/mysql';


export async function GET({ params }) {
    const { uuid } = params;
	const connection = await createConnection();
    const [rows] =  await connection.execute('SELECT * FROM hotels WHERE id = ?', [uuid]);
	const hotel = rows[0];
    return new Response(JSON.stringify(hotel), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  }


  export async function DELETE({ params }) {
    const { uuid } = params;
    const connection = await createConnection();
 
    try {
        const [result] = await connection.execute(
            'DELETE FROM hotels WHERE id = ?;',
            [uuid]
        );
 
        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
        }
 
        return new Response(null, { status: 204 });
 
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}



  
