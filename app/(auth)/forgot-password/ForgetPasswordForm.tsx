"use client";
import { generateResetPasswordEmail } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import { ActionResult } from "@/types";
import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { Button, Input } from "@heroui/react";
import ResultMessage from "@/components/ResultMessage";

const ForgetPasswordForm = () => {
  const [result, setResult] = useState<ActionResult<string> | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm();
  const onSubmit = async (data: FieldValues) => {
    setResult(await generateResetPasswordEmail(data.email));
    reset();
  };

  return (
    <CardWrapper
      headerIcon={GiPadlock}
      headerText="ForgetPassword"
      body={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <Input
            type="email"
            label="Email address"
            variant="bordered"
            defaultValue=""
            {...register("email", { required: true })}
          />
          <Button
            type="submit"
            color="secondary"
            isLoading={isSubmitting}
            isDisabled={!isValid}
          >
            Send reset email
          </Button>
        </form>
      }
      footer={
        <ResultMessage result={result} />
    }
      subHeaderText="Please enter your email and we will send will a link to reset your password"
    />
  );
};

export default ForgetPasswordForm;
