"use client";

import React from "react";

type RevealProps = {
  children: React.ReactNode;
};

/**
 * Заглушка анимационного компонента Reveal.
 * Сейчас просто рендерит children без анимаций.
 */
export default function Reveal({ children }: RevealProps) {
  return <>{children}</>;
}
