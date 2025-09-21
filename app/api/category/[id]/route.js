import Category from "@/models/Category";

// GET /api/category/:id
export async function GET(_req, { params }) {
  const { id } = params;
  const category = await Category.findById(id);

  if (!category) {
    return new Response("Category not found", { status: 404 });
  }

  return Response.json(category);
}

// DELETE /api/category/:id
export async function DELETE(_req, { params }) {
  const { id } = params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return new Response("Category not found", { status: 404 });
  }

  return new Response(null, { status: 204 }); // 204 = no content
}