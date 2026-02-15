import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <div className="auth-layout lg:flex-row-reverse">{children}</div>;
}
