'use client';

import { AnimatePresence } from 'framer-motion';
import i18next from 'i18next';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/ja/zod.json';

i18next.init({
  lng: 'ja',
  resources: {
    ja: { zod: translation }
  }
});
z.setErrorMap(zodI18nMap);

export function ClientProviders({ children }: PropsWithChildren) {
  return (
    <>
      <SessionProvider>
        <AnimatePresence>{children}</AnimatePresence>
      </SessionProvider>
    </>
  );
}
