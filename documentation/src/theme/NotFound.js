import React from 'react';
import { useLocation } from '@docusaurus/router';

export default function NotFound() {
  const location = useLocation();


  console.log(location.pathname);

  // Ignore 404 handling when inside `/v1/extensions/`
  if (location.pathname.includes('v1/extensions')) {
    return null; // Don't show anything, let GitHub Pages serve the React app
  }

  return (
    <main>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for doesn’t exist.</p>
    </main>
  );
}
