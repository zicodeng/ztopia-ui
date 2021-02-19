import React, { memo, ReactNode, useEffect, useState } from 'react';
import BaseZoom from 'react-medium-image-zoom';

import 'react-medium-image-zoom/dist/styles.css';

export interface ZoomProps {
  containerId?: string;
  children: ReactNode;
}

export const Zoom = memo<ZoomProps>(({ containerId, ...restProps }) => {
  const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (containerId) {
      const el = document.getElementById(containerId);
      setContainerEl(el);
    }
  }, [containerId]);

  return (
    <BaseZoom
      zoomMargin={100}
      portalEl={containerEl || undefined}
      {...restProps}
    />
  );
});
