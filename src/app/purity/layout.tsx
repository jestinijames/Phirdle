import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Team Purity',
  description: 'Page for Team Purity',
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
