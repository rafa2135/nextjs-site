"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
type Props = {
  children?: ReactNode;
};
const queryClient = new QueryClient();

const QueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default QueryWrapper;
