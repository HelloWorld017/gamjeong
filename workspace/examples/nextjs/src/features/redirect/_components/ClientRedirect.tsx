'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type ClientRedirectProps = {
  href: string;
};

export const ClientRedirect = ({ href }: ClientRedirectProps) => {
  const { replace } = useRouter();
  useEffect(() => { replace(href) }, []);

  return null;
};
