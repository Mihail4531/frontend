import { Sidebar } from "@/widgets/sidebar";
import { Footer } from "@/widgets/footer";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
};