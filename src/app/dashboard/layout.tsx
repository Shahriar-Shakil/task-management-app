import Header from "@/components/Header";
import { getUser } from "@/lib/get-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: any = await getUser();
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
}
