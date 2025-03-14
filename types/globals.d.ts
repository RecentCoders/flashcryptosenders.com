/// <reference types="next" />
/// <reference types="react" />

// Declare global types
declare namespace NodeJS {
  interface Process {
    env: {
      NODE_ENV: 'development' | 'production' | 'test';
      [key: string]: string | undefined;
    }
  }
  
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_URL: string;
    // Add any other environment variables here
  }
  
  var process: Process;
}

declare var process: NodeJS.Process;

// Fix for Web3PaymentProvider
declare module '@/components/web3-payment-provider' {
  interface Web3PaymentProviderProps {
    children: React.ReactNode;
  }
  
  export const Web3PaymentProvider: React.FC<Web3PaymentProviderProps>;
}

// Fix for component imports
declare module '@/components/theme-provider' {
  interface ThemeProviderProps {
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    children: React.ReactNode;
  }
  
  export const ThemeProvider: React.FC<ThemeProviderProps>;
}

declare module '@/components/site-footer' {
  export const SiteFooter: React.FC;
}

declare module '@/components/site-header' {
  export const SiteHeader: React.FC;
}

declare module '@/components/ui/toaster' {
  export const Toaster: React.FC;
}

declare module '@/components/pwa-init' {
  export const PWAInit: React.FC;
}

declare module '@/components/enhanced-analytics' {
  export const EnhancedAnalytics: React.FC;
}

declare module '@/components/structured-data' {
  export const OrganizationStructuredData: React.FC;
  export const WebsiteStructuredData: React.FC;
}

declare module '@/components/page-optimization' {
  export const DefaultPageOptimization: React.FC;
}

declare module '@/components/optimized-assets' {
  export const OptimizedAnimations: React.FC;
  export const OptimizedAssets: React.FC;
}

declare module '@/components/web-vitals-monitor' {
  interface WebVitalsMonitorProps {
    enabled: boolean;
    debug?: boolean;
  }
  
  export const WebVitalsMonitor: React.FC<WebVitalsMonitorProps>;
}

declare module '@/components/navigation-prefetcher' {
  export const NavigationPrefetcher: React.FC;
}

// Fix for Vercel imports
declare module '@vercel/speed-insights/next' {
  export const SpeedInsights: React.FC;
}
