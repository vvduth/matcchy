"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@heroui/react";
import React from "react";

const UserDetailsForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-4">
      <Input
        defaultValue=""
        label="Email"
        variant="bordered"
        {...register("email")}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message as string}
      />
      <Input
        defaultValue=""
        label="Name"
        variant="bordered"
        {...register("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message as string}
      />
      <Input
        defaultValue=""
        label="Password"
        type="password"
        variant="bordered"
        {...register("password")}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message as string}
      />
    </div>
  );
};

export default UserDetailsForm;
