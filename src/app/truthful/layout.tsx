import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Team Truthful',
  description: 'Page for Team Truthful',
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
