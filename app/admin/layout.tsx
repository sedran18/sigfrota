import { auth } from "@/auth";
import Menu from "@/components/admin/Menu";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  const isAdmin = session?.user.role === 'ADMIN';

  return (
    <div>
      <Menu userName={session?.user.name ?? 'Não identificado'} isAdmin={isAdmin}/>
      <main className="mt-16 md:mt-0 md:ml-50 lg:ml-72">
        {children}
      </main>
    </div>
  )
};

export default AdminLayout;
