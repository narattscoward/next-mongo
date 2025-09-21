import Product from "@/models/Product";

export async function GET() {
  return Response.json(await Product.find());
}

export async function POST(request) {
  const body = await request.json();

  // ✅ map categoryId (from client) to category (schema)
  const product = new Product({
    code: body.code,
    name: body.name,
    description: body.description,
    price: body.price,
    category: body.categoryId || body.category   // handle either key
  });

  await product.save();
  return Response.json(product);
}

export async function PUT(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
  return Response.json(product);
}

export async function PATCH(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
  return Response.json(product);
}