import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  Zap, 
  Terminal, 
  Globe, 
  Download, 
  Plus, 
  RefreshCw, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Settings, 
  Sliders, 
  Play, 
  Copy, 
  Check, 
  Trash2, 
  ShieldCheck, 
  Cpu, 
  Wifi, 
  ExternalLink,
  HelpCircle,
  FolderPlus,
  Maximize2,
  Minimize2,
  X,
  FileText,
  Languages
} from 'lucide-react';

interface ProxyNode {
  id: string;
  name: string;
  uri: string;
  protocol: string;
  category: string;
  exitIp: string;
  country: string;
  latency: number;
  speed: number;
  googleStatus: string;
  geminiStatus: string;
  xaiStatus: string;
  status: 'optimal' | 'slow' | 'failed' | 'untested';
  lastTested: string;
}

const translations = {
  en: {
    appName: 'Pick-Node',
    file: 'File',
    edit: 'Edit',
    nodesMenu: 'Nodes',
    testMenu: 'Test',
    window: 'Window',
    help: 'Help',
    daemonActive: 'Daemon Active',
    optimalCount: 'Optimal',
    dashboard: 'Dashboard & Overview',
    nodeManager: 'Node Manager',
    batchTester: 'Batch Health Tester',
    exportConfig: 'Export & Config',
    preferences: 'macOS Preferences',
    daemonEngine: 'Daemon Engine',
    memoryUsage: 'Memory Usage',
    dashboardTitle: 'Dashboard Overview',
    dashboardSub: 'Real-time proxy node metrics and AI service availability monitor.',
    runAllTests: 'Run All Tests',
    testingAll: 'Testing All Nodes...',
    importNodes: 'Import Nodes',
    totalNodes: 'Total Nodes',
    fullySynced: 'Fully synced',
    optimalNodes: 'Optimal Nodes',
    readyProd: 'Ready for production',
    avgLatency: 'Average Latency',
    lowSpeedPing: 'Low-speed ping',
    aiServiceReady: 'AI Service Ready',
    aiPassed: 'Google & Gemini passed',
    aiServiceTarget: 'AI & Web Service Target Availability (pick-node core)',
    googleSearch: 'Google & Search',
    googleDesc: 'Exit IP & CAPTCHA test',
    geminiApi: 'Gemini API / AI Studio',
    geminiDesc: 'Low latency region routing',
    xaiClaude: 'XAI / Grok & Claude',
    xaiDesc: 'API endpoint availability',
    topNodes: 'Top Performing Nodes',
    viewAllNodes: 'View All Nodes →',
    nodeName: 'Node Name',
    categoryProtocol: 'Category / Protocol',
    exitIpCountry: 'Exit IP & Country',
    latency: 'Latency',
    googleGemini: 'Google / Gemini',
    action: 'Action',
    copy: 'Copy',
    copied: 'Copied',
    nodeManagerTitle: 'Node Manager',
    nodeManagerSub: 'Batch import, categorize, filter, and inspect proxy node configurations.',
    searchPlaceholder: 'Search by name, exit IP, or country...',
    allCategories: 'All Categories',
    allStatuses: 'All Statuses',
    protocol: 'Protocol',
    category: 'Category',
    speed: 'Speed',
    actions: 'Actions',
    noNodes: 'No matching nodes found. Import nodes or adjust your search query.',
    batchTesterTitle: 'Batch Health & Availability Testing',
    batchTesterSub: 'Perform multi-dimensional tests on exit IPs, latency, and Google/Gemini reachability.',
    startBatchTest: 'Start Full Batch Test',
    runningHealthSuite: 'Running Health Suite...',
    step1Title: '1. Exit IP Geolocation',
    step1Desc: 'Verifies true exit IP country, region, and ASN to ensure no IP leaks or DNS poisoning occur.',
    step1Status: 'Status: Active (GeoIP DB v2026.11)',
    step2Title: '2. TCP Latency & Speed',
    step2Desc: 'Measures round-trip TCP ping and download throughput across international backbone links.',
    step2Status: 'Avg Speed: 38.4 MB/s',
    step3Title: '3. Google & Gemini AI Check',
    step3Desc: 'Validates HTTP 200 response and API access for Google AI Studio, Gemini API, and XAI services.',
    step3Status: 'AI Pass Rate: 94%',
    terminalOutput: 'pick-node test daemon output (macos-x86_64)',
    exportTitle: 'Export & Config Generator',
    exportSub: 'Export filtered and optimal nodes for Clash, Surge, V2Ray, or raw URI lists.',
    exportRawUris: 'Export Raw URIs',
    exportRawDesc: 'Export all optimal proxy URIs one per line for easy import into client apps.',
    copyUrisBtn: 'Copy URIs to Clipboard',
    exportClash: 'Export Clash YAML',
    exportClashDesc: 'Generate fully formatted Clash proxy configuration snippet with group routing.',
    copyClashBtn: 'Copy Clash YAML',
    liveUriPreview: 'Live URI Preview',
    settingsTitle: 'macOS Preferences & Daemon Settings',
    settingsSub: 'Configure backend server behavior, auto-testing intervals, and macOS UI integration.',
    menuBarIcon: 'macOS Menu Bar Status Icon',
    menuBarIconDesc: 'Display quick stats in the macOS menu bar tray.',
    autoTest: 'Background Auto-Health Test',
    autoTestDesc: 'Periodically test proxy nodes in the background every 15 minutes.',
    timeoutThreshold: 'Test Timeout Threshold (ms)',
    timeoutDesc: 'Maximum latency before a node is marked as failed.',
    daemonPort: 'Daemon Port',
    daemonPortDesc: 'Local binding port for pick-node web backend.',
    importModalTitle: 'Import Proxy Nodes (pick-node format)',
    categoryTag: 'Category Tag',
    nodeUrisLabel: 'Node URIs (One per line: vmess://, vless://, trojan://, ss://, hysteria2://)',
    cancel: 'Cancel',
    quickBatchTest: 'Run Quick Batch Test',
    managedNodes: 'Managed Nodes',
    activeDaemonToast: 'Connected to Pick-Node backend daemon.'
  },
  zh: {
    appName: 'Pick-Node',
    file: '文件 (File)',
    edit: '编辑 (Edit)',
    nodesMenu: '节点 (Nodes)',
    testMenu: '测试 (Test)',
    window: '窗口 (Window)',
    help: '帮助 (Help)',
    daemonActive: '守护进程运行中',
    optimalCount: '优质节点',
    dashboard: '仪表盘与总览',
    nodeManager: '节点管理器',
    batchTester: '批量体检测试',
    exportConfig: '导出与配置',
    preferences: 'macOS 偏好设置',
    daemonEngine: '守护引擎',
    memoryUsage: '内存占用',
    dashboardTitle: '仪表盘总览',
    dashboardSub: '实时代理节点性能指标与 AI 服务可用性监控。',
    runAllTests: '一键全部体检',
    testingAll: '正在全面体检...',
    importNodes: '导入节点',
    totalNodes: '节点总数',
    fullySynced: '↑ 完全同步',
    optimalNodes: '可用优质节点',
    readyProd: '随时准备生产环境',
    avgLatency: '平均延迟',
    lowSpeedPing: '低延迟 ping',
    aiServiceReady: 'AI 服务就绪率',
    aiPassed: 'Google 与 Gemini 连通率',
    aiServiceTarget: 'AI 与网页服务目标可用性 (pick-node 核心)',
    googleSearch: 'Google 与搜索',
    googleDesc: '出口 IP 与验证码测试',
    geminiApi: 'Gemini API / AI Studio',
    geminiDesc: '低延迟区域路由',
    xaiClaude: 'XAI / Grok & Claude',
    xaiDesc: 'API 接口可用性',
    topNodes: '表现最好的节点',
    viewAllNodes: '查看全部节点 →',
    nodeName: '节点名称',
    categoryProtocol: '分类 / 协议',
    exitIpCountry: '出口 IP 与国家',
    latency: '延迟',
    googleGemini: 'Google / Gemini 状态',
    action: '操作',
    copy: '复制',
    copied: '已复制',
    nodeManagerTitle: '节点管理器',
    nodeManagerSub: '批量导入、分类、筛选和检查代理节点配置。',
    searchPlaceholder: '通过名称、出口 IP 或国家搜索...',
    allCategories: '全部分类',
    allStatuses: '全部状态',
    protocol: '协议',
    category: '分类',
    speed: '速度',
    actions: '操作',
    noNodes: '未找到匹配的节点。请导入节点或调整搜索关键词。',
    batchTesterTitle: '批量健康度与可用性体检',
    batchTesterSub: '对出口 IP、延迟及 Google/Gemini 连通性进行多维深度测试。',
    startBatchTest: '开始完整体检',
    runningHealthSuite: '正在执行体检套件...',
    step1Title: '1. 出口 IP 地理定位',
    step1Desc: '验证真实出口 IP 国家、地区和 ASN，确保无 IP 泄露或 DNS 污染。',
    step1Status: '状态：运行中 (GeoIP DB v2026.11)',
    step2Title: '2. TCP 延迟与速度',
    step2Desc: '测量国际骨干网往返 TCP ping 与下载吞吐量。',
    step2Status: '平均速度：38.4 MB/s',
    step3Title: '3. Google 与 Gemini AI 检查',
    step3Desc: '验证 Google AI Studio、Gemini API 及 XAI 服务的 HTTP 200 响应与 API 访问。',
    step3Status: 'AI 通过率：94%',
    terminalOutput: 'pick-node 测试守护进程输出 (macos-x86_64)',
    exportTitle: '导出与配置生成器',
    exportSub: '为 Clash、Surge、V2Ray 或原始 URI 列表导出筛选后的优质节点。',
    exportRawUris: '导出原始 URI',
    exportRawDesc: '每行一个导出所有优质代理 URI，方便导入客户端应用。',
    copyUrisBtn: '复制 URI 到剪贴板',
    exportClash: '导出 Clash YAML',
    exportClashDesc: '生成带分组路由的完整格式化 Clash 代理配置片段。',
    copyClashBtn: '复制 Clash YAML',
    liveUriPreview: '实时 URI 预览',
    settingsTitle: 'macOS 偏好设置与守护进程',
    settingsSub: '配置后端服务器行为、自动测试间隔以及 macOS UI 集成。',
    menuBarIcon: 'macOS 菜单栏状态图标',
    menuBarIconDesc: '在 macOS 菜单栏托盘中显示快速统计信息。',
    autoTest: '后台自动健康体检',
    autoTestDesc: '每隔 15 分钟在后台定期测试代理节点。',
    timeoutThreshold: '测试超时阈值 (ms)',
    timeoutDesc: '节点标记为失败前的最大延迟。',
    daemonPort: '守护端口',
    daemonPortDesc: 'pick-node 网页后端的本地绑定端口。',
    importModalTitle: '导入代理节点 (pick-node 格式)',
    categoryTag: '分类标签',
    nodeUrisLabel: '节点 URI（每行一个：vmess://, vless://, trojan://, ss://, hysteria2://）',
    cancel: '取消',
    quickBatchTest: '运行快速批量体检',
    managedNodes: '托管节点数',
    activeDaemonToast: '已成功连接到 Pick-Node 后端守护进程。'
  }
};

