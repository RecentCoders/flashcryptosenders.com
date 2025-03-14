// This is a simplified type declaration file to help with TypeScript errors
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'react' {
  export = React;
  export as namespace React;
}

declare module 'next/font/google' {
  export interface FontOptions {
    subsets?: string[];
    display?: string;
    variable?: string;
    preload?: boolean;
    weight?: string | string[];
  }

  export function Inter(options: FontOptions): {
    className: string;
    variable: string;
    style: {
      fontFamily: string;
    };
  };
}

declare module 'next' {
  export interface Metadata {
    title?: string | { default: string; template: string };
    description?: string;
    metadataBase?: URL;
    openGraph?: {
      type?: string;
      locale?: string;
      url?: string;
      siteName?: string;
      title?: string;
      description?: string;
      images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
    };
  }
}

declare module '@vercel/speed-insights/next' {
  export const SpeedInsights: React.FC;
}

declare module 'next/dynamic' {
  export default function dynamic<T>(
    dynamicImport: () => Promise<T>,
    options?: { ssr?: boolean }
  ): React.ComponentType<any>;
}
