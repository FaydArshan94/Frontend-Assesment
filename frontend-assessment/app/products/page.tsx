"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  CircularProgress,
  Box,
  TextField,
  Pagination,
  Stack,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductsStore } from "../store/productsStore";
import Link from "next/link";

export default function ProductsPage() {
  const {
    products,
    loading,
    fetchProducts,
    searchProducts,
    setPage,
    total,
    limit,
    skip,
    resetProducts,
  } = useProductsStore();

  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchProducts(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    fetchProducts(); // reset to full list
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Button
        onClick={() => {
          setSearchTerm("");
          resetProducts();
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Products
        </Typography>
      </Button>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={!searchTerm.trim()}
        >
          Search
        </Button>

        <Button variant="outlined" onClick={handleClear} disabled={!searchTerm}>
          Clear
        </Button>
      </Box>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <CardMedia
                component="img"
                image={product.thumbnail}
                alt={product.title}
                sx={{
                  height: 200,
                  width: "fit-content",
                  objectFit: "cover",
                }}
              />

              <CardContent>
                <Typography variant="h6" sx={{ maxWidth: "50%" }} noWrap>
                  {product.title}
                </Typography>
                <Typography color="primary" fontWeight="bold">
                  ₹ {product.price}
                </Typography>
                <Typography variant="body2">
                  ⭐ {product.rating} • {product.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack alignItems="center" mt={4}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={skip / limit + 1}
          onChange={(_, page) => setPage((page - 1) * limit)}
          color="primary"
        />
      </Stack>
    </Container>
  );
}
