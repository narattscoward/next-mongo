'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  List,
  ListItem,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NextLink from 'next/link';

export default function Products() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchAll = async () => {
    const [p, c] = await Promise.all([
      fetch(`${API}/product`).then(r => r.json()),
      fetch(`${API}/category`).then(r => r.json()),
    ]);
    setProducts(p);
    setCategories(c);
  };

  useEffect(() => { fetchAll(); }, []);

  const createProduct = async (data) => {
    await fetch(`${API}/product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    reset();
    fetchAll();
  };

  const remove = (id) => async () => {
    await fetch(`${API}/product/${id}`, { method: 'DELETE' });
    fetchAll();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>Products</Typography>

      {/* Add form */}
      <Box component="form" onSubmit={handleSubmit(createProduct)} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Code" fullWidth {...register('code', { required: true })} /></Grid>
          <Grid item xs={6}><TextField label="Name" fullWidth {...register('name', { required: true })} /></Grid>
          <Grid item xs={12}><TextField label="Description" multiline rows={2} fullWidth {...register('description', { required: true })} /></Grid>
          <Grid item xs={6}><TextField type="number" label="Price" fullWidth {...register('price', { required: true })} /></Grid>
          <Grid item xs={6}>
            <Select fullWidth displayEmpty defaultValue="" {...register('categoryId', { required: true })}>
              <MenuItem value="" disabled>Select Category</MenuItem>
              {categories.map(c => (
                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* List */}
      <Typography variant="subtitle1">Current Products ({products.length})</Typography>
      <List>
        {products.map(p => (
          <ListItem
            key={p._id}
            secondaryAction={
              <IconButton edge="end" onClick={remove(p._id)}>
                <DeleteIcon color="error" />
              </IconButton>
            }
          >
            <NextLink href={`/product/${p._id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
              {p.name}
            </NextLink>
            &nbsp;– {p.description}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}