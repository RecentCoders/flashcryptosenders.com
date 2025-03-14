import { NextResponse } from 'next/server';

/**
 * Health check endpoint for monitoring services
 * Returns the current status of the application and system metrics
 */
export async function GET() {
  const startTime = process.hrtime();
  
  // Get basic memory usage
  const memoryUsage = process.memoryUsage();
  
  // Calculate response time
  const endTime = process.hrtime(startTime);
  const responseTimeNs = endTime[0] * 1e9 + endTime[1];
  const responseTimeMs = responseTimeNs / 1e6;
  
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    memory: {
      rss: Math.round(memoryUsage.rss / 1024 / 1024) + 'MB', // Resident Set Size
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB',
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB',
      external: Math.round(memoryUsage.external / 1024 / 1024) + 'MB',
    },
    responseTime: responseTimeMs.toFixed(2) + 'ms',
  }, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  });
}
