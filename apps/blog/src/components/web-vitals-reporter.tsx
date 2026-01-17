'use client';

import { useReportWebVitals } from 'next/web-vitals';

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType?: string;
}

export function WebVitalsReporter() {
  useReportWebVitals((metric: WebVitalsMetric) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = window.gtag as (...args: unknown[]) => void;
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
        metric_rating: metric.rating,
        metric_delta: metric.delta,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      const rating = metric.rating ?? 'unknown';
      const color =
        rating === 'good' ? '\x1b[32m' : rating === 'needs-improvement' ? '\x1b[33m' : '\x1b[31m';
      const reset = '\x1b[0m';

      console.log(
        `[Web Vitals] ${color}${metric.name}${reset}: ${metric.value.toFixed(2)} (${rating})`
      );
    }
  });

  return null;
}
