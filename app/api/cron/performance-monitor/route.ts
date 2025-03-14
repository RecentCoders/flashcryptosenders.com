import { NextResponse } from 'next/server';

interface PerformanceRecord {
  timestamp: string;
  url: string;
  metrics: {
    fcp: number | null;
    lcp: number | null;
    fid: number | null;
    cls: number | null;
    ttfb: number | null;
    inp: number | null;
  };
  userAgent: string | null;
  connection: string | null;
  deviceCategory: string | null;
}

/**
 * In-memory storage for performance data
 * In a production environment, this would be replaced with a database
 */
let performanceRecords: PerformanceRecord[] = [];

/**
 * GET handler for retrieving performance data
 * Protected with a basic token for security
 */
export async function GET(request: Request) {
  // Basic auth - would be more robust in production
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  
  // Summarize performance metrics
  const summary = {
    recordCount: performanceRecords.length,
    averages: calculateAverages(performanceRecords),
    worstPages: findWorstPerformingPages(performanceRecords),
    lastUpdated: new Date().toISOString()
  };
  
  return NextResponse.json(summary);
}

/**
 * POST handler for recording performance data
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the incoming data
    if (!data.url || !data.metrics) {
      return new NextResponse('Invalid data format', { status: 400 });
    }
    
    // Create a performance record
    const performanceRecord: PerformanceRecord = {
      timestamp: new Date().toISOString(),
      url: data.url,
      metrics: {
        fcp: data.metrics.fcp || null,
        lcp: data.metrics.lcp || null,
        fid: data.metrics.fid || null,
        cls: data.metrics.cls || null,
        ttfb: data.metrics.ttfb || null,
        inp: data.metrics.inp || null,
      },
      userAgent: data.userAgent || null,
      connection: data.connection || null,
      deviceCategory: data.deviceCategory || null,
    };
    
    // Add to records (limit to last 1000 entries for memory usage)
    performanceRecords.push(performanceRecord);
    if (performanceRecords.length > 1000) {
      performanceRecords = performanceRecords.slice(-1000);
    }
    
    // In a production environment, this would save to a database
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing performance data:', error);
    return new NextResponse('Error processing request', { status: 500 });
  }
}

/**
 * Calculate average metrics from performance records
 */
function calculateAverages(records: PerformanceRecord[]) {
  if (records.length === 0) return null;
  
  const totals = {
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    inp: 0,
  };
  
  const counts = {
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    inp: 0,
  };
  
  // Sum up all metrics
  records.forEach(record => {
    Object.entries(record.metrics).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        totals[key as keyof typeof totals] += value;
        counts[key as keyof typeof counts]++;
      }
    });
  });
  
  // Calculate averages
  const averages: Record<string, number | null> = {};
  Object.keys(totals).forEach(key => {
    const k = key as keyof typeof totals;
    averages[key] = counts[k] > 0 ? totals[k] / counts[k] : null;
  });
  
  return averages;
}

/**
 * Find the worst performing pages
 */
function findWorstPerformingPages(records: PerformanceRecord[]) {
  if (records.length === 0) return [];
  
  // Group records by URL
  const urlGroups: Record<string, PerformanceRecord[]> = {};
  records.forEach(record => {
    if (!urlGroups[record.url]) {
      urlGroups[record.url] = [];
    }
    urlGroups[record.url].push(record);
  });
  
  // Calculate average LCP for each URL
  const urlPerformance = Object.entries(urlGroups).map(([url, urlRecords]) => {
    const averages = calculateAverages(urlRecords);
    return {
      url,
      averageLcp: averages?.lcp || 0,
      averageFid: averages?.fid || 0,
      averageCls: averages?.cls || 0,
      sampleSize: urlRecords.length
    };
  });
  
  // Sort by LCP (highest first) and return top 5
  return urlPerformance
    .sort((a, b) => b.averageLcp - a.averageLcp)
    .slice(0, 5);
}
