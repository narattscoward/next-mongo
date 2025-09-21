'use client';

import { Box, Container, Typography, List, ListItem, Link as MLink } from '@mui/material';
import NextLink from 'next/link';

export default function Landing() {
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'grey.400',
          p: 4,
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Stock Management v1.0
        </Typography>

        <List>
          <ListItem sx={{ justifyContent: 'center' }}>
            <MLink component={NextLink} href="/product" underline="hover">
              Products
            </MLink>
          </ListItem>
          <ListItem sx={{ justifyContent: 'center' }}>
            <MLink component={NextLink} href="/category" underline="hover">
              Categories
            </MLink>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}