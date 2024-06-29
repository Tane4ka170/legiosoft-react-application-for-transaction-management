import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

interface FormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/dashboard");
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="username" isInvalid={!!errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <Text color="red.500">{errors.username.message}</Text>
          )}
        </FormControl>

        <FormControl id="password" mt="4" isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <Text color="red.500">{errors.password.message}</Text>
          )}
        </FormControl>

        <Button mt="6" colorScheme="blue" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
