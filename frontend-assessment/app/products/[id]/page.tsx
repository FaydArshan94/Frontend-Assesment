"use client";

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  CardMedia,
  Paper,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../lib/api";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button variant="outlined" onClick={() => router.push("/products")}>
        ← Back to Products
      </Button>

      <Paper sx={{ mt: 3, p: 4, borderRadius: 3 }}>
        <Grid container spacing={4}>
          {/* Image */}
          <Grid item xs={12} md={5}>
            <CardMedia
              component="img"
              image={product.thumbnail}
              alt={product.title}
              sx={{
                width: "100%",
                height: 350,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={7}>
            <Stack spacing={2}>
              <Typography variant="h4" fontWeight="bold">
                {product.title}
              </Typography>

              <Typography color="text.secondary">
                Category: {product.category}
              </Typography>

              <Typography variant="body1">
                {product.description}
              </Typography>

              <Typography
                variant="h5"
                color="primary"
                fontWeight="bold"
              >
                ₹ {product.price}
              </Typography>

              <Typography>
                ⭐ {product.rating} / 5
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
