'use client'
import React from 'react'
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";

import { GiPadlock } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { RegisterSchema, registerSchema } from '@/lib/registerSchema';
import { zodResolver } from "@hookform/resolvers/zod";
const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched'
      });
      const onSubmit = (data: RegisterSchema) => {
        console.log(data);
      };
      return (
        <Card className="w-2/5 mx-auto ">
          <CardHeader
            className="flex flex-col items-center
           justify-center"
          >
            <div className="flex flex-col gap-2 items-center text-secondary">
              <div className="flex flex-row items-center gap-3">
                <GiPadlock size={30} />
                <h1 className="text-3xl font-semibold">Login</h1>
              </div>
              <p className="text-neutral-500">Welcome to Matchhy</p>
            </div>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button
                  disabled={isValid}
                  fullWidth
                  color="secondary"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      );
}

export default RegisterForm