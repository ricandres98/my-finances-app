import { CreateExpenseForm } from "@/components/expense/CreateExpenseForm";

export default async function Dashboard() {
  return (
    <div className="grid md:grid-cols-[14rem_1fr]">
      <aside className="h-dvh bg-amber-300">
        <div>
          <h3>Sidebar</h3>
        </div>
      </aside>
      <main className="inline-block w-full">
        <div>
          <CreateExpenseForm />
        </div>
        <div>List</div>
      </main>
    </div>
  );
}
