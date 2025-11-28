import { PostDetailsPage  } from "@/pages/post-details";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <PostDetailsPage slug={slug} />;
}