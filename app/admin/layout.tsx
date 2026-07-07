import Menu from "@/components/admin/Menu";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Menu />
      <main className="mt-16 md:mt-0 md:ml-50 lg:ml-72">
        {children}
      </main>
    </div>
  )
}
