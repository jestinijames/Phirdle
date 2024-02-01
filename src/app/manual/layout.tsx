import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Team Honourable',
  description: 'Page for Team Honourable',
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
