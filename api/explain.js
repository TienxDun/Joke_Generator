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

    const { jokeText, model = 'gemini-3-flash' } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // Validate model
    const validModels = [
        'gemini-3-flash',
        'gemini-2.5-flash',
        'gemini-2.5-flash-lite'
    ];

    if (!validModels.includes(model)) {
        return res.status(400).json({ error: 'Invalid model specified' });
    }

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    try {
        const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Bạn là một chuyên gia phân tích hài hước có kiến thức sâu rộng về văn hóa và ngôn ngữ.
                        Hãy giải thích câu đùa (joke) dưới đây một cách thông minh, hóm hỉnh và dễ hiểu bằng tiếng Việt.

                        Joke: "${jokeText}"

                        Yêu cầu chi tiết:
                        1. Tóm tắt ngắn gọn nội dung nếu là tiếng Anh.
                        2. Phân tích "điểm gây cười" (punchline): Tại sao nó lại buồn cười? Có yếu tố bất ngờ hay chơi chữ (wordplay) nào không?
                        3. Nếu có chơi chữ, hãy giải thích rõ nghĩa của các từ liên quan.
                        4. Giữ văn phong tự nhiên, trẻ trung, có thể sử dụng biểu tượng cảm xúc (emoji) phù hợp.
                        5. Định dạng: Sử dụng **chữ in đậm** cho các từ khóa quan trọng. Không cần mở đầu bằng "Đây là giải thích...".`
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', response.status, response.statusText, errorText);
            throw new Error(`Gemini API failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const explanation = data.candidates[0].content.parts[0].text.trim();

        res.status(200).json({ explanation });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Không thể giải thích joke này lúc này.' });
    }
}