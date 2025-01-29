import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    // If the user is in the React app path, redirect to its index.html
    if (location.pathname.startsWith('/goose/v1/extensions')) {
      window.location.href = '/goose/v1/extensions/index.html';
    }
  }, [location]);

  return (
    <main>
      <h1>404 - Page Not Found</h1>
      <p>Oops! This page doesn’t exist.</p>
    </main>
  );
}
