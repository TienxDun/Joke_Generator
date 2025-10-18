# 🎭 Máy Tạo Joke Ngẫu Nhiên

Một ứng dụng web đơn giản giúp tạo ra các joke ngẫu nhiên bằng tiếng Anh, với khả năng dịch sang tiếng Việt và giải thích ý nghĩa của joke bằng AI.

## ✨ Tính năng

- 🎲 **Tạo joke ngẫu nhiên**: Lấy joke từ [JokeAPI](https://v2.jokeapi.dev/)
- 🌐 **Dịch tiếng Việt**: Tự động dịch joke từ tiếng Anh sang tiếng Việt
- 🤔 **Giải thích joke**: Sử dụng Google Gemini AI để giải thích ý nghĩa của joke bằng tiếng Việt
- 📱 **Responsive Design**: Giao diện thân thiện trên mọi thiết bị
- 🎨 **UI hiện đại**: Thiết kế đẹp mắt với hiệu ứng mượt mà

## 🚀 Demo

Ứng dụng được deploy tại: [https://joke-generator-one-sand.vercel.app/]

## 📋 Yêu cầu

- Node.js (phiên bản 14 trở lên)
- Tài khoản Vercel (để deploy)
- Google Gemini API Key (để sử dụng tính năng giải thích joke)

## 🛠️ Cài đặt

1. Clone repository:
```bash
git clone https://github.com/TienxDun/joke-generator.git
cd joke-generator
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` trong thư mục gốc và thêm API key của Gemini:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Chạy ứng dụng ở môi trường development:
```bash
npm run dev
```

5. Mở trình duyệt và truy cập `http://localhost:3000`

## 📦 Cấu trúc dự án

```
joke-generator/
├── api/
│   └── explain.js          # API endpoint để giải thích joke bằng Gemini AI
├── index.html              # Trang chính của ứng dụng
├── script.js               # Logic xử lý joke, dịch, và giải thích
├── style.css               # Styling cho ứng dụng
├── vercel.json             # Cấu hình deploy cho Vercel
├── package.json            # Dependencies và scripts
└── README.md               # Tài liệu dự án
```

## 🎮 Sử dụng

1. **Nhận joke mới**: Nhấn nút "Nhận Joke Mới" để lấy một joke ngẫu nhiên từ API
2. **Dịch sang tiếng Việt**: Nhấn nút "Dịch Tiếng Việt" để dịch joke hiện tại
3. **Giải thích joke**: Nhấn nút "Giải thích" để AI giải thích tại sao joke này hài hước

## 🌐 Deploy lên Vercel

1. Cài đặt Vercel CLI:
```bash
npm install -g vercel
```

2. Login vào Vercel:
```bash
vercel login
```

3. Deploy dự án:
```bash
vercel
```

4. Thêm biến môi trường `GEMINI_API_KEY` trong Vercel dashboard:
   - Vào Project Settings > Environment Variables
   - Thêm key `GEMINI_API_KEY` với giá trị API key của bạn

## 🔧 Công nghệ sử dụng

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **API**: 
  - [JokeAPI v2](https://v2.jokeapi.dev/) - Lấy joke ngẫu nhiên
  - [Google Translate API](https://translate.googleapis.com/) - Dịch joke
  - [Google Gemini AI](https://ai.google.dev/) - Giải thích joke
- **Deployment**: Vercel
- **Backend**: Vercel Serverless Functions

## 📝 License

Dự án này được phân phối dưới giấy phép [MIT License](LICENSE).

## 👤 Tác giả

**TienxDun**

- GitHub: [@TienxDun](https://github.com/TienxDun)

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy:

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 🐛 Báo lỗi

Nếu bạn phát hiện lỗi, vui lòng tạo issue tại [GitHub Issues](https://github.com/TienxDun/joke-generator/issues).

## ⭐ Hỗ trợ

Nếu bạn thấy dự án này hữu ích, hãy cho một ⭐ trên GitHub!

---

Made with ❤️ by TienxDun
