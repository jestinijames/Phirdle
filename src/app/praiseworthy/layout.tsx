import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Team Praiseworthy',
  description: 'Page for Team Praiseworthy',
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