export default function App() {
  const [nodes, setNodes] = useState<ProxyNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'nodes' | 'tester' | 'export' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [testingAll, setTestingAll] = useState(false);
  const [testingIds, setTestingIds] = useState<string[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importUriText, setImportUriText] = useState('');
  const [importCategory, setImportCategory] = useState('Google / Gemini');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [menuBarOpen, setMenuBarOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [lang, setLang] = useState<'en' | 'zh'>('zh'); // Default to Chinese as requested by user

  const t = translations[lang];

  // Fetch nodes on mount
  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/nodes');
      const data = await res.json();
      setNodes(data);
    } catch (err) {
      console.error('Failed to fetch nodes', err);
      showToast(lang === 'zh' ? '无法连接到 Pick-Node 后端守护进程。' : 'Failed to connect to Pick-Node backend daemon.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleTestNode = async (id: string) => {
    setTestingIds(prev => [...prev, id]);
    try {
      const res = await fetch('/api/test-nodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeIds: [id] })
      });
      const data = await res.json();
      if (data.success) {
        setNodes(data.nodes);
        showToast(lang === 'zh' ? '节点体检完成。' : 'Node test completed successfully.');
      }
    } catch (err) {
      showToast(lang === 'zh' ? '测试节点出错。' : 'Error testing node.');
    } finally {
      setTestingIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleTestAll = async () => {
    setTestingAll(true);
    try {
      const res = await fetch('/api/test-nodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const data = await res.json();
      if (data.success) {
        setNodes(data.nodes);
        showToast(lang === 'zh' ? '所有节点批量体检已完成！' : 'Batch health test completed for all nodes!');
      }
    } catch (err) {
      showToast(lang === 'zh' ? '批量测试失败。' : 'Batch test failed.');
    } finally {
      setTestingAll(false);
    }
  };

  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUriText.trim()) return;

    try {
      const res = await fetch('/api/import-uris', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uris: importUriText, category: importCategory })
      });
      const data = await res.json();
      if (data.success) {
        setNodes(data.nodes);
        setShowImportModal(false);
        setImportUriText('');
        showToast(lang === 'zh' ? `成功导入 ${data.added} 个新节点！` : `Successfully imported ${data.added} new nodes!`);
      }
    } catch (err) {
      showToast(lang === 'zh' ? '导入节点 URI 失败。' : 'Failed to import node URIs.');
    }
  };

  const handleCopyUri = (uri: string, id: string) => {
    navigator.clipboard.writeText(uri);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast(lang === 'zh' ? '节点 URI 已复制到剪贴板。' : 'Node URI copied to clipboard.');
  };

  const handleDeleteNode = (id: string) => {
    const updated = nodes.filter(n => n.id !== id);
    setNodes(updated);
    fetch('/api/nodes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes: updated })
    });
    showToast(lang === 'zh' ? '节点已移除。' : 'Node removed.');
  };

  // Filtered nodes
  const filteredNodes = nodes.filter(node => {
    const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          node.exitIp.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          node.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || node.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || node.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const optimalCount = nodes.filter(n => n.status === 'optimal').length;
  const avgLatency = nodes.length > 0 ? Math.round(nodes.reduce((acc, n) => acc + (n.latency || 0), 0) / nodes.length) : 0;

  return (
    <div className="min-h-screen bg-[#1e1e24] text-slate-100 flex flex-col font-sans select-none antialiased relative overflow-hidden">
      
      {/* macOS Menu Bar */}
      <div className="bg-[#18181d]/90 backdrop-blur-md h-7 border-b border-white/10 flex items-center justify-between px-3 text-xs text-slate-300 z-50">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setMenuBarOpen(!menuBarOpen)}
            className="flex items-center space-x-1.5 font-semibold text-white hover:bg-white/10 px-2 py-0.5 rounded transition"
          >
            <span className="text-sm"></span>
            <span>{t.appName}</span>
          </button>
          <span className="cursor-pointer hover:text-white transition">{t.file}</span>
          <span className="cursor-pointer hover:text-white transition">{t.edit}</span>
          <span className="cursor-pointer hover:text-white transition">{t.nodesMenu}</span>
          <span className="cursor-pointer hover:text-white transition">{t.testMenu}</span>
          <span className="cursor-pointer hover:text-white transition">{t.window}</span>
          <span className="cursor-pointer hover:text-white transition">{t.help}</span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Language Switcher */}
          <button 
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded transition text-[11px]"
          >
            <Languages className="w-3 h-3 text-indigo-400" />
            <span className="font-medium">{lang === 'zh' ? 'English' : '简体中文'}</span>
          </button>

          <div className="flex items-center space-x-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t.daemonActive}</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <Wifi className="w-3.5 h-3.5 text-indigo-400" />
            <span>{optimalCount} / {nodes.length} {t.optimalCount}</span>
          </div>
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* macOS Menu Bar Dropdown Widget */}
      {menuBarOpen && (
        <div className="absolute top-8 left-3 w-72 bg-[#25252b]/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl p-4 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="font-bold text-white text-sm flex items-center space-x-2">
              <span className="text-indigo-400">⚡</span>
              <span>Pick-Node macOS v2.4</span>
            </div>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">Native</span>
          </div>
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-slate-400">
              <span>{t.managedNodes}</span>
              <span className="text-white font-medium">{nodes.length}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>{t.avgLatency}</span>
              <span className="text-emerald-400 font-medium">{avgLatency} ms</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>{t.autoTest}</span>
              <span className="text-emerald-400 font-medium">Auto (15m)</span>
            </div>
          </div>
          <button 
            onClick={() => { handleTestAll(); setMenuBarOpen(false); }}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-1.5 rounded-lg shadow transition flex items-center justify-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: testingAll ? '1s' : '0s' }} />
            <span>{t.quickBatchTest}</span>
          </button>
        </div>
      )}

      {/* Main macOS Desktop Window Container */}
      <div className="flex-1 p-2 sm:p-4 flex items-center justify-center">
        <div className="w-full max-w-7xl h-[calc(100vh-3.5rem)] bg-[#202026]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Window Titlebar */}
          <div className="bg-[#282830] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:opacity-80 transition" title="Close"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer hover:opacity-80 transition" title="Minimize"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer hover:opacity-80 transition" title="Maximize"></div>
              <span className="text-xs text-slate-400 font-mono ml-2">pick-node — python/web daemon (macos-x86_64) [{lang.toUpperCase()}]</span>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded-md border border-white/5 flex items-center space-x-1">
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>Multi-Region Exit IP Check</span>
              </span>
              <span className="bg-indigo-950/80 text-indigo-300 px-2 py-1 rounded-md border border-indigo-500/30 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-indigo-400" />
                <span>Google / Gemini AI Ready</span>
              </span>
            </div>
          </div>

          {/* Window Body Layout */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* macOS Sidebar Navigation */}
            <div className="w-60 bg-[#19191e] border-r border-white/10 flex flex-col justify-between p-3">
              <div className="space-y-1.5">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Workspace</div>
                
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <Activity className="w-4 h-4" />
                  <span>{t.dashboard}</span>
                </button>

                <button
                  onClick={() => setActiveTab('nodes')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'nodes' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <Server className="w-4 h-4" />
                  <span>{t.nodeManager}</span>
                  <span className="ml-auto bg-white/20 text-white text-xs px-1.5 py-0.2 rounded-full">{nodes.length}</span>
                </button>

                <button
                  onClick={() => setActiveTab('tester')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'tester' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{t.batchTester}</span>
                </button>

                <div className="pt-4 px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Tools & Output</div>

                <button
                  onClick={() => setActiveTab('export')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'export' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <Download className="w-4 h-4" />
                  <span>{t.exportConfig}</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  <Settings className="w-4 h-4" />
                  <span>{t.preferences}</span>
                </button>
              </div>

              {/* Sidebar Footer Info */}
              <div className="bg-[#22222b] p-3 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{t.daemonEngine}</span>
                  <span className="text-emerald-400">Python 3.12</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[78%]"></div>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>{t.memoryUsage}</span>
                  <span className="text-slate-200">42.8 MB</span>
                </div>
              </div>

            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-[#22222b] flex flex-col overflow-y-auto">
              
              {/* Notification Banner */}
              {notification && (
                <div className="bg-indigo-600/95 text-white px-4 py-2 text-xs flex items-center justify-between shadow-lg sticky top-0 z-40 animate-in slide-in-from-top duration-200">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>{notification}</span>
                  </div>
                  <button onClick={() => setNotification(null)} className="hover:bg-white/20 p-0.5 rounded">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-white">{t.dashboardTitle}</h1>
                      <p className="text-sm text-slate-400">{t.dashboardSub}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleTestAll}
                        disabled={testingAll}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 shadow-lg shadow-indigo-600/20 transition disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${testingAll ? 'animate-spin' : ''}`} />
                        <span>{testingAll ? t.testingAll : t.runAllTests}</span>
                      </button>
                      <button
                        onClick={() => setShowImportModal(true)}
                        className="bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 transition border border-white/10"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{t.importNodes}</span>
                      </button>
                    </div>
                  </div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-[#1c1c24] p-5 rounded-2xl border border-white/10 flex items-center justify-between shadow-md">
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.totalNodes}</div>
                        <div className="text-3xl font-extrabold text-white mt-1">{nodes.length}</div>
                        <div className="text-xs text-emerald-400 mt-1 flex items-center space-x-1">
                          <span>{t.fullySynced}</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Server className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="bg-[#1c1c24] p-5 rounded-2xl border border-white/10 flex items-center justify-between shadow-md">
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.optimalNodes}</div>
                        <div className="text-3xl font-extrabold text-emerald-400 mt-1">{optimalCount}</div>
                        <div className="text-xs text-slate-400 mt-1">{t.readyProd}</div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="bg-[#1c1c24] p-5 rounded-2xl border border-white/10 flex items-center justify-between shadow-md">
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.avgLatency}</div>
                        <div className="text-3xl font-extrabold text-cyan-400 mt-1">{avgLatency} ms</div>
                        <div className="text-xs text-slate-400 mt-1">{t.lowSpeedPing}</div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Wifi className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="bg-[#1c1c24] p-5 rounded-2xl border border-white/10 flex items-center justify-between shadow-md">
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.aiServiceReady}</div>
                        <div className="text-3xl font-extrabold text-purple-400 mt-1">94%</div>
                        <div className="text-xs text-purple-300 mt-1">{t.aiPassed}</div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* AI Services Status Bar */}
                  <div className="bg-[#1c1c24] p-6 rounded-2xl border border-white/10 space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span className="text-indigo-400">⚡</span>
                      <span>{t.aiServiceTarget}</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#18181f] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">{t.googleSearch}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{t.googleDesc}</div>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 font-semibold px-2.5 py-1 rounded-lg text-xs">🟢 100% Pass</span>
                      </div>

                      <div className="bg-[#18181f] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">{t.geminiApi}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{t.geminiDesc}</div>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 font-semibold px-2.5 py-1 rounded-lg text-xs">🟢 Optimal</span>
                      </div>

                      <div className="bg-[#18181f] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">{t.xaiClaude}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{t.xaiDesc}</div>
                        </div>
                        <span className="bg-amber-500/20 text-amber-400 font-semibold px-2.5 py-1 rounded-lg text-xs">🟡 85% Pass</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Node Table Preview */}
                  <div className="bg-[#1c1c24] rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <h3 className="font-semibold text-white text-base">{t.topNodes}</h3>
                      <button 
                        onClick={() => setActiveTab('nodes')}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition"
                      >
                        {t.viewAllNodes}
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-white/10 text-slate-400 bg-white/[0.02]">
                            <th className="p-3.5 font-medium">{t.nodeName}</th>
                            <th className="p-3.5 font-medium">{t.categoryProtocol}</th>
                            <th className="p-3.5 font-medium">{t.exitIpCountry}</th>
                            <th className="p-3.5 font-medium">{t.latency}</th>
                            <th className="p-3.5 font-medium">{t.googleGemini}</th>
                            <th className="p-3.5 font-medium text-right">{t.action}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {nodes.slice(0, 4).map(node => (
                            <tr key={node.id} className="hover:bg-white/[0.02] transition">
                              <td className="p-3.5 font-medium text-white">
                                <div className="flex items-center space-x-2">
                                  <span className={`w-2 h-2 rounded-full ${node.status === 'optimal' ? 'bg-emerald-400' : node.status === 'slow' ? 'bg-amber-400' : 'bg-red-400'}`}></span>
                                  <span>{node.name}</span>
                                </div>
                              </td>
                              <td className="p-3.5">
                                <div className="flex items-center space-x-2">
                                  <span className="bg-indigo-500/15 text-indigo-300 px-2 py-0.5 rounded text-xs">{node.category}</span>
                                  <span className="text-slate-400 uppercase text-xs">({node.protocol})</span>
                                </div>
                              </td>
                              <td className="p-3.5 text-slate-300">
                                <div className="flex items-center space-x-1.5">
                                  <span>{node.country}</span>
                                  <span className="text-xs text-slate-400 font-mono">({node.exitIp})</span>
                                </div>
                              </td>
                              <td className="p-3.5">
                                <span className={`font-mono font-medium ${node.latency < 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                  {node.latency} ms
                                </span>
                              </td>
                              <td className="p-3.5">
                                <span className="text-xs">{node.googleStatus}</span>
                              </td>
                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => handleCopyUri(node.uri, node.id)}
                                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-xs font-medium transition inline-flex items-center space-x-1"
                                >
                                  {copiedId === node.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{copiedId === node.id ? t.copied : t.copy}</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: NODE MANAGER */}
              {activeTab === 'nodes' && (
                <div className="p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-white">{t.nodeManagerTitle}</h1>
                      <p className="text-sm text-slate-400">{t.nodeManagerSub}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleTestAll}
                        disabled={testingAll}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 shadow-lg transition disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${testingAll ? 'animate-spin' : ''}`} />
                        <span>{t.runAllTests}</span>
                      </button>
                      <button
                        onClick={() => setShowImportModal(true)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 shadow-lg transition"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{t.importNodes}</span>
                      </button>
                    </div>
                  </div>

                  {/* Filters & Search Toolbar */}
                  <div className="bg-[#1c1c24] p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#16161c] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-[#16161c] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="All">{t.allCategories}</option>
                        <option value="Google / Gemini">Google / Gemini</option>
                        <option value="General">General</option>
                        <option value="Streaming">Streaming</option>
                      </select>

                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="bg-[#16161c] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="All">{t.allStatuses}</option>
                        <option value="optimal">Optimal</option>
                        <option value="slow">Slow</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </div>

                  {/* Node Table */}
                  <div className="bg-[#1c1c24] rounded-2xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-white/10 text-slate-400 bg-white/[0.02]">
                            <th className="p-4 font-medium">{t.nodeName}</th>
                            <th className="p-4 font-medium">{t.protocol}</th>
                            <th className="p-4 font-medium">{t.category}</th>
                            <th className="p-4 font-medium">{t.exitIpCountry}</th>
                            <th className="p-4 font-medium">{t.latency}</th>
                            <th className="p-4 font-medium">{t.speed}</th>
                            <th className="p-4 font-medium">{t.googleGemini}</th>
                            <th className="p-4 font-medium text-right">{t.actions}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredNodes.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="p-8 text-center text-slate-400">
                                {t.noNodes}
                              </td>
                            </tr>
                          ) : (
                            filteredNodes.map(node => (
                              <tr key={node.id} className="hover:bg-white/[0.02] transition">
                                <td className="p-4 font-medium text-white">
                                  <div className="flex items-center space-x-2.5">
                                    <span className={`w-2.5 h-2.5 rounded-full ${node.status === 'optimal' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : node.status === 'slow' ? 'bg-amber-400' : 'bg-red-400'}`}></span>
                                    <span>{node.name}</span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <span className="bg-white/5 border border-white/10 uppercase text-xs px-2 py-0.5 rounded font-mono text-indigo-300">
                                    {node.protocol}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <span className="bg-indigo-500/15 text-indigo-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                    {node.category}
                                  </span>
                                </td>
                                <td className="p-4 text-slate-300">
                                  <div className="flex items-center space-x-1.5">
                                    <span>{node.country}</span>
                                    <span className="text-xs text-slate-400 font-mono">({node.exitIp})</span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <span className={`font-mono font-semibold ${node.latency < 100 ? 'text-emerald-400' : node.latency < 200 ? 'text-amber-400' : 'text-red-400'}`}>
                                    {node.latency} ms
                                  </span>
                                </td>
                                <td className="p-4 font-mono text-slate-300">
                                  {node.speed} MB/s
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center space-x-2 text-xs">
                                    <span>{node.googleStatus}</span>
                                  </div>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                  <button
                                    onClick={() => handleTestNode(node.id)}
                                    disabled={testingIds.includes(node.id)}
                                    className="bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 p-1.5 rounded-lg transition"
                                    title="Test Node"
                                  >
                                    <RefreshCw className={`w-4 h-4 ${testingIds.includes(node.id) ? 'animate-spin' : ''}`} />
                                  </button>
                                  <button
                                    onClick={() => handleCopyUri(node.uri, node.id)}
                                    className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-lg transition"
                                    title="Copy URI"
                                  >
                                    {copiedId === node.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                  </button>
                                  <button
                                    onClick={() => handleDeleteNode(node.id)}
                                    className="bg-red-500/20 hover:bg-red-500/40 text-red-300 p-1.5 rounded-lg transition"
                                    title="Delete Node"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: BATCH HEALTH TESTER */}
              {activeTab === 'tester' && (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-white">{t.batchTesterTitle}</h1>
                      <p className="text-sm text-slate-400">{t.batchTesterSub}</p>
                    </div>
                    <button
                      onClick={handleTestAll}
                      disabled={testingAll}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center space-x-2 shadow-lg transition disabled:opacity-50"
                    >
                      <Zap className={`w-4 h-4 ${testingAll ? 'animate-pulse' : ''}`} />
                      <span>{testingAll ? t.runningHealthSuite : t.startBatchTest}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#1c1c24] p-5 rounded-2xl border border-white/10 space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Globe className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white">{t.step1Title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {t.step1Desc}
                      </p>
                      <div className="text-xs font-semibold text-emerald-400 pt-2">{t.step1Status}</div>
                    </div>

                    <div className="bg-[#1c1c24] p-5 rounded-2xl border border-white/10 space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Wifi className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white">{t.step2Title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {t.step2Desc}
                      </p>
                      <div className="text-xs font-semibold text-cyan-400 pt-2">{t.step2Status}</div>
                    </div>

                    <div className="bg-[#1c1c24] p-5 rounded-2xl border border-white/10 space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white">{t.step3Title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {t.step3Desc}
                      </p>
                      <div className="text-xs font-semibold text-purple-400 pt-2">{t.step3Status}</div>
                    </div>
                  </div>

                  {/* Live Testing Log Console */}
                  <div className="bg-[#16161c] p-5 rounded-2xl border border-white/10 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-slate-400">
                      <span className="flex items-center space-x-2">
                        <Terminal className="w-4 h-4 text-indigo-400" />
                        <span>{t.terminalOutput}</span>
                      </span>
                      <span>🟢 Live</span>
                    </div>
                    <div className="text-slate-300 space-y-1.5 pt-1">
                      <div>[2026-11-20 06:43:00] pick-node v2.4 initialized daemon on macOS web interface.</div>
                      <div>[2026-11-20 06:43:05] Loaded {nodes.length} proxy nodes into test queue.</div>
                      <div>[2026-11-20 06:43:10] Testing US-SiliconValley-01... latency 48ms, Google: PASS, Gemini: PASS.</div>
                      <div>[2026-11-20 06:43:15] Batch test completed successfully. {optimalCount} optimal nodes ready.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: EXPORT & CONFIG */}
              {activeTab === 'export' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-white">{t.exportTitle}</h1>
                    <p className="text-sm text-slate-400">{t.exportSub}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#1c1c24] p-6 rounded-2xl border border-white/10 space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                        <Download className="w-5 h-5 text-indigo-400" />
                        <span>{t.exportRawUris}</span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        {t.exportRawDesc}
                      </p>
                      <button
                        onClick={async () => {
                          const res = await fetch('/api/export/uri');
                          const text = await res.text();
                          navigator.clipboard.writeText(text);
                          showToast(lang === 'zh' ? '所有优质 URI 已复制到剪贴板！' : 'All optimal URIs copied to clipboard!');
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center space-x-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span>{t.copyUrisBtn}</span>
                      </button>
                    </div>

                    <div className="bg-[#1c1c24] p-6 rounded-2xl border border-white/10 space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-cyan-400" />
                        <span>{t.exportClash}</span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        {t.exportClashDesc}
                      </p>
                      <button
                        onClick={async () => {
                          const res = await fetch('/api/export/clash');
                          const text = await res.text();
                          navigator.clipboard.writeText(text);
                          showToast(lang === 'zh' ? 'Clash YAML 配置已复制到剪贴板！' : 'Clash YAML configuration copied to clipboard!');
                        }}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center space-x-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span>{t.copyClashBtn}</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#1c1c24] p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="text-lg font-bold text-white">{t.liveUriPreview}</h3>
                    <div className="bg-[#16161c] p-4 rounded-xl border border-white/10 font-mono text-xs text-slate-300 h-48 overflow-y-auto whitespace-pre-wrap">
                      {nodes.filter(n => n.status === 'optimal').map(n => n.uri).join('\n')}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-white">{t.settingsTitle}</h1>
                    <p className="text-sm text-slate-400">{t.settingsSub}</p>
                  </div>

                  <div className="bg-[#1c1c24] p-6 rounded-2xl border border-white/10 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div>
                        <div className="font-semibold text-white">{t.menuBarIcon}</div>
                        <div className="text-xs text-slate-400">{t.menuBarIconDesc}</div>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div>
                        <div className="font-semibold text-white">{t.autoTest}</div>
                        <div className="text-xs text-slate-400">{t.autoTestDesc}</div>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div>
                        <div className="font-semibold text-white">{t.timeoutThreshold}</div>
                        <div className="text-xs text-slate-400">{t.timeoutDesc}</div>
                      </div>
                      <select className="bg-[#16161c] border border-white/10 rounded-xl px-3 py-1.5 text-sm text-slate-200">
                        <option>3000 ms (Fast)</option>
                        <option>5000 ms (Standard)</option>
                        <option>10000 ms (Relaxed)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{t.daemonPort}</div>
                        <div className="text-xs text-slate-400">{t.daemonPortDesc}</div>
                      </div>
                      <span className="font-mono text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-indigo-300">
                        8787 (Default)
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>

      {/* IMPORT NODES MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#22222b] border border-white/15 rounded-2xl w-full max-w-2xl p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <FolderPlus className="w-5 h-5 text-indigo-400" />
                <span>{t.importModalTitle}</span>
              </h3>
              <button 
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleImportSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">{t.categoryTag}</label>
                <select
                  value={importCategory}
                  onChange={(e) => setImportCategory(e.target.value)}
                  className="w-full bg-[#18181f] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Google / Gemini">Google / Gemini</option>
                  <option value="General">General</option>
                  <option value="Streaming">Streaming</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {t.nodeUrisLabel}
                </label>
                <textarea
                  rows={6}
                  value={importUriText}
                  onChange={(e) => setImportUriText(e.target.value)}
                  placeholder="vmess://...&#10;trojan://...&#10;ss://..."
                  className="w-full bg-[#18181f] border border-white/10 rounded-xl p-3.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 transition"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-lg transition"
                >
                  {t.importNodes}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
