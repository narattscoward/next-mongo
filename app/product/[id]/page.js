import { Container, Typography } from '@mui/material'; 
export default async function ProductDetail({ params }) {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(`${API}/product/${params.id}`, { cache: 'no-store' });
  const product = await data.json();

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>{product.name}</Typography>
      <Typography>{product.description}</Typography>
      <Typography sx={{ mt: 1 }}>Price: ${product.price}</Typography>
      <Typography sx={{ mt: 1 }}>
        Category: {product.category?.name ?? 'No category'}
      </Typography>
    </Container>
  );
}