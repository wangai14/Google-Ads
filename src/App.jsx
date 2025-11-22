import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Target, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  RefreshCcw,
  MousePointer2,
  Calendar,
  Activity,
  Zap,
  Gauge,
  Layers,
  Users,
  Infinity as InfinityIcon,
  Split, 
  Smartphone,
  Monitor,
  Tablet,
  Percent,
  Trash2,
  Clock,
  Filter,
  Shuffle,
  Flame,
  Globe,
  Sun,
  Moon,
  Briefcase,
  Swords,
  Funnel,
  ShoppingBag,
  Scale,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  Calculator
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Area, BarChart, Bar, Cell, PieChart, Pie, ReferenceLine
} from 'recharts';

// --- 通用组件 ---
const Card = ({ children, className = "", title, icon: Icon }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
        {Icon && <Icon className="w-5 h-5 text-blue-600" />}
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

const InputGroup = ({ label, value, onChange, prefix, suffix, type = "number", step = "0.01", help, min, max }) => (
  <div className="mb-4 last:mb-0">
    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 flex items-center gap-1">
      {label}
      {help && (
        <div className="group relative">
          <HelpCircle className="w-3 h-3 text-slate-300 cursor-help" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
            {help}
          </div>
        </div>
      )}
    </label>
    <div className="relative">
      {prefix && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">{prefix}</div>}
      <input
        type={type}
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-slate-50 border border-slate-300 rounded-lg py-2 ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-7' : 'pr-3'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-slate-900 font-medium`}
      />
      {suffix && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">{suffix}</div>}
    </div>
  </div>
);

const ResultBox = ({ label, value, subtext, type = "neutral", icon: Icon }) => {
  const styles = {
    good: "bg-emerald-50 border-emerald-200 text-emerald-900",
    bad: "bg-rose-50 border-rose-200 text-rose-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    purple: "bg-purple-50 border-purple-200 text-purple-900",
    orange: "bg-orange-50 border-orange-200 text-orange-900",
    neutral: "bg-slate-50 border-slate-200 text-slate-900"
  };
  const textStyles = {
    good: "text-emerald-600",
    bad: "text-rose-600",
    warning: "text-amber-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    neutral: "text-slate-600"
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} relative overflow-hidden h-full`}>
      <div className="relative z-10">
        <div className="text-xs font-bold opacity-70 uppercase mb-1">{label}</div>
        <div className={`text-2xl font-bold ${textStyles[type]} mb-1`}>{value}</div>
        {subtext && <div className="text-xs opacity-80 leading-tight">{subtext}</div>}
      </div>
      {Icon && <Icon className={`absolute -bottom-2 -right-2 w-12 h-12 opacity-10 ${textStyles[type]}`} />}
    </div>
  );
};

const safeFixed = (val, fractionDigits = 2) => {
  if (!Number.isFinite(val)) return "N/A";
  return val.toFixed(fractionDigits);
};

const formatCurrency = (val) => {
  if (!Number.isFinite(val)) return "-";
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
};

const formatNumber = (val) => {
  if (!Number.isFinite(val)) return "-";
  return new Intl.NumberFormat('en-US').format(val);
};

// --- 核心功能组件 ---

// 1. 智能诊断中控 (Smart Diagnosis Hub)
const SmartHub = ({ navigateTo }) => {
  const [metrics, setMetrics] = useState({ roas: 2.0, targetRoas: 3.0, cpa: 45, targetCpa: 30, budget: 5000, spent: 4800 });
  
  const roasGap = ((metrics.roas - metrics.targetRoas) / metrics.targetRoas) * 100;
  const cpaGap = ((metrics.cpa - metrics.targetCpa) / metrics.targetCpa) * 100;
  const spendRate = (metrics.spent / metrics.budget) * 100;

  const DiagnosisCard = ({ title, status, desc, action, linkId, subTab }) => (
    <div className="p-4 border border-slate-200 rounded-lg bg-white hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateTo(linkId, subTab)}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-slate-800 flex items-center gap-2">
          {status === 'critical' ? <AlertTriangle className="w-4 h-4 text-rose-500"/> : <Lightbulb className="w-4 h-4 text-amber-500"/>}
          {title}
        </h4>
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </div>
      <p className="text-sm text-slate-600 mb-3">{desc}</p>
      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{action}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="快速诊断输入" icon={Activity}>
          <InputGroup label="当前 ROAS" value={metrics.roas} onChange={v => setMetrics({...metrics, roas: Number(v)})} />
          <InputGroup label="目标 ROAS" value={metrics.targetRoas} onChange={v => setMetrics({...metrics, targetRoas: Number(v)})} />
          <div className="my-4 border-t border-slate-100"></div>
          <InputGroup label="当前 CPA" value={metrics.cpa} onChange={v => setMetrics({...metrics, cpa: Number(v)})} prefix="$" />
          <InputGroup label="目标 CPA" value={metrics.targetCpa} onChange={v => setMetrics({...metrics, targetCpa: Number(v)})} prefix="$" />
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-800 text-white p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-2">🤖 AI 优化建议</h2>
            <p className="opacity-80">基于您输入的数据，系统为您生成了以下优化路径：</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 场景 1: ROAS 低 */}
            {roasGap < -10 && (
              <DiagnosisCard 
                title="ROAS 不达标" 
                status="critical" 
                desc={`当前 ROAS 比目标低 ${Math.abs(roasGap).toFixed(0)}%。可能存在无效流量浪费或 PMax 虚假繁荣。`}
                action="去清洗搜素词 & 分析 PMax"
                linkId="optimization"
                subTab="searchterm"
              />
            )}
            {/* 场景 2: CPA 高 */}
            {cpaGap > 20 && (
              <DiagnosisCard 
                title="CPA 成本过高" 
                status="critical" 
                desc={`CPA 超标 ${cpaGap.toFixed(0)}%。建议检查分时段出价和地区溢价，削减低效流量。`}
                action="进行时段/地区调整"
                linkId="optimization"
                subTab="daypart"
              />
            )}
            {/* 场景 3: 预算花太快 */}
            {spendRate > 95 && (
              <DiagnosisCard 
                title="预算即将耗尽" 
                status="critical" 
                desc="预算消耗过快，可能会错过晚间高峰。建议重新规划预算节奏或扩量。"
                action="预算模拟与监控"
                linkId="simulation"
                subTab="pacer"
              />
            )}
            {/* 场景 4: 表现好 (扩量) */}
            {roasGap >= 0 && cpaGap <= 0 && (
              <DiagnosisCard 
                title="表现优异，建议扩量" 
                status="opportunity" 
                desc="各项指标健康。建议测试更激进的出价策略或增加旺季预算。"
                action="旺季冲刺 & 扩量模拟"
                linkId="strategy"
                subTab="seasonality"
              />
            )}
             <DiagnosisCard 
                title="常规检查：竞价博弈" 
                status="opportunity" 
                desc="想知道超越竞对需要多少成本？模拟一下排位溢价。"
                action="竞价排名模拟"
                linkId="optimization"
                subTab="auction"
              />
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. 战略规划模块 (Strategy) - Seasonality, Media Mix, LTV
const StrategyModule = ({ defaultTab }) => {
  const [tab, setTab] = useState(defaultTab || 'mediamix');
  
  const MediaMix = () => {
    const [budget, setBudget] = useState(20000);
    const [googleShare, setGoogleShare] = useState(60);
    const googleSpend = budget * (googleShare/100);
    const fbSpend = budget - googleSpend;
    const calcRoas = (spend, base) => Math.max(0.5, base * (1 - Math.pow(spend/50000, 0.8)));
    const gRoas = calcRoas(googleSpend, 6.0);
    const fRoas = calcRoas(fbSpend, 5.0);
    const totalRev = (googleSpend*gRoas) + (fbSpend*fRoas);
    const blendedRoas = totalRev/budget;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="预算分配" icon={Scale}>
          <InputGroup label="总预算" value={budget} onChange={setBudget} prefix="$"/>
          <div className="my-4">
            <label className="text-xs font-bold text-slate-500">Google 占比: {googleShare}%</label>
            <input type="range" min="0" max="100" step="5" value={googleShare} onChange={e=>setGoogleShare(Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"/>
            <div className="flex justify-between text-xs text-slate-400 mt-1"><span>FB Only</span><span>Google Only</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div className="p-2 bg-blue-50 rounded border border-blue-100">
              <div className="font-bold text-blue-800">Google Ads</div>
              <div>${Math.round(googleSpend)}</div>
              <div className="text-xs text-blue-600">ROAS: {gRoas.toFixed(2)}</div>
            </div>
            <div className="p-2 bg-indigo-50 rounded border border-indigo-100">
              <div className="font-bold text-indigo-800">Facebook</div>
              <div>${Math.round(fbSpend)}</div>
              <div className="text-xs text-indigo-600">ROAS: {fRoas.toFixed(2)}</div>
            </div>
          </div>
        </Card>
        <div className="space-y-4">
          <ResultBox label="混合总收入" value={`$${Math.round(totalRev).toLocaleString()}`} subtext={`混合 ROAS: ${blendedRoas.toFixed(2)}`} type="good" icon={DollarSign} />
          <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
            <strong>💡 智能建议：</strong> {Math.abs(gRoas - fRoas) < 0.5 ? "当前配置接近最优，边际效益平衡。" : gRoas > fRoas ? "Google 效率更高，建议增加 Google 预算。" : "Facebook 效率更高，建议增加 FB 预算。"}
          </div>
        </div>
      </div>
    );
  };

  const LtvCalc = () => {
    const [cpa, setCpa] = useState(45);
    const [ltv, setLtv] = useState(180);
    const ratio = cpa > 0 ? ltv / cpa : 0;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="LTV 价值模型" icon={InfinityIcon}>
          <InputGroup label="获客成本 (CPA)" prefix="$" value={cpa} onChange={setCpa} />
          <InputGroup label="客户终身价值 (LTV)" prefix="$" value={ltv} onChange={setLtv} help="单个客户全生命周期贡献的毛利" />
        </Card>
        <div className="space-y-4">
          <ResultBox label="LTV:CAC 黄金比例" value={safeFixed(ratio)} subtext={ratio > 3 ? "健康 (可扩量)" : "亏损/微利 (需优化)"} type={ratio > 3 ? "good" : "warning"} icon={Users} />
          <div className="p-4 bg-blue-50 rounded-lg text-xs text-blue-800">若 LTV:CAC &gt; 3，即使首单 ROAS 看起来亏损，也可大胆提高出价抢占市场。</div>
        </div>
      </div>
    );
  };

  const Seasonality = () => {
    const [baseSpend, setBaseSpend] = useState(500);
    const [uplift, setUplift] = useState(50);
    const [cpcInc, setCpcInc] = useState(30);
    const recSpend = baseSpend * (1 + uplift/100) * (1 + cpcInc/100);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="旺季/大促冲刺" icon={Flame}>
          <InputGroup label="平日日均消耗" prefix="$" value={baseSpend} onChange={setBaseSpend} />
          <InputGroup label="预计转化率提升 %" value={uplift} onChange={setUplift} prefix="+" />
          <InputGroup label="预计 CPC 上涨 %" value={cpcInc} onChange={setCpcInc} prefix="+" />
        </Card>
        <ResultBox label="建议大促日预算" value={formatCurrency(recSpend)} subtext={`平日的 ${(recSpend/baseSpend).toFixed(1)} 倍`} type="orange" icon={Zap} />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 pb-2 overflow-x-auto">
        {[{id:'mediamix', label:'⚖️ 跨渠道配比'}, {id:'ltv', label:'💎 LTV 价值'}, {id:'seasonality', label:'🔥 旺季冲刺'}].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${tab===t.id ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>{t.label}</button>
        ))}
      </div>
      {tab === 'mediamix' && <MediaMix />}
      {tab === 'ltv' && <LtvCalc />}
      {tab === 'seasonality' && <Seasonality />}
    </div>
  );
};

// 3. 深度优化模块 (Optimization) - PMax, SearchTerms, Daypart, Geo, Auction
const OptimizationModule = ({ defaultTab }) => {
  const [tab, setTab] = useState(defaultTab || 'pmax');

  const PMaxTool = () => {
    const [spend, setSpend] = useState(5000);
    const [roas, setRoas] = useState(5.0);
    const [brandRoas, setBrandRoas] = useState(15.0);
    const [brandShare, setBrandShare] = useState(20);
    const totalRev = spend * roas;
    const brandSpend = spend * (brandShare/100);
    const brandRev = brandSpend * brandRoas;
    const nonBrandSpend = spend - brandSpend;
    const nonBrandRev = Math.max(0, totalRev - brandRev);
    const trueRoas = nonBrandSpend > 0 ? nonBrandRev / nonBrandSpend : 0;
    const data = [{ name: '面板', value: roas, fill: '#cbd5e1' }, { name: '真实', value: trueRoas, fill: trueRoas > 2 ? '#3b82f6' : '#f43f5e' }];

    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 space-y-6">
          <Card title="PMax 效能拆解" icon={ShoppingBag}>
            <InputGroup label="PMax 总花费" value={spend} onChange={setSpend} prefix="$"/>
            <InputGroup label="面板 ROAS" value={roas} onChange={setRoas} />
            <div className="pt-4 border-t mt-4 border-slate-100">
              <InputGroup label="品牌词 ROAS" value={brandRoas} onChange={setBrandRoas} />
              <InputGroup label="品牌流量占比 %" value={brandShare} onChange={setBrandShare} />
            </div>
          </Card>
        </div>
        <div className="md:col-span-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <ResultBox label="真实拉新 ROAS" value={trueRoas.toFixed(2)} type={trueRoas > 2.5 ? "good" : "bad"} icon={Target} />
            <ResultBox label="隐藏的品牌收入" value={`$${Math.round(brandRev).toLocaleString()}`} type="neutral" icon={Layers} />
          </div>
          <Card className="h-64"><ResponsiveContainer><BarChart data={data} layout="vertical" margin={{left: 20}}><XAxis type="number" hide /><YAxis dataKey="name" type="category" width={40} tick={{fontSize: 12}} /><Tooltip /><Bar dataKey="value" barSize={20} radius={[0,4,4,0]}>{data.map((e,i)=><Cell key={i} fill={e.fill}/>)}</Bar></BarChart></ResponsiveContainer></Card>
        </div>
      </div>
    );
  };

  const SearchTermTool = () => {
    const [spend, setSpend] = useState(5000);
    const [roas, setRoas] = useState(2.5);
    const [wasted, setWasted] = useState(15);
    const afterRoas = (spend*roas) / (spend*(1-wasted/100));
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="搜词清洗" icon={Filter}><InputGroup label="月花费" value={spend} onChange={setSpend}/><InputGroup label="当前 ROAS" value={roas} onChange={setRoas}/><InputGroup label="浪费比例 %" value={wasted} onChange={setWasted}/></Card>
        <ResultBox label="清洗后 ROAS" value={safeFixed(afterRoas)} type="good" subtext={`提升 +${((afterRoas-roas)/roas*100).toFixed(0)}%`} icon={Filter} />
      </div>
    );
  };

  const AuctionTool = () => {
    const [cpc, setCpc] = useState(2.5);
    const [share, setShare] = useState(20);
    const [target, setTarget] = useState(50);
    const reqCpc = cpc * (1 + (Math.max(0, target-share)/100)*1.5);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="竞价博弈" icon={Swords}><InputGroup label="当前 CPC" value={cpc} onChange={setCpc}/><InputGroup label="当前排名优于 %" value={share} onChange={setShare}/><InputGroup label="目标排名 %" value={target} onChange={setTarget}/></Card>
        <ResultBox label="所需 CPC" value={formatCurrency(reqCpc)} type={reqCpc > cpc*1.3 ? "bad" : "warning"} subtext={`涨幅 +${((reqCpc-cpc)/cpc*100).toFixed(0)}%`} />
      </div>
    );
  };

  const DaypartTool = () => {
    const [target, setTarget] = useState(30);
    const [actual, setActual] = useState(45);
    const mod = ((target/actual)-1)*100;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="时段调价" icon={Clock}><InputGroup label="目标 CPA" value={target} onChange={setTarget}/><InputGroup label="该时段实际 CPA" value={actual} onChange={setActual}/></Card>
        <ResultBox label="建议出价调整" value={`${mod>0?'+':''}${mod.toFixed(0)}%`} type={mod<0?"bad":"good"} subtext={mod<0?"成本过高，建议降价":"成本低，建议加价"} />
      </div>
    );
  };

  const GeoTool = () => {
    const [alloc, setAlloc] = useState(50);
    const blendedRoas = (alloc/100 * 2.8) + ((100-alloc)/100 * 1.5); // Simplified
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="多地区分层" icon={Globe}><div className="my-4 text-sm font-bold text-slate-500">T1国家 (ROAS 2.8) 占比: {alloc}%</div><input type="range" min="0" max="100" value={alloc} onChange={e=>setAlloc(Number(e.target.value))} className="w-full accent-blue-600"/></Card>
        <ResultBox label="混合 ROAS" value={safeFixed(blendedRoas)} type="blue" />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 pb-2 overflow-x-auto">
        {[{id:'pmax', label:'🛍️ PMax 效能'}, {id:'searchterm', label:'🗑️ 搜词清洗'}, {id:'auction', label:'⚔️ 竞价博弈'}, {id:'daypart', label:'🕰️ 时段调价'}, {id:'geo', label:'🌍 地区分层'}].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${tab===t.id ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>{t.label}</button>
        ))}
      </div>
      {tab === 'pmax' && <PMaxTool />}
      {tab === 'searchterm' && <SearchTermTool />}
      {tab === 'auction' && <AuctionTool />}
      {tab === 'daypart' && <DaypartTool />}
      {tab === 'geo' && <GeoTool />}
    </div>
  );
};

// 4. 模拟推演模块 (Simulation) - Budget, Match Type, Bid Modifier
const SimulationModule = ({ defaultTab }) => {
  const [tab, setTab] = useState(defaultTab || 'scaler');
  
  const BudgetScaler = () => {
    const [budget, setBudget] = useState(100);
    const [roas, setRoas] = useState(3.5);
    const data = [1, 1.5, 2, 3].map(s => ({ scale: `${s}x`, profit: (budget*s*roas) - (budget*s) - (budget*s*roas*0.4) }));
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <Card title="预算扩量" icon={TrendingUp}>
            <InputGroup label="日预算" value={budget} onChange={setBudget} prefix="$" />
            <InputGroup label="当前 ROAS" value={roas} onChange={setRoas} />
          </Card>
        </div>
        <div className="md:col-span-8">
          <Card className="h-64">
            <ResponsiveContainer><LineChart data={data}><XAxis dataKey="scale"/><YAxis/><Tooltip/><Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3}/></LineChart></ResponsiveContainer>
          </Card>
        </div>
      </div>
    );
  };

  const MatchTypeTool = () => {
    const [mix, setMix] = useState(30);
    const exactRoas = 4.0;
    const broadRoas = 2.5;
    const blended = (mix/100 * broadRoas) + ((100-mix)/100 * exactRoas);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="匹配模式混合" icon={Shuffle}><div className="my-4 text-sm font-bold text-slate-500">广泛匹配占比: {mix}%</div><input type="range" min="0" max="100" value={mix} onChange={e=>setMix(Number(e.target.value))} className="w-full accent-indigo-600"/></Card>
        <ResultBox label="混合 ROAS" value={safeFixed(blended)} type={blended>3?"good":"warning"} />
      </div>
    );
  };

  const DeviceTool = () => {
    const [base, setBase] = useState(2);
    const [mod, setMod] = useState(20);
    const [share, setShare] = useState(60);
    const weighted = (base*(1+mod/100)*share + base*(100-share))/100;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="设备出价模拟" icon={Smartphone}><InputGroup label="基础出价" value={base} onChange={setBase} /><InputGroup label="移动端占比 %" value={share} onChange={setShare} /><InputGroup label="移动端调价 %" value={mod} onChange={setMod} /></Card>
        <ResultBox label="加权 CPC" value={formatCurrency(weighted)} type="blue" />
      </div>
    );
  };

  const PacerTool = () => {
    const [total, setTotal] = useState(5000);
    const [spent, setSpent] = useState(1200);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="预算监控" icon={Calendar}><InputGroup label="月预算" value={total} onChange={setTotal} /><InputGroup label="已消耗" value={spent} onChange={setSpent} /></Card>
        <ResultBox label="消耗进度" value={`${(spent/total*100).toFixed(1)}%`} type="neutral" />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 pb-2 overflow-x-auto">
        {[{id:'scaler', label:'🚀 预算扩量'}, {id:'match', label:'⚖️ 匹配模式'}, {id:'device', label:'📱 设备调价'}, {id:'pacer', label:'📅 预算监控'}].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${tab===t.id ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>{t.label}</button>
        ))}
      </div>
      {tab === 'scaler' && <BudgetScaler />}
      {tab === 'match' && <MatchTypeTool />}
      {tab === 'device' && <DeviceTool />}
      {tab === 'pacer' && <PacerTool />}
    </div>
  );
};

// 5. 基础工具箱 (Tools) - ROAS, QS, Attribution, A/B, Lead
const ToolsModule = () => {
  const [tab, setTab] = useState('calc');
  
  const BasicCalc = () => {
    const [cpa, setCpa] = useState(30);
    const [cvr, setCvr] = useState(2.5);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="CPC 反推" icon={Calculator}>
          <InputGroup label="目标 CPA" value={cpa} onChange={setCpa} prefix="$" />
          <InputGroup label="转化率 %" value={cvr} onChange={setCvr} />
          <div className="mt-4 p-3 bg-slate-100 rounded text-center">
            <div className="text-xs text-slate-500">建议 Max CPC</div>
            <div className="text-xl font-bold text-slate-800">${(cpa * cvr / 100).toFixed(2)}</div>
          </div>
        </Card>
        <Card title="ROAS 计算" icon={RefreshCcw}>
          <div className="p-4 text-center text-slate-500 text-sm">输入 利润率/盈亏点 快速计算目标 ROAS</div>
        </Card>
      </div>
    );
  };

  const QSTool = () => {
    const [qs, setQs] = useState(5);
    const [cpc, setCpc] = useState(2);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="质量得分模拟" icon={Gauge}><InputGroup label="当前 CPC" value={cpc} onChange={setCpc}/><div className="my-2">QS: {qs} <input type="range" min="1" max="10" value={qs} onChange={e=>setQs(e.target.value)} /></div></Card>
        <ResultBox label="优化后 CPC (QS=10)" value={formatCurrency(cpc * (qs/10))} type="good" />
      </div>
    );
  };

  const ABTool = () => {
    const [a, setA] = useState({c:1000, v:50});
    const [b, setB] = useState({c:1000, v:60});
    // Simplified Z-test
    const z = Math.abs((a.v/a.c - b.v/b.c) / Math.sqrt(( (a.v+b.v)/(a.c+b.c) ) * (1-(a.v+b.v)/(a.c+b.c)) * (1/a.c + 1/b.c)));
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="A/B 测试" icon={Split}><InputGroup label="A 转化" value={a.v} onChange={v=>setA({...a,v:Number(v)})}/><InputGroup label="B 转化" value={b.v} onChange={v=>setB({...b,v:Number(v)})}/></Card>
        <ResultBox label="结果" value={z>1.96 ? "显著差异" : "不显著"} type={z>1.96?"good":"warning"} />
      </div>
    );
  };

  const LeadTool = () => {
    const [cpl, setCpl] = useState(20);
    const [close, setClose] = useState(10);
    const cac = cpl / (close/100);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="线索回传" icon={Funnel}><InputGroup label="CPL" value={cpl} onChange={setCpl}/><InputGroup label="成交率 %" value={close} onChange={setClose}/></Card>
        <ResultBox label="实际获客成本 (CAC)" value={formatCurrency(cac)} type="purple" />
      </div>
    );
  };

  const AttrTool = () => {
    const [roas, setRoas] = useState(2);
    const [days, setDays] = useState(5);
    const trueRoas = roas / (Math.max(30, 100-days*8)/100);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="归因延迟" icon={Clock}><InputGroup label="面板 ROAS" value={roas} onChange={setRoas}/><InputGroup label="延迟天数" value={days} onChange={setDays}/></Card>
        <ResultBox label="预估真实 ROAS" value={safeFixed(trueRoas)} type="good" />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 pb-2 overflow-x-auto">
        {[{id:'calc', label:'🧮 基础计算'}, {id:'qs', label:'⚡ QS 模拟'}, {id:'ab', label:'🧪 A/B 测试'}, {id:'lead', label:'💎 线索回传'}, {id:'attr', label:'⏳ 归因延迟'}].map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${tab===t.id ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>{t.label}</button>
        ))}
      </div>
      {tab === 'calc' && <BasicCalc />}
      {tab === 'qs' && <QSTool />}
      {tab === 'ab' && <ABTool />}
      {tab === 'lead' && <LeadTool />}
      {tab === 'attr' && <AttrTool />}
    </div>
  );
};


// --- 主布局框架 ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState('hub');
  const [subTab, setSubTab] = useState(null);

  // Navigation helper to support deep linking from Smart Hub
  const handleNavigate = (catId, subId = null) => {
    setActiveCategory(catId);
    setSubTab(subId);
  };

  const navItems = [
    { id: 'hub', label: '智能诊断中控', icon: LayoutDashboard, color: 'text-blue-400' },
    { id: 'strategy', label: '战略规划 (Strategy)', icon: Layers },
    { id: 'optimization', label: '深度优化 (Optimization)', icon: Filter },
    { id: 'simulation', label: '模拟推演 (Simulation)', icon: Activity },
    { id: 'tools', label: '效率工具 (Tools)', icon: Calculator },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold leading-none">Google Ads</h1>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Pro v10.0</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color || 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-center text-slate-500">
          Designed for Pro Media Buyers
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-8 py-4 shadow-sm flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">
            {navItems.find(i => i.id === activeCategory)?.label}
          </h2>
          <div className="text-sm text-slate-500">
            {new Date().toLocaleDateString()}
          </div>
        </header>

        <main className="p-8 max-w-7xl mx-auto">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {activeCategory === 'hub' && <SmartHub navigateTo={handleNavigate} />}
            {activeCategory === 'strategy' && <StrategyModule defaultTab={subTab} />}
            {activeCategory === 'optimization' && <OptimizationModule defaultTab={subTab} />}
            {activeCategory === 'simulation' && <SimulationModule defaultTab={subTab} />}
            {activeCategory === 'tools' && <ToolsModule />}
          </div>
        </main>
      </div>
    </div>
  );
}
