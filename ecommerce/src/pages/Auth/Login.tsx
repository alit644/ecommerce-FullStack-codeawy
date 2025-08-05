import {
  Box,
  VStack,
  Heading,
  Input,
  Field,
  Text,
} from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../../schema";
import { LOGIN_FORM } from "../../data";
import { useAppDispatch, useAppSelector } from "../../App/store";
import { loginUser } from "../../App/features/loginSlice";
import { Toaster, toaster } from "../../components/ui/toaster";
import MButton from "../../components/ui/Button";
import cookieManager from "../../utils/cookieManager";

export interface IFormInput {
  identifier: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.login);

  // GET /api/connect/google

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaLogin),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const resultAction = await dispatch(loginUser(data));
    //! Toaster
    if (loginUser.fulfilled.match(resultAction)) {
      // dispatch(login(resultAction.payload)); //تحديث حالة المصادقة
      cookieManager.set("jwt", resultAction.payload.jwt, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      });
      cookieManager.set("user", resultAction.payload.user);
      toaster.success({
        title: "Login successful",
        description: "You have successfully logged in",
        duration: 2000,
        type: "success",
      });
      window.location.reload();
    } else if (loginUser.rejected.match(resultAction)) {
      const mss = resultAction.payload as string;
      toaster.error({
        title: "Login failed",
        description: mss,
        duration: 3000,
        type: "error",
      });
    }
  };

  //! Render Input Form
  const renderInputForm = LOGIN_FORM.map((input) => {
    return (
      <Field.Root key={input.id} id={input.id}>
        <Field.Label>{input.label}</Field.Label>
        <Input
          {...register(input.name, input.validation)}
          type={input.type}
          placeholder={input.placeholder}
        />
        {errors[input.name] && (
          <Field.HelperText
            color={"red.500"}
            fontWeight={"bold"}
            fontSize={"md"}
          >
            {errors[input.name]?.message}
          </Field.HelperText>
        )}
      </Field.Root>
    );
  });

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={"gray.50"}
    >
      <Toaster />
      <Box
        p={8}
        maxW="400px"
        w="full"
        bg={"white"}
        boxShadow={"lg"}
        rounded="lg"
      >
        <VStack spaceY={4}>
          <Heading size="lg" color={"gray.800"}>
            Sign In
          </Heading>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {renderInputForm}

            <MButton
              colorScheme="brand"
              type="submit"
              size="lg"
              title="Sign In"
              variant="solid"
              isLoading={isLoading}
            />
          </form>

          <Link to="/register">
            <Text textAlign="center">
              Don't have an account?{" "}
              <Text as="span" color={"blue.500"} colorScheme="brand">
                Sign Up
              </Text>
            </Text>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
