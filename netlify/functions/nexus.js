const axios = require('axios');

exports.handler = async (event, context) => {
    // Check bearer token
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (authHeader !== 'Bearer 49ac371e-8a07-4738-a7f9-4d79955fbf3e') {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Unauthorized' }),
        };
    }

    if (event.httpMethod === 'GET') {
        const params = event.queryStringParameters || {};
        if (params.type === "3plus") {
            try {
                const response = await axios.get("https://api-ch3plus.mello.me/api/home", {
                    headers: {
                        'accept-language': 'en,th;q=0.9,en-US;q=0.8',
                        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
                        'sec-ch-ua-mobile': '?0',
                        'x-forwarded-for': '202.44.8.61',
                        'sec-ch-ua-platform': '"Windows"',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
                    },
                });

                return {
                    statusCode: 200,
                    body: JSON.stringify(response.data),
                };
            } catch (error) {
                console.error(`Error fetching ch3plus data: ${error}`);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Failed to fetch data', e: error }),
                };
            }
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid type parameter' }),
            };
        }
    } else if (event.httpMethod === 'POST') {
        try {
            const response = await axios.get('https://www.monomax.me/', {
                headers: {
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'en,th;q=0.9,en-US;q=0.8',
                    'cache-control': 'no-cache',
                    'pragma': 'no-cache',
                    'priority': 'u=0, i',
                    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'none',
                    'sec-fetch-user': '?1',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0'
                }
            });
            const html = response.data;
            return {
                statusCode: 200,
                body: JSON.stringify({ html }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
};
