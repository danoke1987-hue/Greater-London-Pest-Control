/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { trackEvent } from './analytics';

interface RouterContextProps {
  pathname: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextProps>({
  pathname: '/',
  navigate: () => {},
});

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  id?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  key?: React.Key | null;
}

export function Link({ href, children, onClick, id, ...props }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let browser handle modifier clicks (cmd/ctrl click) or external links
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      href.startsWith('http') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('https://wa.me')
    ) {
      return;
    }

    e.preventDefault();
    
    // Smooth transitions or standard scroll-to-top
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    window.history.pushState(null, '', href);
    navigate(href);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a href={href} id={id} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

interface RouterProviderProps {
  children: ReactNode;
}

export function RouterProvider({ children }: RouterProviderProps) {
  // Normalise initial path (ensure trailing slashes consistency)
  const getNormalisedPath = () => {
    if (typeof window === 'undefined') return '/';
    let path = window.location.pathname;
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path || '/';
  };

  const [pathname, setPathname] = useState(getNormalisedPath());

  useEffect(() => {
    const handlePopState = () => {
      setPathname(getNormalisedPath());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (to: string) => {
    let normalised = to;
    if (normalised.length > 1 && normalised.endsWith('/')) {
      normalised = normalised.slice(0, -1);
    }
    setPathname(normalised || '/');
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

/**
 * Updates head metadata dynamically in Vite SPA for SEO completeness.
 */
export function updatePageMetadata(title: string, description: string, canonicalUrl: string) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = title;

  // Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Canonical Link
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', canonicalUrl);

  // Open Graph
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', description);
}
