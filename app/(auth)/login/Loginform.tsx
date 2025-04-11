"use client";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import React from "react";
import { GiPadlock } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "@/lib/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
const Loginform = () => {
  
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid , isSubmitting},
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched'
  });
  const onSubmit = async (data: LoginSchema) => {
    const res = await signInUser(data)
    if (res.status === 'success' ) {
      router.push('/members')
      router.refresh()
    } else {
      toast.error(res.error as string)
    }
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
          <p className="text-neutral-500">Welcome back, lonely human</p>
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
              label="Password"
              type="password"
              variant="bordered"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
            />
            <Button
              disabled={!isValid}
              fullWidth
              color="secondary"
              type="submit"
              isLoading={isSubmitting}
            >
              Login
            </Button>
            <div className="flex justify-center hover:underline text-sm">
              <Link href={'/forgot-password'}>Forgot password?</Link>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default Loginform;
