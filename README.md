# 🎭 Joke Generator - Máy Tạo Joke Ngẫu Nhiên# 🎭 Joke Generator - Máy Tạo Joke Ngẫu Nhiên



[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://joke-generator-8547bmyf0-tienxduns-projects.vercel.app)[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://joke-generator-8547bmyf0-tienxduns-projects.vercel.app)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Node.js Version](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)[![Node.js Version](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)



Một ứng dụng web hiện đại giúp tạo ra các joke ngẫu nhiên với khả năng dịch sang tiếng Việt và giải thích ý nghĩa bằng AI. Dự án sử dụng kiến trúc JAMstack với Vercel Serverless Functions.Một ứng dụng web hiện đại giúp tạo ra các joke ngẫu nhiên với khả năng dịch sang tiếng Việt và giải thích ý nghĩa bằng AI. Dự án sử dụng kiến trúc JAMstack với Vercel Serverless Functions.



## ✨ Tính năng chính## ✨ Tính năng chính



### 🎲 Tạo Joke Ngẫu Nhiên### 🎲 **Tạo Joke Ngẫu Nhiên**

- Lấy joke từ [JokeAPI v2](https://v2.jokeapi.dev/) với chế độ safe-mode- Lấy joke từ [JokeAPI v2](https://v2.jokeapi.dev/) với chế độ safe-mode

- Hỗ trợ 2 loại joke: single-line và two-part jokes- Hỗ trợ 2 loại joke: single-line và two-part jokes

- Hiệu ứng delay cho punchline để tăng tính kịch tính- Hiệu ứng delay cho punchline để tăng tính kịch tính



### 🌐 Dịch Tiếng Việt### 🌐 **Dịch Tiếng Việt**

- Tự động dịch joke từ tiếng Anh sang tiếng Việt- Tự động dịch joke từ tiếng Anh sang tiếng Việt

- Sử dụng Google Translate API- Sử dụng Google Translate API

- Chế độ toggle giữa tiếng Anh và tiếng Việt- Chế độ toggle giữa tiếng Anh và tiếng Việt



### 🤖 Giải Thích Joke Bằng AI### 🤖 Giải Thích Joke Bằng AI

- Sử dụng Google Gemini 2.0 Flash AI- Sử dụng Google Gemini 2.0 Flash AI

- Giải thích đơn giản, dễ hiểu bằng tiếng Việt- Giải thích đơn giản, dễ hiểu bằng tiếng Việt

- Phân tích yếu tố hài hước và twist- Phân tích yếu tố hài hước và twist

- Xử lý cả wordplay và cultural jokes- Xử lý cả wordplay và cultural jokes



### 🎨 Trải Nghiệm Người Dùng### 🎨 **Trải Nghiệm Người Dùng**

- **Responsive Design**: Hoạt động mượt mà trên mọi thiết bị- **Responsive Design**: Hoạt động mượt mà trên mọi thiết bị

- **UI Hiện Đại**: Gradient background với hiệu ứng mượt mà- **UI Hiện Đại**: Gradient background với hiệu ứng mượt mà

- **Loading States**: Spinner và feedback trực quan- **Loading States**: Spinner và feedback trực quan

- **Error Handling**: Thông báo lỗi thân thiện- **Error Handling**: Thông báo lỗi thân thiện

- **Accessibility**: Keyboard navigation và screen reader support- **Accessibility**: Keyboard navigation và screen reader support



## 🚀 Demo Trực Tiếp## 🚀 Demo Trực Tiếp



🌐 **[Truy cập ứng dụng](https://joke-generator-8547bmyf0-tienxduns-projects.vercel.app)**🌐 **[Truy cập ứng dụng](https://joke-generator-8547bmyf0-tienxduns-projects.vercel.app)**



## 📋 Yêu cầu hệ thống## 📋 Yêu cầu hệ thống



- **Node.js**: 18.0.0 trở lên- **Node.js**: 18.0.0 trở lên

- **Vercel CLI**: 48.0.0 trở lên (để development)- **Vercel CLI**: 48.0.0 trở lên (để development)

- **Google Gemini API Key**: Để sử dụng tính năng giải thích- **Google Gemini API Key**: Để sử dụng tính năng giải thích



## 🛠️ Cài đặt và Chạy Local## 🛠️ Cài đặt và Chạy Local



### 1. Clone Repository### 1. Clone Repository

```bash

```bashgit clone https://github.com/TienxDun/joke-generator.git

git clone https://github.com/TienxDun/joke-generator.gitcd joke-generator

cd joke-generator```

```

### 2. Cài đặt Dependencies

### 2. Cài đặt Dependencies```bash

npm install

```bash```

npm install

```### 3. Cấu hình Environment Variables



### 3. Cấu hình Environment VariablesTạo file `.env` trong thư mục gốc:

```env

Tạo file `.env` trong thư mục gốc:GEMINI_API_KEY=your_gemini_api_key_here

```

```env

GEMINI_API_KEY=your_gemini_api_key_here> **Lưu ý**: Để lấy Gemini API key, truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)

```

### 4. Chạy Development Server

> **Lưu ý**: Để lấy Gemini API key, truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)```bash

# Sử dụng Vercel CLI (khuyến nghị)

### 4. Chạy Development Servernpm run dev



```bash# Hoặc sử dụng trực tiếp

# Sử dụng Vercel CLI (khuyến nghị)vercel dev

npm run dev```



# Hoặc sử dụng trực tiếp### 5. Truy cập ứng dụng

vercel devMở trình duyệt và truy cập: `http://localhost:3000`

```

## 📦 Cấu trúc dự án

### 5. Truy cập ứng dụng

```

Mở trình duyệt và truy cập: `http://localhost:3000`joke-generator/

├── 📁 api/

## 📦 Cấu trúc dự án│   └── explain.js          # Serverless function cho AI explanation

├── 📁 public/              # Static files sau khi build

```│   ├── index.html

joke-generator/│   ├── script.js

├── 📁 api/│   └── style.css

│   └── explain.js          # Serverless function cho AI explanation├── 📄 index.html           # Template gốc

├── 📁 public/              # Static files sau khi build├── 📄 script.js            # Frontend logic

│   ├── index.html├── 📄 style.css            # Styling

│   ├── script.js├── 📄 build.js             # Build script (ES modules)

│   └── style.css├── 📄 vercel.json          # Vercel configuration

├── 📄 index.html           # Template gốc├── 📄 package.json         # Dependencies & scripts

├── 📄 script.js            # Frontend logic├── 📄 .env                 # Local environment variables

├── 📄 style.css            # Styling└── 📄 README.md            # Documentation

├── 📄 build.js             # Build script (ES modules)```

├── 📄 vercel.json          # Vercel configuration

├── 📄 package.json         # Dependencies & scripts## 🎮 Hướng dẫn sử dụng

├── 📄 .env                 # Local environment variables

└── 📄 README.md            # Documentation### Quy trình cơ bản:

```1. **Nhận Joke Mới**: Click nút "🎲 Nhận Joke Mới"

2. **Xem Punchline**: Đợi 500ms để thấy punchline (với two-part jokes)

## 🎮 Hướng dẫn sử dụng3. **Dịch Tiếng Việt**: Click nút "🌐 Dịch Tiếng Việt" (nếu cần)

4. **Giải Thích**: Click nút "🤔 Giải Thích" để AI phân tích joke

### Quy trình cơ bản

### Giao diện:

1. **Nhận Joke Mới**: Click nút "🎲 Nhận Joke Mới"- **Joke Display**: Khu vực hiển thị joke chính

2. **Xem Punchline**: Đợi 500ms để thấy punchline (với two-part jokes)- **Secondary Buttons**: Các nút phụ xuất hiện sau khi có joke

3. **Dịch Tiếng Việt**: Click nút "🌐 Dịch Tiếng Việt" (nếu cần)- **Explanation Panel**: Panel giải thích có thể đóng/mở

4. **Giải Thích**: Click nút "🤔 Giải Thích" để AI phân tích joke- **Loading Spinner**: Hiển thị khi đang xử lý API calls



### Giao diện## 🌐 API Documentation



- **Joke Display**: Khu vực hiển thị joke chính### POST `/api/explain`

- **Secondary Buttons**: Các nút phụ xuất hiện sau khi có jokeGiải thích joke bằng Google Gemini AI

- **Explanation Panel**: Panel giải thích có thể đóng/mở

- **Loading Spinner**: Hiển thị khi đang xử lý API calls**Request Body:**

```json

## 🌐 API Documentation{

  "jokeText": "Why did the chicken cross the road? To get to the other side!"

### POST `/api/explain`}

```

Giải thích joke bằng Google Gemini AI

**Response:**

**Request Body:**```json

{

```json  "explanation": "Đây là một câu joke kinh điển... [giải thích chi tiết]"

{}

  "jokeText": "Why did the chicken cross the road? To get to the other side!"```

}

```**Error Response:**

```json

**Response:**{

  "error": "Không thể giải thích joke này lúc này."

```json}

{```

  "explanation": "Đây là một câu joke kinh điển... [giải thích chi tiết]"

}## 🚀 Deployment

```

### Tự động Deploy với Vercel

**Error Response:**

1. **Cài đặt Vercel CLI:**

```json```bash

{npm install -g vercel

  "error": "Không thể giải thích joke này lúc này."```

}

```2. **Login và Deploy:**

```bash

## 🚀 Deploymentvercel login

vercel --prod

### Tự động Deploy với Vercel```



1. **Cài đặt Vercel CLI:**3. **Cấu hình Environment Variables:**

```bash

```bash# Thêm API key cho Production

npm install -g vercelvercel env add GEMINI_API_KEY

```

# Thêm API key cho Development

2. **Login và Deploy:**vercel env add GEMINI_API_KEY --environment development

```

```bash

vercel login### Manual Deploy

vercel --prod1. Push code lên GitHub

```2. Connect repository với Vercel

3. Vercel sẽ tự động build và deploy

3. **Cấu hình Environment Variables:**

## 🔧 Tech Stack

```bash

# Thêm API key cho Production### Frontend

vercel env add GEMINI_API_KEY- **HTML5**: Semantic markup

- **CSS3**: Modern styling với Flexbox/Grid

# Thêm API key cho Development- **Vanilla JavaScript**: ES6+ features, async/await

vercel env add GEMINI_API_KEY --environment development

```### Backend

- **Vercel Serverless Functions**: Node.js runtime

### Manual Deploy- **Google Gemini AI**: Text generation và analysis

- **Google Translate API**: Language translation

1. Push code lên GitHub

2. Connect repository với Vercel### DevOps & Tools

3. Vercel sẽ tự động build và deploy- **Vercel**: Hosting và serverless platform

- **ES Modules**: Modern JavaScript modules

## 🔧 Tech Stack- **Responsive Design**: Mobile-first approach

- **CORS**: Cross-origin resource sharing

### Frontend

- **HTML5**: Semantic markup### External APIs

- **CSS3**: Modern styling với Flexbox/Grid- **JokeAPI v2**: Random joke generation

- **Vanilla JavaScript**: ES6+ features, async/await- **Google Translate**: Language translation

- **Google Gemini**: AI-powered explanations

### Backend

- **Vercel Serverless Functions**: Node.js runtime## 🔍 Flow Hoạt Động

- **Google Gemini AI**: Text generation và analysis

- **Google Translate API**: Language translation```

1. User clicks "Nhận Joke Mới"

### DevOps & Tools2. Frontend → JokeAPI → Random joke data

- **Vercel**: Hosting và serverless platform3. Display joke with optional punchline delay

- **ES Modules**: Modern JavaScript modules4. User can translate or explain

- **Responsive Design**: Mobile-first approach5. Translation: Frontend → Google Translate API

- **CORS**: Cross-origin resource sharing6. Explanation: Frontend → /api/explain → Gemini AI → Response

7. Display results with loading states

### External APIs```

- **JokeAPI v2**: Random joke generation

- **Google Translate**: Language translation## 🐛 Troubleshooting

- **Google Gemini**: AI-powered explanations

### Lỗi thường gặp:

## 🔍 Flow Hoạt Động

**❌ "API failed" khi giải thích joke**

```- Kiểm tra `GEMINI_API_KEY` trong environment variables

1. User clicks "Nhận Joke Mới"- Đảm bảo API key còn hạn và có quota

2. Frontend → JokeAPI → Random joke data

3. Display joke with optional punchline delay**❌ "Failed to fetch joke"**

4. User can translate or explain- Kiểm tra kết nối internet

5. Translation: Frontend → Google Translate API- JokeAPI có thể đang down (hiếm)

6. Explanation: Frontend → /api/explain → Gemini AI → Response

7. Display results with loading states**❌ "Translation failed"**

```- Google Translate API có rate limits

- Thử lại sau vài giây

## 🐛 Troubleshooting

**❌ Build errors trên Vercel**

### Lỗi thường gặp- Đảm bảo `package.json` có `"type": "module"`

- Kiểm tra syntax trong `build.js`

**❌ "API failed" khi giải thích joke**

- Kiểm tra `GEMINI_API_KEY` trong environment variables### Debug Commands:

- Đảm bảo API key còn hạn và có quota```bash

# Test local API

**❌ "Failed to fetch joke"**vercel dev

- Kiểm tra kết nối internet

- JokeAPI có thể đang down (hiếm)# Check environment variables

vercel env ls

**❌ "Translation failed"**

- Google Translate API có rate limits# View build logs

- Thử lại sau vài giâyvercel logs

```

**❌ Build errors trên Vercel**

- Đảm bảo `package.json` có `"type": "module"`## 🤝 Đóng góp

- Kiểm tra syntax trong `build.js`

Chúng tôi hoan nghênh mọi đóng góp! 🎉

### Debug Commands

### Quy trình đóng góp:

```bash1. **Fork** dự án

# Test local API2. **Tạo feature branch**: `git checkout -b feature/AmazingFeature`

vercel dev3. **Commit changes**: `git commit -m 'Add AmazingFeature'`

4. **Push to branch**: `git push origin feature/AmazingFeature`

# Check environment variables5. **Mở Pull Request**

vercel env ls

### Coding Standards:

# View build logs- Sử dụng ES6+ syntax

vercel logs- Thêm JSDoc comments cho functions

```- Test trên multiple browsers

- Follow conventional commits

## 🤝 Đóng góp

## 📄 License

Chúng tôi hoan nghênh mọi đóng góp! 🎉

Dự án này được phân phối dưới giấy phép **MIT License**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

### Quy trình đóng góp

## 👤 Tác giả

1. **Fork** dự án

2. **Tạo feature branch**: `git checkout -b feature/AmazingFeature`**TienxDun** 🚀

3. **Commit changes**: `git commit -m 'Add AmazingFeature'`

4. **Push to branch**: `git push origin feature/AmazingFeature`- **GitHub**: [@TienxDun](https://github.com/TienxDun)

5. **Mở Pull Request**- **LinkedIn**: [Tien Nguyen](https://linkedin.com/in/tienxdun)

- **Portfolio**: [tienxdun.dev](https://tienxdun.dev)

### Coding Standards

## 🙏 Acknowledgments

- Sử dụng ES6+ syntax

- Thêm JSDoc comments cho functions- **JokeAPI** - Nguồn cung cấp jokes

- Test trên multiple browsers- **Google AI** - Gemini và Translate APIs

- Follow conventional commits- **Vercel** - Platform hosting tuyệt vời

- **Open Source Community** - Inspiration và tools

## 📄 License

## 📞 Liên hệ

Dự án này được phân phối dưới giấy phép **MIT License**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

Nếu bạn có câu hỏi hoặc cần hỗ trợ:

## 👤 Tác giả

- 📧 **Email**: tienxdun@example.com

**TienxDun** 🚀- 💬 **Issues**: [GitHub Issues](https://github.com/TienxDun/joke-generator/issues)

- 📱 **Discussions**: [GitHub Discussions](https://github.com/TienxDun/joke-generator/discussions)

- **GitHub**: [@TienxDun](https://github.com/TienxDun)

- **LinkedIn**: [Tien Nguyen](https://linkedin.com/in/tienxdun)---

- **Portfolio**: [tienxdun.dev](https://tienxdun.dev)

<div align="center">

## 🙏 Acknowledgments

**Made with ❤️ by [TienxDun](https://github.com/TienxDun)**

- **JokeAPI** - Nguồn cung cấp jokes

- **Google AI** - Gemini và Translate APIs⭐ **Nếu bạn thấy dự án này hữu ích, hãy cho một ngôi sao nhé!**

- **Vercel** - Platform hosting tuyệt vời

- **Open Source Community** - Inspiration và tools[🌐 Truy cập Demo](https://joke-generator-8547bmyf0-tienxduns-projects.vercel.app) •

[📖 Documentation](https://github.com/TienxDun/joke-generator#readme) •

## 📞 Liên hệ[🐛 Report Bug](https://github.com/TienxDun/joke-generator/issues)



Nếu bạn có câu hỏi hoặc cần hỗ trợ:</div>


- 📧 **Email**: tienxdun@example.com
- 💬 **Issues**: [GitHub Issues](https://github.com/TienxDun/joke-generator/issues)
- 📱 **Discussions**: [GitHub Discussions](https://github.com/TienxDun/joke-generator/discussions)

---

<div align="center">

**Made with ❤️ by [TienxDun](https://github.com/TienxDun)**

⭐ **Nếu bạn thấy dự án này hữu ích, hãy cho một ngôi sao nhé!**

[🌐 Truy cập Demo](https://joke-generator-8547bmyf0-tienxduns-projects.vercel.app) •
[📖 Documentation](https://github.com/TienxDun/joke-generator#readme) •
[🐛 Report Bug](https://github.com/TienxDun/joke-generator/issues)

</div>