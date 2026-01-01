<script lang="ts">
    import { onMount } from 'svelte';
    
    interface HistoryEntry {
        count: number;
        timestamp: number;
    }
    
    let { data } = $props();
    let currentCount = $state(data.currentCount);
    let history: HistoryEntry[] = $state([]);
    let milestones = [200, 250, 300, 400, 500, 750, 1000];
    

    
    async function fetchCount() {
        try {
            const res = await fetch('https://api.rooted.hackclub.com/count');
            if (res.ok) {
                const json = await res.json();
                currentCount = json.count;
                addToHistory(json.count, Date.now());
            }
        } catch (e) {
            console.log('Could not fetch count:', e);
        }
    }
    
    function addToHistory(count: number, timestamp: number) {
        const lastEntry = history[history.length - 1];
        if (!lastEntry || lastEntry.count !== count) {
            history = [...history, { count, timestamp }];
            localStorage.setItem('rsvp-history', JSON.stringify(history));
        }
    }
    
    onMount(() => {
        const stored = localStorage.getItem('rsvp-history');
        if (stored) {
            history = JSON.parse(stored);
        }
        
        if (data.currentCount !== null) {
            addToHistory(data.currentCount, data.timestamp);
        }
        
        const interval = setInterval(fetchCount, 5 * 60 * 1000);
        return () => clearInterval(interval);
    });
    
    function calculateGrowthRate(): number | null {
        if (history.length < 2) return null;
        const recent = history.slice(-10);
        if (recent.length < 2) return null;
        
        const first = recent[0];
        const last = recent[recent.length - 1];
        const timeDiff = (last.timestamp - first.timestamp) / (1000 * 60 * 60 * 24);
        const countDiff = last.count - first.count;
        
        if (timeDiff === 0) return null;
        return countDiff / timeDiff;
    }

    function getTweetUrl(): string {
        const base = 'https://x.com/intent/tweet';
        const text = `${currentCount ?? 'Many'} hackers already signed up for Rooted! Join us:`;
        const url = 'https://rooted.hackclub.com';
        const params = new URLSearchParams({
            text: text,
            url: url
        });
        return `${base}?${params.toString()}`;
    }
    
    function predictMilestone(target: number): string | null {
        const rate = calculateGrowthRate();
        if (!rate || rate <= 0 || !currentCount) return null;
        
        const remaining = target - currentCount;
        if (remaining <= 0) return 'Reached!';
        
        const daysNeeded = remaining / rate;
        const targetDate = new Date(Date.now() + daysNeeded * 24 * 60 * 60 * 1000);
        return targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    
    function formatDate(timestamp: number): string {
        return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    
    function getMaxCount(): number {
        if (history.length === 0) return currentCount || 100;
        return Math.max(...history.map(h => h.count), currentCount || 0);
    }
    
    function getMinCount(): number {
        if (history.length === 0) return 0;
        return Math.min(...history.map(h => h.count));
    }
    
    function generateLinePath(points: HistoryEntry[], width: number, height: number): string {
        if (points.length < 2) return '';
        const max = getMaxCount();
        const min = getMinCount();
        const range = max - min || 1;
        const padding = 20;
        
        return points.map((point, i) => {
            const x = padding + (i / (points.length - 1)) * (width - padding * 2);
            const y = height - padding - ((point.count - min) / range) * (height - padding * 2);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    }
    
    function generateAreaPath(points: HistoryEntry[], width: number, height: number): string {
        if (points.length < 2) return '';
        const linePath = generateLinePath(points, width, height);
        const padding = 20;
        const lastX = padding + ((points.length - 1) / (points.length - 1)) * (width - padding * 2);
        const firstX = padding;
        return `${linePath} L ${lastX} ${height - padding} L ${firstX} ${height - padding} Z`;
    }
</script>

<style>
    @import "../styles.css";
    
    .stats-container {
        min-height: 100vh;
        background: linear-gradient(180deg, #0a1f0a 0%, #132613 50%, #1a3318 100%);
        padding: 40px 20px;
        color: #f5f0e6;
    }
    
    .stats-content {
        max-width: 1200px;
        margin: 0 auto;
    }
    
    /* Wide screen layout */
    @media (min-width: 1024px) {
        .stats-container {
            padding: 60px 40px;
        }
        
        .stats-header {
            margin-bottom: 60px;
        }
        
        .title {
            font-size: 64px;
        }
        
        .current-count {
            margin-bottom: 60px;
        }
        
        .count-number {
            font-size: 120px;
        }
        
        .count-label {
            font-size: 24px;
        }
        
        .section-title {
            font-size: 28px;
        }
        
        .line-chart {
            padding: 30px;
        }
        
        .line-chart svg {
            height: 350px;
        }
        
        .chart {
            height: 280px;
            padding: 30px;
        }
        
        .milestones {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
        }
        
        .milestone {
            padding: 24px;
        }
        
        .milestone-target {
            font-size: 40px;
        }
        
        .milestone-date {
            font-size: 16px;
        }
        
        .share-buttons {
            gap: 20px;
        }
        
        .share-btn {
            padding: 14px 28px;
            font-size: 16px;
        }
        
        .growth-rate {
            font-size: 22px;
        }
    }
    
    .stats-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
    }
    
    .title {
        font-family: 'Phantom Sans', sans-serif;
        font-size: 48px;
        font-weight: bold;
        color: #7cb87c;
        margin: 0;
    }
    
    .current-count {
        text-align: center;
        margin-bottom: 50px;
    }
    
    .count-number {
        font-family: 'Phantom Sans', sans-serif;
        font-size: 96px;
        font-weight: bold;
        color: #a8d4a8;
    }
    
    .count-label {
        font-family: 'Phantom Sans', sans-serif;
        font-size: 20px;
        color: #8ab88a;
    }
    
    .section {
        margin-bottom: 50px;
    }
    
    .section-title {
        font-family: 'Phantom Sans', sans-serif;
        font-size: 24px;
        color: #7cb87c;
        margin-bottom: 20px;
    }
    
    .chart {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 20px;
        height: 200px;
        display: flex;
        align-items: flex-end;
        gap: 4px;
    }
    
    .bar {
        flex: 1;
        background: linear-gradient(to top, #2d5a27, #4a7c43);
        border-radius: 4px 4px 0 0;
        min-height: 4px;
        position: relative;
    }
    
    .bar:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: #1a3318;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        margin-bottom: 4px;
    }
    
    .milestones {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
    }
    
    .milestone {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        padding: 16px;
    }
    
    .milestone-target {
        font-family: 'Phantom Sans', sans-serif;
        font-size: 32px;
        font-weight: bold;
        color: #a8d4a8;
    }
    
    .milestone-date {
        font-size: 14px;
        color: #8ab88a;
        margin-top: 4px;
    }
    
    .milestone.reached {
        border: 2px solid #4a7c43;
    }
    
    .no-data {
        color: #6a9a6a;
        font-style: italic;
    }
    
    
    .growth-rate {
        font-size: 18px;
        color: #8ab88a;
        margin-bottom: 20px;
    }
    
    .line-chart {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 30px;
    }
    
    .line-chart svg {
        width: 100%;
        height: 250px;
    }
    
    .chart-line {
        fill: none;
        stroke: #4a7c43;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
    
    .chart-area {
        fill: url(#areaGradient);
        opacity: 0.4;
    }
    
    .chart-dot {
        fill: #7cb87c;
    }
    
    .chart-labels {
        font-family: 'Phantom Sans', sans-serif;
        font-size: 12px;
        fill: #6a9a6a;
    }
    
    .share-section {
        text-align: center;
        margin-bottom: 40px;
    }
    
    .share-label {
        font-family: 'Phantom Sans', sans-serif;
        font-size: 14px;
        color: #6a9a6a;
        margin-bottom: 12px;
    }
    
    .share-buttons {
        display: flex;
        gap: 12px;
        justify-content: center;
    }
    
    .share-btn {
        padding: 10px 20px;
        font-family: 'Phantom Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #f5f0e6;
        background: #2d5a27;
        border: none;
        border-radius: 6px;
        text-decoration: none;
        cursor: pointer;
        transition: background 0.2s ease;
    }
    
    .share-btn:hover {
        background: #3d7a34;
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
        .stats-container {
            padding: 30px 15px;
        }
        
        .stats-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
        }
        
        .title {
            font-size: 36px;
        }
        
        .count-number {
            font-size: 64px;
        }
        
        .count-label {
            font-size: 16px;
        }
        
        .section-title {
            font-size: 20px;
        }
        
        .milestones {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .milestone-target {
            font-size: 24px;
        }
        
        .share-buttons {
            flex-direction: column;
        }
        
        .line-chart svg {
            height: 180px;
        }
        
    }
    
    @media (max-width: 480px) {
        .count-number {
            font-size: 48px;
        }
        
        .milestones {
            grid-template-columns: 1fr;
        }
    }
</style>

<div class="stats-container">
    <div class="stats-content">
        <div class="stats-header">
            <h1 class="title">Stats</h1>
            <a href="/" class="back-btn">← Back</a>
        </div>
        
        <div class="current-count">
            <div class="count-number">{currentCount ?? '—'}</div>
            <div class="count-label">Hackers Rooted</div>
        </div>
        
        
        
        {#if calculateGrowthRate() !== null}
            {@const rate = calculateGrowthRate()}
            <p class="growth-rate">
                Growing at ~{rate?.toFixed(1)} RSVPs/day
            </p>
        {/if}
        
        <div class="section">
            <h2 class="section-title">Growth</h2>
            {#if history.length > 1}
                {@const points = history.slice(-30)}
                <div class="line-chart">
                    <svg viewBox="0 0 700 250" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stop-color="#4a7c43" />
                                <stop offset="100%" stop-color="#0a1f0a" />
                            </linearGradient>
                        </defs>
                        
                        <path class="chart-area" d={generateAreaPath(points, 700, 250)} />
                        <path class="chart-line" d={generateLinePath(points, 700, 250)} />
                        
                        {#each points as point, i}
                            {@const x = 20 + (i / (points.length - 1)) * 660}
                            {@const max = getMaxCount()}
                            {@const min = getMinCount()}
                            {@const range = max - min || 1}
                            {@const y = 230 - ((point.count - min) / range) * 210}
                            <circle class="chart-dot" cx={x} cy={y} r="4" />
                        {/each}
                        
                        <text class="chart-labels" x="20" y="245">{formatDate(points[0].timestamp)}</text>
                        <text class="chart-labels" x="680" y="245" text-anchor="end">{formatDate(points[points.length - 1].timestamp)}</text>
                        <text class="chart-labels" x="10" y="25">{getMaxCount()}</text>
                        <text class="chart-labels" x="10" y="230">{getMinCount()}</text>
                    </svg>
                </div>
                
                <div class="chart">
                    {#each points as point}
                        <div 
                            class="bar" 
                            style="height: {(point.count / getMaxCount()) * 100}%"
                            data-tooltip="{point.count} on {formatDate(point.timestamp)}"
                        ></div>
                    {/each}
                </div>
            {:else}
                <p class="no-data">Check back later for growth data. History builds as you visit.</p>
            {/if}
        </div>
        
        <div class="section">
            <h2 class="section-title">Milestone Predictions</h2>
            <div class="milestones">
                {#each milestones as target}
                    <div class="milestone" class:reached={currentCount !== null && currentCount >= target}>
                        <div class="milestone-target">{target}</div>
                        <div class="milestone-date">
                            {#if currentCount !== null && currentCount >= target}
                                ✓ Reached!
                            {:else if predictMilestone(target)}
                                Est. {predictMilestone(target)}
                            {:else}
                                Calculating...
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
