# OpenAI Setup Guide - Quick Steps

## ✅ Current Status
- ✅ OpenAI package installed
- ✅ Server code updated to use OpenAI
- ✅ dotenv configured
- ⚠️ **Need**: OpenAI API key

## 🔑 Get Your OpenAI API Key

### Step 1: Sign Up / Login
1. Go to: **https://platform.openai.com/signup**
2. Create an account or login
3. Verify your email

### Step 2: Get API Key
1. Visit: **https://platform.openai.com/api-keys**
2. Click **"Create new secret key"**
3. Name it: "EPISD AI Prompt"
4. Click **"Create secret key"**
5. **COPY THE KEY** - looks like: `sk-proj-...` or `sk-...`
6. Save it somewhere safe (you can't see it again!)

### Step 3: Add Payment Method
1. Go to: **https://platform.openai.com/account/billing**
2. Add a credit card
3. Set usage limits (recommended: $5-10/month for testing)

**Cost**: GPT-3.5-turbo is ~$0.002 per 1,000 tokens (very cheap!)

## 🔧 Configure Your Project

### Option A: Use .env File (RECOMMENDED)

1. Create a file named `.env` in your project root:
   ```
   D:\Projects\EPISD\deploy template\.env
   ```

2. Add this content (replace with YOUR key):
   ```env
   OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```

3. Save the file

4. Restart your server (see below)

### Option B: Set Environment Variable (Alternative)

**PowerShell** (temporary - current session only):
```powershell
$env:OPENAI_API_KEY="sk-proj-your-actual-key-here"
```

**Windows System** (permanent):
1. Press `Windows + R`
2. Type `sysdm.cpl` and press Enter
3. Go to **Advanced** tab → **Environment Variables**
4. Under "User variables", click **New**
5. Variable name: `OPENAI_API_KEY`
6. Variable value: `sk-proj-your-actual-key-here`
7. Click OK
8. **Restart PowerShell**

## 🚀 Restart Your Server

After setting the API key, restart the server:

### If using .env file:
```powershell
# Stop server (Ctrl+C if running in terminal)
# Or kill all node processes:
taskkill /F /IM node.exe

# Navigate to project
cd "D:\Projects\EPISD\deploy template"

# Start server
node server.js
```

### If using PowerShell session variable:
```powershell
# Set the variable
$env:OPENAI_API_KEY="sk-proj-your-key-here"

# Navigate and start
cd "D:\Projects\EPISD\deploy template"
node server.js
```

## ✅ Test It!

1. Go to: `http://localhost:8080/ai-prompt`
2. Enter a prompt like:
   ```
   Explain async/await in JavaScript in simple terms
   ```
3. Click **Submit Prompt**
4. You should get a **REAL AI response** from OpenAI! 🎉

## 🔍 How to Know It's Working

**In the server console, you should see:**
```
Using OpenAI API for response generation...
✓ OpenAI response generated successfully
✓ Prompt and response saved to Firebase with ID: ...
```

**If it's not working:**
- Check server console for errors
- Verify your API key is correct
- Make sure you have billing set up
- Check your OpenAI dashboard for usage

## 💰 Cost Information

**GPT-3.5-turbo Pricing:**
- ~$0.002 per 1,000 tokens
- Average prompt + response ≈ 500 tokens
- That's about $0.001 per request (one-tenth of a cent!)
- 1,000 requests ≈ $1

**Example monthly costs:**
- 10 prompts/day = $3/month
- 50 prompts/day = $15/month
- 100 prompts/day = $30/month

Set usage limits in your OpenAI dashboard to prevent surprises!

## 🔐 Security Tips

✅ **DO:**
- Use `.env` file for local development
- Add `.env` to `.gitignore` (already done)
- Set usage limits on OpenAI dashboard
- Monitor your usage regularly

❌ **DON'T:**
- Commit API keys to git
- Share your API keys
- Use the same key in production and development
- Forget to set usage limits

## 🐛 Troubleshooting

**Error: "OpenAI API Error: Incorrect API key"**
- Double-check your API key
- Make sure there are no extra spaces
- Verify it starts with `sk-`

**Error: "You exceeded your current quota"**
- Add billing information at platform.openai.com
- Check your payment method is valid
- Add credits to your account

**Error: "Rate limit exceeded"**
- You're making too many requests
- Wait a minute and try again
- Consider upgrading your OpenAI tier

**Still getting mock responses?**
- Verify the `.env` file exists in project root
- Check the environment variable is set
- Restart the server after setting the key
- Check server console for error messages

## 📊 Monitor Usage

Check your OpenAI usage at:
- **https://platform.openai.com/usage**

You can see:
- Number of requests
- Total tokens used
- Cost breakdown
- Usage over time

## 🎉 Summary

1. ✅ Get API key from platform.openai.com
2. ✅ Add billing information
3. ✅ Create `.env` file with your key
4. ✅ Restart server
5. ✅ Test with a prompt
6. ✅ Enjoy real AI responses!

---

**Need help?** Check the server console for detailed error messages!

