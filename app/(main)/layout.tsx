import { MainLayout } from "@/app/layouts"; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}