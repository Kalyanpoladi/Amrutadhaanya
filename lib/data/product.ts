import { createClient } from "@/lib/supabase/server";

export type Product = {
  id: string;
  product_code: string;
  item_id: string;
  name: string;
  description: string | null;
  selling_unit: string;
  selling_price: number | null;
  website_visible: boolean;
  status: string;
  environment: string;
  created_at: string;
  updated_at: string;
};

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        product_code,
        item_id,
        name,
        description,
        selling_unit,
        selling_price,
        website_visible,
        status,
        environment,
        created_at,
        updated_at
      `,
    )
    .eq("environment", "demo")
    .eq("status", "active")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to load products: ${error.message}`);
  }

  return (data ?? []) as Product[];
}

export async function getWebsiteProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        product_code,
        item_id,
        name,
        description,
        selling_unit,
        selling_price,
        website_visible,
        status,
        environment,
        created_at,
        updated_at
      `,
    )
    .eq("environment", "demo")
    .eq("status", "active")
    .eq("website_visible", true)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(
      `Failed to load website products: ${error.message}`,
    );
  }

  return (data ?? []) as Product[];
}

export async function getProductById(
  productId: string,
): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        product_code,
        item_id,
        name,
        description,
        selling_unit,
        selling_price,
        website_visible,
        status,
        environment,
        created_at,
        updated_at
      `,
    )
    .eq("id", productId)
    .eq("environment", "demo")
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load product: ${error.message}`,
    );
  }

  return data as Product | null;
}

export async function getProductByCode(
  productCode: string,
): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        product_code,
        item_id,
        name,
        description,
        selling_unit,
        selling_price,
        website_visible,
        status,
        environment,
        created_at,
        updated_at
      `,
    )
    .eq("product_code", productCode)
    .eq("environment", "demo")
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load product by code: ${error.message}`,
    );
  }

  return data as Product | null;
}