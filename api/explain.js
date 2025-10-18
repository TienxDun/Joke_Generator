export default async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

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
                        text: `Bạn là một chuyên gia hài hước. Hãy giải thích joke này một cách đơn giản, dễ hiểu và giữ được sự hài hước bằng tiếng Việt. Nếu joke bằng tiếng Anh, hãy giải thích bằng tiếng Việt. Nếu joke đã bằng tiếng Việt, hãy phân tích ý nghĩa và tại sao nó hài hước.

Joke: "${jokeText}"

Hướng dẫn:
- Giải thích ngắn gọn, không dài dòng
- Giữ được yếu tố bất ngờ và twist
- Sử dụng ngôn ngữ gần gũi, thân thiện
- Nếu là wordplay, hãy chỉ ra trò chơi chữ`
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