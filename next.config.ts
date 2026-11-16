import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: '/downloads/wra/wra-impact-report-2025-2026.pdf', destination: '/downloads/wra/wra-impact-report-2025-2026.pdf.gz' }]
  },
  async headers() {
    return [{
      source: '/downloads/wra/:file(wra-impact-report-2025-2026.pdf|wra-impact-report-2025-2026.pdf.gz)',
      headers: [
        { key: 'Content-Type', value: 'application/pdf' },
        { key: 'Content-Encoding', value: 'gzip' },
        { key: 'Content-Disposition', value: 'attachment; filename="WRA Impact Report Book 2025 - 2026.pdf"' },
      ],
    }]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
  },
}

export default nextConfig
