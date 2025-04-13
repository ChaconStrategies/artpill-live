'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FrenchHomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to root page - this is a workaround since we're handling language in the root page
    router.replace('/');
  }, [router]);

  return null;
}
