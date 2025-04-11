"use client";
import { generateResetPasswordEmail, resetPassword } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import { ActionResult } from "@/types";
import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { Button, Input } from "@heroui/react";
import ResultMessage from "@/components/ResultMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema, resetPasswordSchema } from "@/lib/forgotPasswordSchema";
import { useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
    const searchParams = useSearchParams()
  const [result, setResult] = useState<ActionResult<string> | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<ResetPasswordSchema>({
    mode: "onTouched",
    resolver: zodResolver(resetPasswordSchema),
  });
  const onSubmit = async (data: ResetPasswordSchema) => {
    setResult(await resetPassword(data.password,searchParams.get('token')));
    reset();
  };

  return (
    <CardWrapper
      headerIcon={GiPadlock}
      headerText="Reset password"
      subHeaderText="Enter your new password below"
      body={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <Input
            type="password"
            label="Password"
            variant="bordered"
            defaultValue=""
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message as string}
          />
          <Input
            type="password"
            label="Confirm password"
            variant="bordered"
            defaultValue=""
            {...register("confirmPassword")}
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message as string}
          />
          <Button
            type="submit"
            color="secondary"
            isLoading={isSubmitting}
            isDisabled={!isValid}
          >
            Reset password
          </Button>
        </form>
      }
      footer={<ResultMessage result={result} />}
    />
  );
};

export default ResetPasswordForm;
