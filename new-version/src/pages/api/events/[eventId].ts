import type { APIRoute } from "astro";

// GET event handler, gets and event by id from api_endpoint and returns the results
export const GET: APIRoute = async ({ params, request }) => {
  console.log('Get event by slug request received');
  const eventId = params.eventId;

  // Fetch the data from the external API
  const api_endpoint = 'http://localhost:5000/api/events';
  const uri = `${api_endpoint}/${eventId}`;
  const response = await fetch(uri);

  if (response.status === 404) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }

  const eventData = await response.json();

  const data = eventData;

  const dataStr = JSON.stringify(data);

  return new Response(dataStr, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// PUT event handler, updates an event by ID at api_endpoint and returns the updated event
export const PUT: APIRoute = async ({ params, request }) => {
  console.log('Put request received');
  const eventId = params.eventId;
  console.log(eventId);

  const updatedEvent = await request.json();
  console.log(updatedEvent);

  // Fetch the data from the external API
  const api_endpoint = 'http://localhost:5000/api/events';
  const uri = `${api_endpoint}/${eventId}`;
  const response = await fetch(uri, {
    method: 'PUT',
    body: JSON.stringify(updatedEvent)
  });

  const eventData = await response.json();
  console.log(eventData);

  const data = eventData;

  const dataStr = JSON.stringify(data);

  return new Response(dataStr, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

}

// Delete event handler, deletes and event by ID from api_endpoint and returns a response
export const DELETE: APIRoute = async ({ params, request }) => {
  console.log('Delete request received');
  const eventId = params.eventId;

  // Fetch the data from the external API
  const api_endpoint = 'http://localhost:5000/events';
  const uri = `${api_endpoint}/${eventId}`;
  const response = await fetch(uri, {
    method: 'DELETE'
  });

  const eventData = await response.json();

  const data = eventData;

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
  const api_endpoint = 'http://localhost:5000/api/events';
  const uri = `${api_endpoint}`;
  const response = await fetch(uri);
  const eventsData = await response.json();

  const data = eventsData;

  return data.flatMap(event => {
    return [
      { params: { eventId: event.id } },
    ]
  });
}
