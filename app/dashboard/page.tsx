import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPosts from "./MyPost";
export default async function DashBoard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main>
      <h1 className="text-2xl font-bold "> Welcome {session?.user?.name}</h1>
      <MyPosts />
    </main>
  );
}
