# Máy Tạo Joke Ngẫu Nhiên

Một ứng dụng web đơn giản để tạo và giải thích joke ngẫu nhiên bằng tiếng Việt. Ứng dụng sử dụng JokeAPI để lấy joke từ nhiều nguồn, hỗ trợ dịch sang tiếng Việt và giải thích bằng AI.

## Tính năng

- 🎲 Tạo joke ngẫu nhiên từ JokeAPI (chế độ an toàn)
- 🌐 Dịch joke sang tiếng Việt bằng Google Translate
- 🤔 Giải thích joke bằng AI (Gemini) với phân tích hài hước
- � **Chọn model AI**: Gemini 2.5 Flash, 2.0 Flash, 2.5 Pro, hoặc Pro
- �📱 Giao diện thân thiện, responsive, hỗ trợ mobile
- 💾 Lưu lựa chọn model trong trình duyệt
- ⚡ Tải nhanh, không cần cài đặt

## Yêu cầu hệ thống

- Node.js (phiên bản 14+)
- Trình duyệt web hiện đại
- API key từ Google Gemini (cho tính năng giải thích)

## Cài đặt

1. Clone repository:

   ```bash
   git clone https://github.com/TienxDun/joke-generator.git
   cd joke-generator
   ```

2. Cài đặt dependencies:

   ```bash
   npm install
   ```

3. Tạo file `.env` và thêm API key:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

## Chạy locally

```bash
npm run build
npm start
```

Sau đó mở `http://localhost:3000` trong trình duyệt hoặc file `public/index.html`.

## Sử dụng

1. **Chọn model AI**: Sử dụng dropdown "Model AI" để chọn model Gemini phù hợp
   - Gemini 2.5 Flash: Nhanh nhất, phù hợp cho hầu hết trường hợp
   - Gemini 2.0 Flash: Phiên bản ổn định trước đó
   - Gemini 2.5 Pro: Model mạnh hơn, chi tiết hơn
2. Nhấn nút "Nhận Joke Mới" để lấy joke ngẫu nhiên
3. Joke sẽ hiển thị với hiệu ứng delay cho punchline
4. Sử dụng nút "Dịch Tiếng Việt" để dịch sang tiếng Việt
5. Nhấn "Giải thích" để xem phân tích hài hước từ AI đã chọn

**Lưu ý**: Lựa chọn model sẽ được lưu tự động trong trình duyệt.

## Deploy

Dự án được cấu hình để deploy trên Vercel:

```bash
vercel --prod
```

Đảm bảo đã thiết lập biến môi trường `GEMINI_API_KEY` trong Vercel dashboard.

## Cấu trúc dự án

```text
├── index.html          # Giao diện chính
├── script.js           # Logic frontend (fetch API, translate, explain)
├── style.css           # Styling responsive
├── build.js            # Script build cho production
├── vercel.json         # Cấu hình Vercel
├── api/
│   └── explain.js      # Serverless function giải thích joke
└── public/             # Files build (tạo bởi build.js)
```

## API sử dụng

- **[JokeAPI](https://v2.jokeapi.dev/)** - Nguồn joke đa dạng, hỗ trợ safe-mode
- **Google Translate API** - Dịch tự động sang tiếng Việt
- **Gemini AI** - Phân tích và giải thích joke một cách hài hước

## Đóng góp

Contributions welcome! Hãy tạo issue hoặc pull request.

## Tác giả

**TienxDun** - [GitHub](https://github.com/TienxDun)

## License

MIT

