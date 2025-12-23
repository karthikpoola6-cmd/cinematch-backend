export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      return res.status(401).json({ error: 'No API key provided' });
    }

    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await anthropicResponse.json();
    return res.status(anthropicResponse.status).json(data);
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error', message: error.message });
  }
}
```

4. Scroll down
5. Click **"Commit changes"**
6. Click **"Commit changes"** again in the popup

---

### Step 3: Wait for Vercel to Rebuild

1. Go to **vercel.com/dashboard**
2. Click on **cinematch-backend**
3. You'll see "Building..." or a spinner
4. **Wait 1-2 minutes** (very important!)
5. Look for a green checkmark ✅ that says "Ready"

---

### Step 4: Test Your Backend

Open this URL in a new tab:
```
https://cinematch-backend-ten.vercel.app/api/claude
