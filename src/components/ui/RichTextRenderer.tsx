// components/RichTextRenderer.tsx
'use client';

import DOMPurify from 'dompurify';
import React from 'react';

interface RichTextRendererProps {
  html: string;
  className?: string;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ html, className }) => {
  const sanitizedHtml = DOMPurify.sanitize(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default RichTextRenderer;
