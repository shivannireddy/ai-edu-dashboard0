# 🚀 Quick Deployment Guide

## ✅ Prerequisites Completed
- ✅ Vercel CLI installed
- ✅ Configuration files created
- ✅ Python service configured for Railway

---

## 📋 Deployment Steps (5-10 minutes)

### **Step 1: Deploy Python AI Detection Service (Railway)**

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose "Empty Project" if no GitHub yet
5. Or upload the `python-service` folder
6. Railway will auto-detect Python and deploy
7. **Copy the deployment URL** (e.g., `https://your-app.up.railway.app`)

**Alternative: Use Render.com**
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub or upload code
4. Root Directory: `python-service`
5. Build Command: `pip install -r requirements.txt`
6. Start Command: `python main.py`
7. Instance Type: Free
8. Deploy!

---

### **Step 2: Deploy Next.js App (Vercel)**

Run this command from your project folder:

```bash
cd c:\Users\madhu\Shivani\ai-edu-dashboard
vercel
```

**Follow the prompts:**
1. Login to Vercel (browser will open)
2. "Set up and deploy"? → **Yes**
3. "Which scope"? → Choose your account
4. "Link to existing project"? → **No**
5. "Project name"? → `ai-edu-dashboard` (or custom)
6. "Directory"? → `./` (press Enter)
7. "Override settings"? → **No**

**Vercel will:**
- Build your app
- Deploy it
- Give you a URL like: `https://ai-edu-dashboard.vercel.app`

---

### **Step 3: Set Environment Variables in Vercel**

After deployment, go to Vercel Dashboard:

1. Go to your project → Settings → Environment Variables
2. Add these variables:

```env
DATABASE_URL = postgresql://user:pass@host:5432/db
NEXTAUTH_URL = https://your-app.vercel.app
NEXTAUTH_SECRET = your-32-char-secret-here
OPENAI_API_KEY = YOUR_OPENROUTER_API_KEY
DETECTGPT_SERVICE_URL = https://your-python-app.railway.app
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

Or use: `python -c "import secrets; print(secrets.token_urlsafe(32))"`

3. Click "Redeploy" to apply changes

---

### **Step 4: Setup PostgreSQL Database**

**Option A: Supabase (Recommended - Free)**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings → Database
4. Add to Vercel env as `DATABASE_URL`

**Option B: Neon**
1. Go to [neon.tech](https://neon.tech)
2. Create database
3. Copy connection URL
4. Add to Vercel

**Option C: Railway PostgreSQL**
1. In Railway, click "New" → Database → PostgreSQL
2. Copy the connection string
3. Add to Vercel

---

### **Step 5: Initialize Database**

After adding DATABASE_URL:

```bash
# In Vercel dashboard → Deployments → Latest → More → Redeploy
# This will run prisma generate and db push automatically
```

Or manually:
```bash
DATABASE_URL="your-production-url" npx prisma db push
```

---

### **Step 6: Import Data (Optional)**

If you want to import your sample data:

```bash
# Update .env with production DATABASE_URL
DATABASE_URL="your-prod-url" node quick-restore-data.js
```

---

## 🎉 Deployment Complete!

### **Your Live URLs:**

📱 **Next.js App**: `https://your-app.vercel.app`
🤖 **Python AI Service**: `https://your-python.railway.app`
🗄️ **Database**: Hosted on Supabase/Neon/Railway

---

## ✅ Post-Deployment Checklist

- [ ] Both URLs are accessible
- [ ] Can login with test credentials
- [ ] Python service returns JSON at root URL
- [ ] AI detection works in student portal
- [ ] Dashboard loads correctly
- [ ] Assignment creation works

---

## 🔧 Troubleshooting

### "Module not found" error
- Redeploy in Vercel dashboard
- Check build logs

### "Database connection failed"
- Verify DATABASE_URL is correct
- Ensure IP is whitelisted in database settings

### "AI Detection not working"
- Check DETECTGPT_SERVICE_URL is set correctly
- Test Python service URL directly
- Ensure Railway/Render service is running

### "NextAuth error"
- NEXTAUTH_URL must match deployment URL exactly
- NEXTAUTH_SECRET must be at least 32 characters

---

## 📊 Monitoring

**Vercel:**
- Analytics: Project → Analytics
- Logs: Deployments → Click deployment → Logs

**Railway/Render:**
- Metrics: Project → Metrics
- Logs: Available in dashboard

---

## 💰 Cost

All services have free tiers:
- ✅ **Vercel**: Free (100GB bandwidth/month)
- ✅ **Railway**: $5 free credit/month
- ✅ **Supabase**: Free (500MB database)
- ✅ **Render**: Free tier available

**Total: FREE** for development/testing

---

## 🔄 Continuous Deployment

Once set up, future deployments are automatic:

```bash
# Just run
vercel
# or
vercel --prod
```

Every push to GitHub will auto-deploy on Vercel!

---

## 📞 Need Help?

Check logs in:
- Vercel dashboard
- Railway/Render dashboard
- Browser console (F12)
