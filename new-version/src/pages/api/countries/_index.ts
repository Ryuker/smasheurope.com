import type { APIRoute } from "astro"


// Get all events handler, returns all events from the api_endpoint
export const GET: APIRoute = async ({ params, request }) => {
  console.log('Country Get request received');

  // Fetch the data from the external API
  const api_endpoint = 'http://localhost:5000/api/countries';
  const uri = `${api_endpoint}`;
  const response = await fetch(uri);
  const countriesData = await response.json();
  // console.log(countriesData);

  const data = countriesData;

  const dataStr = JSON.stringify(data);

  return new Response(dataStr, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// Post new event, adds the new event to the api_endpoint and returns the new event that created
export const POST: APIRoute = async ({ params, request }) => {
  console.log('Country Post request received');

  const newCountry = await request.json();

  // Fetch the data from the external API
  const api_endpoint = 'http://localhost:5000/api/countries';
  const uri = `${api_endpoint}`;
  const response = await fetch(uri, {
    method: 'POST',
    body: JSON.stringify(newCountry)
  });

  const countryData = await response.json();
  console.log(countryData);

  const data = countryData;

  const dataStr = JSON.stringify(data);

  return new Response(dataStr, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// // for static version only
// export async function getStaticPaths() {
//   const inStaticMode = await import.meta.env.STATIC_MODE;
//   if (inStaticMode === "false"){
//     return [];
//   }
  
//   // Fetch the data from the external API
//   const api_endpoint = 'http://localhost:5000/countries';
//   const uri = `${api_endpoint}`;
//   const response = await fetch(uri);
//   const countriesData = await response.json();

//   const data = countriesData;

//   return data.flatMap(country => {
//     return [
//       { params: { countryId: country.id } },
//     ]
//   });
// }

