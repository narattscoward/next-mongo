import Product from "@/models/Product";

// GET /api/product/:id
export async function GET(_req, { params }) {
  const { id } = params;
  const product = await Product.findById(id).populate("category");

  if (!product) {
    return new Response("Product not found", { status: 404 });
  }

  return Response.json(product);
}

// DELETE /api/product/:id
export async function DELETE(_req, { params }) {
  const { id } = params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return new Response("Product not found", { status: 404 });
  }

  return new Response(null, { status: 204 });
}