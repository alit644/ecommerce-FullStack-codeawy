import { Box, Flex } from "@chakra-ui/react";
import MainTitle from "../../components/MainTitle";
import { changePasswordData } from "../../data";
import FormGroup from "../../components/ui/form/FormGroup";
import MInput from "../../components/ui/MInput";
import MButton from "../../components/ui/MButton";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaChangePassword } from "../../schema";
import { useChangeUserPasswordMutation } from "../../App/services/createProfileApi";
import { toaster } from "../../components/ui/toaster";
interface IFormInput {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}
const Password = () => {
  const [changeUserPassword, { isLoading }] = useChangeUserPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schemaChangePassword),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await changeUserPassword(data).unwrap();
      toaster.success({
        title: "Password Changed",
        description: "Password changed successfully",
        duration: 2000,
      });
      reset();
    } catch (error: any) {
      toaster.error({
        title: "Password Change Failed",
        description: error.data.error.message,
        duration: 2000,
      });
    }
  };

  const renderInputs = changePasswordData.map((input) => (
    <FormGroup
      key={input.id}
      label={input.label}
      htmlFor={input.id}
      error={errors[input.name]?.message}
    >
      <MInput
        {...register(input.name)}
        id={input.id}
        type={input.type}
        placeholder={input.placeholder}
      />
    </FormGroup>
  ));
  return (
    <Box w={{ base: "full", lg: "80%" }}>
      <Flex
        direction={"row"}
        alignItems="center"
        w={"full"}
        justifyContent="space-between"
      >
        <MainTitle title="Change Password" isArrow={false} />
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box spaceY={2}>{renderInputs}</Box>
        <MButton
          loadingText="Changing..."
          loading={isLoading}
          type="submit"
          title="Change Password"
          size="md"
          variant="solid"
          w="full"
          mt={6}
        />
      </form>
    </Box>
  );
};

export default Password;
