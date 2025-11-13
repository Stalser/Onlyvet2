"use client";

import React from "react";

type PullToRefreshProps = {
  children: React.ReactNode;
  onRefresh?: () => void;
};

/**
 * Заглушка компонента PullToRefresh.
 * Сейчас просто отображает содержимое без логики "потянуть, чтобы обновить".
 */
export default function PullToRefresh({ children }: PullToRefreshProps) {
  return <div>{children}</div>;
}
