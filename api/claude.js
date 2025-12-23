export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      res.status(401).json({ error: 'No API key provided' });
      return;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
    
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
}
```

### Step 4: Save the File
1. Scroll down
2. Click **"Commit new file"**

You should now see an `api` folder with `claude.js` inside. ✅

**Your GitHub backend is ready!** You should have:
- vercel.json
- package.json
- api/claude.js

---

## PART 5: Deploy on Vercel Website

### Step 1: Go to Vercel
1. Open a new tab
2. Go to **vercel.com**

### Step 2: Sign Up / Login
1. Click **"Sign Up"** (top right)
   - Or **"Login"** if you have an account
2. Click **"Continue with GitHub"**
3. It will ask for permission - click **"Authorize Vercel"**
4. You might need to enter your GitHub password

### Step 3: Import Your Project
1. You should now be on Vercel's dashboard
2. Click **"Add New..."** button
3. Click **"Project"**
4. You'll see a list of your GitHub repositories
5. Find **cinematch-backend** in the list
6. Click the **"Import"** button next to it

### Step 4: Configure (Don't Change Anything!)
1. You'll see a configuration page
2. **DON'T CHANGE ANYTHING**
3. Just scroll down
4. Click the big blue **"Deploy"** button

### Step 5: Wait for Deployment
1. You'll see a loading screen with fun animations
2. Wait 30-60 seconds
3. You'll see **"Congratulations!"** with confetti 🎉

### Step 6: Copy Your URL
1. You'll see something like:
```
   https://cinematch-backend-abc123xyz.vercel.app
