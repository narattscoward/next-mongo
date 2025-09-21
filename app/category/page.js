'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function CategoryPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const { register, handleSubmit, reset } = useForm();
  const [categoryList, setCategoryList] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'order', headerName: 'Order', width: 120 },
    {
      field: 'Action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Button
            size="small"
            onClick={() => startEditMode(params.row)}
            sx={{ minWidth: 0 }}
          >
            📝
          </Button>
          <Button
            size="small"
            onClick={() => deleteCategory(params.row)}
            sx={{ minWidth: 0, ml: 1 }}
          >
            🗑️
          </Button>
        </Box>
      ),
    },
  ];

  async function fetchCategory() {
    const res = await fetch(`${API_BASE}/category`);
    const c = await res.json();
    setCategoryList(c.map((cat) => ({ ...cat, id: cat._id })));
  }

  function startEditMode(cat) {
    reset(cat);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({ name: '', order: '' });
    setEditMode(false);
  }

  async function deleteCategory(cat) {
    if (!confirm(`Delete [${cat.name}]?`)) return;
    await fetch(`${API_BASE}/category/${cat._id}`, { method: 'DELETE' });
    fetchCategory();
  }

  function handleCategoryFormSubmit(data) {
    const method = editMode ? 'PUT' : 'POST';
    fetch(`${API_BASE}/category`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(() => {
      stopEditMode();
      fetchCategory();
    });
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Category Management
      </Typography>

      {/* Form */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          {editMode ? 'Edit Category' : 'Add New Category'}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleCategoryFormSubmit)}
          sx={{ mt: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Category Name"
                fullWidth
                {...register('name', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Order"
                type="number"
                fullWidth
                {...register('order', { required: true })}
              />
            </Grid>
            <Grid item xs={12} textAlign="right">
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
                {editMode ? 'Update' : 'Add'}
              </Button>
              {editMode && (
                <Button variant="outlined" onClick={stopEditMode}>
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Table */}
      <Paper sx={{ p: 2 }} elevation={3}>
        <DataGrid
          rows={categoryList}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10]}
        />
      </Paper>
    </Container>
  );
}