import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Team Excellence',
  description: 'Page for Team Excellence',
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
