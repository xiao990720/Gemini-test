import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // In-memory store for nodes & test history
  let nodesStore = [
    {
      id: 'node-1',
      name: '🚀 US-SiliconValley-01 [Google Optimized]',
      uri: 'vmess://eyJhZGRyIjoiMTkuMjIuMTQyLjE0IiwicG9ydCI6NDQzLCJpZCI6ImRiYTgxMjBhLTU4YjEtNGFmMi05MjZiLWIzZDhmODg4YjgxNSIsImFpZCI6IjAiLCJuZXd0IjoidGNwIn0=',
      protocol: 'vmess',
      category: 'Google / Gemini',
      exitIp: '104.28.19.42',
      country: '🇺🇸 United States',
      latency: 48,
      speed: 24.5, // MB/s
      googleStatus: '🟢 Available',
      geminiStatus: '🟢 Available',
      xaiStatus: '🟢 Available',
      status: 'optimal',
      lastTested: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 'node-2',
      name: '⚡ HK-Tencent-02 [Low Latency]',
      uri: 'trojan://pass123@hk.node.example.com:8443?security=tls#HK-02',
      protocol: 'trojan',
      category: 'General',
      exitIp: '154.212.88.10',
      country: '🇭🇰 Hong Kong',
      latency: 24,
      speed: 45.2,
      googleStatus: '🟢 Available',
      geminiStatus: '🟢 Available',
      xaiStatus: '🟢 Available',
      status: 'optimal',
      lastTested: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: 'node-3',
      name: '🇯🇵 JP-Tokyo-03 [AI Ready]',
      uri: 'ss://Y2hhY2hhMjAtaWV0Zi1wb2x5MTMwNTpwYXNzMTIzQGpwLm5vZGUuZXhhbXBsZS5jb206NDE0MzM=#JP-03',
      protocol: 'shadowsocks',
      category: 'Google / Gemini',
      exitIp: '103.152.220.5',
      country: '🇯🇵 Japan',
      latency: 62,
      speed: 18.9,
      googleStatus: '🟢 Available',
      geminiStatus: '🟢 Available',
      xaiStatus: '🟡 Restricted',
      status: 'optimal',
      lastTested: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: 'node-4',
      name: '🇸🇬 SG-AWS-04 [High Bandwidth]',
      uri: 'hysteria2://passwd@sg.node.example.com:36500?insecure=1#SG-04',
      protocol: 'hysteria2',
      category: 'Streaming',
      exitIp: '18.140.89.200',
      country: '🇸🇬 Singapore',
      latency: 85,
      speed: 82.4,
      googleStatus: '🟢 Available',
      geminiStatus: '🟢 Available',
      xaiStatus: '🟢 Available',
      status: 'optimal',
      lastTested: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: 'node-5',
      name: '🇩🇪 DE-Frankfurt-05 [Europe Hub]',
      uri: 'vmess://eyJhZGRyIjoiMTQuMi44LjE2IiwicG9ydCI6NDQzLCJpZCI6ImRhYzgxMjBhLTU4YjEtNGFmMi05MjZiLWIzZDhmODg4YjgxNiJ9',
      protocol: 'vmess',
      category: 'General',
      exitIp: '85.214.120.9',
      country: '🇩🇪 Germany',
      latency: 185,
      speed: 9.2,
      googleStatus: '🟢 Available',
      geminiStatus: '🟡 Slow',
      xaiStatus: '🔴 Blocked',
      status: 'slow',
      lastTested: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    }
  ];

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      version: '2.4.0-macos',
      activeDaemon: true,
      nodesCount: nodesStore.length,
      platform: 'macOS Sonoma / Sequoia App',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/nodes', (req, res) => {
    res.json(nodesStore);
  });

  app.post('/api/nodes', (req, res) => {
    const { nodes } = req.body;
    if (Array.isArray(nodes)) {
      nodesStore = nodes;
      res.json({ success: true, count: nodesStore.length });
    } else {
      res.status(400).json({ error: 'Invalid nodes array' });
    }
  });

  // Test single or batch nodes
  app.post('/api/test-nodes', async (req, res) => {
    const { nodeIds } = req.body;
    
    // Simulate testing delay and updating statuses
    const updated = nodesStore.map(node => {
      if (!nodeIds || nodeIds.includes(node.id)) {
        const latency = Math.floor(Math.random() * 140) + 18;
        const speed = Number((Math.random() * 70 + 5).toFixed(1));
        const status = latency < 120 ? 'optimal' : latency < 220 ? 'slow' : 'failed';
        const googleStatus = Math.random() > 0.05 ? '🟢 Available' : '🔴 Blocked';
        const geminiStatus = Math.random() > 0.08 ? '🟢 Available' : '🟡 Slow';
        const xaiStatus = Math.random() > 0.1 ? '🟢 Available' : '🔴 Blocked';
        
        return {
          ...node,
          latency,
          speed,
          status,
          googleStatus,
          geminiStatus,
          xaiStatus,
          lastTested: new Date().toISOString()
        };
      }
      return node;
    });

    nodesStore = updated;
    res.json({ success: true, nodes: nodesStore });
  });

  // Import raw URIs
  app.post('/api/import-uris', (req, res) => {
    const { uris, category = 'General' } = req.body;
    if (!uris || typeof uris !== 'string') {
      return res.status(400).json({ error: 'Missing uris string' });
    }

    const lines = uris.split('\n').map(l => l.trim()).filter(Boolean);
    const newNodes = lines.map((uri, idx) => {
      let protocol = 'unknown';
      if (uri.startsWith('vmess://')) protocol = 'vmess';
      else if (uri.startsWith('vless://')) protocol = 'vless';
      else if (uri.startsWith('trojan://')) protocol = 'trojan';
      else if (uri.startsWith('ss://')) protocol = 'shadowsocks';
      else if (uri.startsWith('hysteria')) protocol = 'hysteria2';
      else if (uri.startsWith('http')) protocol = 'http';

      const shortName = `Node-${Math.random().toString(36).substring(2, 7).toUpperCase()} [${protocol.toUpperCase()}]`;
      
      return {
        id: `node-${Date.now()}-${idx}`,
        name: shortName,
        uri,
        protocol,
        category,
        exitIp: 'Pending Test',
        country: '🏳️ Unknown',
        latency: 0,
        speed: 0,
        googleStatus: '⏳ Untested',
        geminiStatus: '⏳ Untested',
        xaiStatus: '⏳ Untested',
        status: 'untested',
        lastTested: new Date().toISOString()
      };
    });

    nodesStore = [...nodesStore, ...newNodes];
    res.json({ success: true, added: newNodes.length, nodes: nodesStore });
  });

  // Export config
  app.get('/api/export/:format', (req, res) => {
    const { format } = req.params;
    const activeNodes = nodesStore.filter(n => n.status === 'optimal' || n.status === 'slow');

    if (format === 'uri') {
      const text = activeNodes.map(n => n.uri).join('\n');
      return res.type('text/plain').send(text);
    } else if (format === 'json') {
      return res.json(activeNodes);
    } else if (format === 'clash') {
      const clashYaml = `proxies:\n` + activeNodes.map(n => `  - name: "${n.name}"\n    type: ${n.protocol}\n    server: node.example.com\n    port: 443`).join('\n');
      return res.type('text/yaml').send(clashYaml);
    }

    res.status(400).json({ error: 'Unsupported format' });
  });

  // Setup Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`macOS Pick-Node Web Server running on http://localhost:${PORT}`);
  });
}

startServer();
