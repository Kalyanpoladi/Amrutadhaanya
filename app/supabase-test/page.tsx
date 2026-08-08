import { createClient } from "@/lib/supabase/server";

export default async function SupabaseTestPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("connection_test")
    .select("*")
    .limit(10);

  if (error) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Supabase connection failed
        </h1>

        <pre className="mt-4 whitespace-pre-wrap text-red-600">
          {error.message}
        </pre>
      </main>
    );
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">
        Supabase connection successful
      </h1>

      <pre className="mt-6 rounded-lg bg-gray-100 p-4">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}