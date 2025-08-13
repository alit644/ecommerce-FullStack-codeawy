import { Box, Flex, HStack } from "@chakra-ui/react";
import MainTitle from "../../components/MainTitle";
import FormGroup from "../../components/ui/form/FormGroup";
import MInput from "../../components/ui/MInput";
import { checkoutData } from "../../data";
import type { ICheckoutInput, IUserInfo } from "../../interfaces";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCheckout } from "../../schema";
import MButton from "../../components/ui/MButton";
import cookieManager from "../../utils/cookieManager";
import { toaster } from "../../components/ui/toaster";
import { useEffect } from "react";
import PageLoader from "../../components/ui/PageLoader";
import {
  useCreateAddressMutation,
  useGetUserAddressQuery,
} from "../../App/services/createProfileApi";
interface IFormInput {
  streetAddress: string;
  city: string;
  state: string;
  phone: string;
  email: string;
}

const Address = () => {
  const [createAddress, { isLoading }] = useCreateAddressMutation();
  const userId = cookieManager.get<IUserInfo>("user")?.id;
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaCheckout),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await createAddress({
        address: data,
        id: userId as number,
      }).unwrap();
      toaster.success({
        title: "Address Created",
        description: "Address created successfully",
        duration: 2000,
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  //! get user address
  const { data, isLoading: isUserAddressLoading } = useGetUserAddressQuery(
    userId as number
  );

  useEffect(() => {
    if (data) {
      reset({
        streetAddress: data?.address?.streetAddress,
        city: data?.address?.city,
        state: data?.address?.state,
        phone: data?.address?.phone,
        email: data?.address?.email,
      });
    }
  }, [data]);

  const renderCheckoutData = checkoutData.map(
    (item: ICheckoutInput[], i: number) => (
      <HStack gap={4} key={i}>
        {item.map((item) => (
          <FormGroup
            key={item.id}
            label={item.label}
            htmlFor={item.id}
            error={errors[item.name]?.message}
          >
            <MInput
              {...register(item.name)}
              id={item.id}
              type={item.type}
              placeholder={item.placeholder}
            />
          </FormGroup>
        ))}
      </HStack>
    )
  );

  if (isUserAddressLoading) return <PageLoader />;

  return (
    <Box w={{ base: "full", lg: "80%" }}>
      <Flex
        direction={"row"}
        alignItems="center"
        w={"full"}
        justifyContent="space-between"
      >
        <MainTitle title="Shipping Address" isArrow={false} />
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box spaceY={4}>
          <FormGroup
            label="Street Address"
            htmlFor="streetAddress"
            error={errors.streetAddress?.message}
          >
            <MInput
              {...register("streetAddress", {
                required: "Street Address is required",
              })}
              id="streetAddress"
              type="text"
              placeholder="Street Address"
            />
          </FormGroup>
          {renderCheckoutData}
        </Box>
        <MButton
          loading={isLoading || isUserAddressLoading}
          disabled={!isDirty || isSubmitting}
          loadingText="Saving..."
          type="submit"
          title="Save Address"
          size="md"
          variant="solid"
          w="full"
          mt={6}
        />
      </form>
    </Box>
  );
};

export default Address;
