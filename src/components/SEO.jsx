import React, { useEffect, useRef } from 'react';

const SEO = ({ title, description, keywords }) => {
  const seoId = useRef(`seo-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    const id = seoId.current;
    document.querySelectorAll(`[data-seo="${id}"]`).forEach(el => el.remove());

    if (title) {
      document.title = `${title} | KEC Bhilai`;
    }

    if (description) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      meta.setAttribute('data-seo', id);
      document.head.appendChild(meta);
    }

    if (keywords) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      meta.setAttribute('data-seo', id);
      document.head.appendChild(meta);
    }
  }, [title, description, keywords]);

  return null;
};

export default SEO;
