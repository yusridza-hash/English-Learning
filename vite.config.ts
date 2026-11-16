import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

interface PackAuditBuildMeta {
  updatedAt: string;
}

interface QuestionBankBuildAudit {
  builtAt: string;
  baseUpdatedAt: string;
  latestPackUpdatedAt: string;
  packMtimes: Record<string, PackAuditBuildMeta>;
}

function collectQuestionBankBuildAudit(): QuestionBankBuildAudit {
  const rootDir = process.cwd();
  const baseFile = path.join(rootDir, 'src/data/questionBank.ts');
  const packsRoot = path.join(rootDir, 'src/data/question-packs');

  let baseUpdatedAt = new Date().toISOString();
  try {
    baseUpdatedAt = fs.statSync(baseFile).mtime.toISOString();
  } catch {
    // Fallback to current timestamp
  }

  const packMtimes: Record<string, PackAuditBuildMeta> = {};
  let latestMs = Date.parse(baseUpdatedAt) || 0;

  const walk = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.pack.json') || entry.name.endsWith('.pack.ts'))) {
        try {
          const mtime = fs.statSync(fullPath).mtime;
          const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
          packMtimes[relPath] = { updatedAt: mtime.toISOString() };
          if (mtime.getTime() > latestMs) {
            latestMs = mtime.getTime();
          }
        } catch {
          // Ignore individual stat failures
        }
      }
    }
  };

  walk(packsRoot);

  return {
    builtAt: new Date().toISOString(),
    baseUpdatedAt,
    latestPackUpdatedAt: latestMs > 0 ? new Date(latestMs).toISOString() : baseUpdatedAt,
    packMtimes,
  };
}

export default defineConfig({
  define: {
    __QB_BUILD_AUDIT__: JSON.stringify(collectQuestionBankBuildAudit()),
  },
  plugins: [
    react(),
    {
      name: 'spa-html-fallback',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && req.url.includes('.html') && !req.url.startsWith('/index.html')) {
            req.url = '/index.html';
          }
          next();
        });
      },
    },
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icon.svg', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-maskable-512x512.png'],
      manifest: {
        id: '/',
        name: 'English Learning — Kurikulum & Latihan Interaktif',
        short_name: 'EngLearn',
        description: 'Platform belajar grammar bahasa Inggris 58 modul dari Basic hingga Advanced-Formal, dapat digunakan secara offline.',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        navigateFallback: '/index.html',
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
