# Screenshot to Code - AI Design Tool

Transform any UI screenshot into code or perfect AI prompts. Upload, adjust with AI chat, then export to code (React Native, Flutter, React) or prompts (Lovable, v0, Bolt, Cursor, Rork).

## 🚀 Features

- **📸 Screenshot Upload** - Drag & drop any UI screenshot
- **💬 AI Chat Interface** - Natural language design adjustments
- **👁️ Live Preview** - See changes in real-time
- **💻 Export to Code** - Get React Native, Flutter, or React code
- **✨ Export to Prompts** - Generate perfect prompts for AI coding tools
- **🎨 Multiple Platforms** - Support for Lovable, v0, Bolt, Cursor, and Rork

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4 Vision & GPT-4 Turbo
- **State Management**: Zustand
- **UI Components**: Lucide Icons, React Dropzone

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- OpenAI API key with GPT-4 Vision access

### Local Development

1. **Clone or download this repository**

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory (already created for you):
```env
OPENAI_API_KEY=your_key_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel (Recommended - FREE)

### Method 1: Deploy from GitHub

1. **Push code to GitHub**
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/screenshot-to-code.git

# Push
git branch -M main
git push -u origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Add environment variable:
  - **Name**: `OPENAI_API_KEY`
  - **Value**: Your OpenAI API key
- Click "Deploy"

**Done! Your app will be live in ~2 minutes** 🎉

### Method 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add OPENAI_API_KEY

# Deploy to production
vercel --prod
```

## 🚂 Alternative: Deploy to Railway

1. **Push code to GitHub** (same as above)

2. **Deploy on Railway**
- Go to [railway.app](https://railway.app)
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your repository
- Add environment variable:
  - **Key**: `OPENAI_API_KEY`
  - **Value**: Your OpenAI API key
- Click "Deploy"

## 📖 How to Use

### 1. Upload a Screenshot
- Drag & drop or click to upload any UI screenshot
- Supports PNG, JPG, JPEG, WEBP

### 2. Chat to Adjust Design
Examples:
- "Make the buttons bigger"
- "Change to dark mode"
- "Add a search bar at the top"
- "Use a more modern color scheme"

### 3. Export Your Design

**Option A: Export to Code**
- Choose framework: React Native, Flutter, or React
- Get production-ready code
- Download or copy to clipboard

**Option B: Export to Prompt**
- Choose platform: Lovable, v0, Bolt, Cursor, or Rork
- Get a detailed, structured prompt
- Paste into your AI coding tool
- Get perfect results every time

## 💡 Use Cases

- **Solo Developers**: Prototype apps quickly without design skills
- **Agencies**: Speed up client mockups and handoffs
- **Designers**: Convert designs to code-ready specifications
- **Founders**: Build MVPs faster
- **Students**: Learn UI patterns and code structure

## 🎯 Supported Export Platforms

### Code Exports
- **React Native** - Mobile apps (iOS & Android)
- **Flutter** - Cross-platform mobile apps
- **React** - Web applications

### Prompt Exports
- **Lovable.ai** - Full-stack web apps
- **v0.dev** - React components with Tailwind
- **Bolt.new** - Complete applications
- **Cursor** - AI-powered coding
- **Rork** - UI generation

## 🔑 Getting an OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Make sure you have GPT-4 Vision access (check your plan)

**Cost**: ~$0.02-0.05 per screenshot analysis/adjustment

## 🏗️ Project Structure

```
screenshot-to-code-app/
├── app/
│   ├── api/              # API routes
│   │   ├── analyze/      # Screenshot analysis
│   │   ├── adjust/       # Design adjustments
│   │   └── export/       # Code/prompt generation
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── ChatInterface.tsx # AI chat UI
│   ├── ExportModal.tsx   # Export modal
│   ├── ImageUpload.tsx   # File upload
│   └── MockupPreview.tsx # Design preview
├── lib/
│   └── store.ts          # State management
└── package.json
```

## 🐛 Troubleshooting

### "Unauthorized" or API errors
- Check your OpenAI API key is correct
- Ensure you have GPT-4 Vision access
- Check your OpenAI account has credits

### App not loading
- Make sure you ran `npm install`
- Check Node.js version (18+)
- Clear `.next` folder and rebuild

### Deployment issues
- Ensure environment variable is set correctly
- Check Vercel/Railway logs for errors
- Make sure you pushed latest code to GitHub

## 💰 Costs

### Development
- **Free tier**: Test with your OpenAI credits
- **API costs**: ~$0.02-0.05 per screenshot

### Hosting
- **Vercel**: Free tier (hobby projects)
- **Railway**: Free $5/month credit

### Scaling
- For 1000 users/month: ~$50-100 in API costs
- Vercel/Railway: Still free or ~$20/month

## 🔮 Future Features

- [ ] Figma plugin
- [ ] Multi-screen flows
- [ ] Design system builder
- [ ] Team collaboration
- [ ] Version history
- [ ] Component library support
- [ ] Video export
- [ ] Stripe payments
- [ ] User accounts

## 📝 License

MIT License - feel free to use for commercial projects

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 💬 Support

Issues? Questions? 
- Open an issue on GitHub
- Check troubleshooting section above

---

**Built with ❤️ by AI**

Ready to transform your screenshots into code? Let's go! 🚀
