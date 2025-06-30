// hello there!
// 
// I'm a serverless function that you can deploy as part of your site.
// I'll get deployed to AWS Lambda, but you don't need to know that. 
// You can develop and deploy serverless functions right here as part
// of your site. Netlify Functions will handle the rest for you.


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
                const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
                const response = await fetch("https://api-ch3plus.mello.me/api/home", {
                    headers: {
                        'accept-language': 'en,th;q=0.9,en-US;q=0.8',
                        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
                        'sec-ch-ua-mobile': '?0',
                        'x-forwarded-for': '202.44.8.61',
                        'sec-ch-ua-platform': '"Windows"',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                return {
                    statusCode: 200,
                    body: JSON.stringify(result),
                };
            } catch (error) {
                console.error(`Error fetching ch3plus data: ${error}`);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Failed to fetch data', e:error }),
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
            const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
            const response = await fetch('https://monomax.me');
            const html = await response.text();
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