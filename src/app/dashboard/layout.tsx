import Header from "@/components/Header";
import { headers } from "next/headers";
const getUser = async () => {
  const headerList = headers();
  const user_id = parseInt(headerList.get("id") || "");
  const res = await fetch(`${process.env.BACKEND_URL}/users/${user_id}`);
  let userRes = await res.json();
  return {
    name: userRes.name,
    email: userRes.email,
  };
};
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
}
