import type { APIRoute } from "astro";

// GET circuit handler, gets a circuit by slug from api_endpoint and returns the results
export const GET: APIRoute = async ({ params, request }) => {
  console.log('Get circuit by slug request received');
  const circuitSlug = params.circuitSlug;

  // Fetch the data from the external API
  const api_endpoint = 'http://localhost:5001/api/circuits';
  const uri = `${api_endpoint}/?slug=${circuitSlug}`;
  const response = await fetch(uri);

  if (response.status === 404) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }

  const circuitData = await response.json();

  const data = circuitData;

  const dataStr = JSON.stringify(data);

  return new Response(dataStr, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// PUT circuit handler, updates a circuit by ID at api_endpoint and returns the updated circuit
export const PUT: APIRoute = async ({ params, request }) => {
  console.log('Put request received');
  const circuitId = params.circuitId;
  console.log(circuitId);

  const updatedCircuit = await request.json();
  console.log(updatedCircuit);

  // Fetch the data from the external API
  const api_endpoint = 'http://localhost:5001/api/circuits';
  const uri = `${api_endpoint}/${circuitId}`;
  const response = await fetch(uri, {
    method: 'PUT',
    body: JSON.stringify(updatedCircuit)
  });

  const circuitData = await response.json();
  console.log(circuitData);

  const data = circuitData;

  const dataStr = JSON.stringify(data);

  return new Response(dataStr, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

}

// Delete circuit handler, deletes a circuit by ID from api_endpoint and returns a response
export const DELETE: APIRoute = async ({ params, request }) => {
  console.log('Delete request received');
  const circuitId = params.circuitId;

  // Fetch the data from the external API
  const api_endpoint = 'http://localhost:5001/circuits';
  const uri = `${api_endpoint}/${circuitId}`;
  const response = await fetch(uri, {
    method: 'DELETE'
  });

  const circuitData = await response.json();

  const data = circuitData;

  const dataStr = JSON.stringify(data);

  return new Response(dataStr, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// for static version only
export async function getStaticPaths() {
  const inStaticMode = await import.meta.env.STATIC_MODE;
  if (inStaticMode === "false"){
    return [];
  }
  
  // Fetch the data from the external API
  const api_endpoint = 'http://localhost:5001/api/circuits';
  const uri = `${api_endpoint}`;
  const response = await fetch(uri);
  const circuitsData = await response.json();

  const data = circuitsData;

  return data.flatMap(circuit => {
    return [
      { params: { circuitId: circuit.id, circuitSlug: circuit.slug } },
    ]
  });
}