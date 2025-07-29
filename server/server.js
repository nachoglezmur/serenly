const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Tu frontend
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Proxy endpoint para OpenRouter
app.post('/api/chat', async (req, res) => {
  try {
    console.log('🚀 Recibido request del frontend');
    console.log('📦 Body:', JSON.stringify(req.body, null, 2));
    
    const { messages, apiKey } = req.body;
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }
    
    console.log('🔑 Using API Key:', apiKey.substring(0, 15) + '...');
    
    // Importar fetch dinámicamente para Node 18+
    const fetch = (await import('node-fetch')).default;
    
    const requestBody = {
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages: [
        { 
          role: 'system', 
          content: 'Eres Zen, un asistente de bienestar emocional calmado, empático y sabio. Respondes de manera comprensiva, ofreces apoyo emocional y técnicas de mindfulness. Mantén un tono sereno y acogedor. Responde en español siempre.'
        }, 
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    };
    
    console.log('📤 Enviando a OpenRouter...');
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3001',
        'X-Title': 'Espacio Zen - Asistente de Bienestar'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('📡 OpenRouter response status:', response.status);
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ OpenRouter error:', data);
      return res.status(response.status).json(data);
    }
    
    console.log('✅ Success! Enviando respuesta al frontend');
    res.json(data);
    
  } catch (error) {
    console.error('💥 Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Proxy server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

// Para instalarlo:
// 1. mkdir server && cd server
// 2. npm init -y
// 3. npm install express cors
// 4. node server.js