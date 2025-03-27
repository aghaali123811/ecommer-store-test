"use client";
import { useRouter } from "next/router";
import { useGetProductByIdQuery } from "../store/productsApi";
import { Card, Button, Spin } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) return <Spin size="large" />;

  return (
    <Card title={product.title}>
      <img src={product.image} alt={product.title} className="h-80 mx-auto" />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <Button onClick={() => dispatch(addToCart(product))}>Add to Cart</Button>
    </Card>
  );
}
