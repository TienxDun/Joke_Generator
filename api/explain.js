export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { jokeText } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    try {
        const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Giải thích joke này một cách đơn giản và dễ hiểu bằng tiếng Việt: "${jokeText}"`
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('Gemini API failed');
        }

        const data = await response.json();
        const explanation = data.candidates[0].content.parts[0].text.trim();

        res.status(200).json({ explanation });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Không thể giải thích joke này lúc này.' });
    }
}