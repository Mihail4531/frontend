import { HomePage } from "@/pages/home";

// Настройки кэширования для Next.js
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  // В Next.js 15 searchParams — это Promise, поэтому await
  const resolvedParams = await searchParams;

  return <HomePage searchParams={resolvedParams} />;
}