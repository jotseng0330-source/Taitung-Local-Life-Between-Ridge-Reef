declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.mp4';
declare module '*.webp';

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'react-dom' {
  import type { ReactNode } from 'react';

  export function createPortal(children: ReactNode, container: Element | DocumentFragment): ReactNode;
}
