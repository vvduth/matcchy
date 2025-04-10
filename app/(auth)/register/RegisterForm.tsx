"use client";
import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";

import { GiPadlock } from "react-icons/gi";
import { FormProvider, useForm } from "react-hook-form";
import { profileSchema, RegisterSchema, registerSchema } from "@/lib/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/authActions";
import UserDetailsForm from "./UserDetailsForm";
import ProfileForm from "./ProfileForm";


const stepSchemas = [registerSchema, profileSchema]

const RegisterForm = () => {

  const [activeSteps, setActiveStep] = useState(0)
  const currentValiationSchema = stepSchemas[activeSteps]

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(currentValiationSchema),
    mode: "onTouched",
  });

  const getStepsContent = (step: number) => {
    switch(step) {
      case 0: 
        return <UserDetailsForm />
      case 1: 
        return <ProfileForm />
      default :
        return 'Unknow step'
    }
  }

  const onBackStep = () => {
    setActiveStep(prev => prev -1)
  }

  const onNextStep = async () => {
    if (activeSteps === stepSchemas.length - 1) {
      await onSubmit()
    } else {
      setActiveStep(prev => prev +1 )
    }
  }

  const {setError, handleSubmit,getValues, formState: {errors, isValid, isSubmitting}} = methods
  const onSubmit = async () => {
    console.log(getValues())
    // const result = await registerUser(data);
    // if (result.status === "success") {
    //   console.log("sucess");
    // } else {
    //   if (Array.isArray(result.error)) {
    //     result.error.forEach((e: any) => {
    //       const fieldName = e.path.join("");
    //       setError(fieldName, { message: e.message });
    //     });
    //   } else {
    //     setError("root.serverError", { message: result.error });
    //   }
    // }
  };
  return (
    <Card className="w-full md:w-2/5 mx-auto ">
      <CardHeader
        className="flex flex-col items-center
           justify-center"
      >
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">Welcome to Matchhy</p>
        </div>
      </CardHeader>
      <CardBody>
       <FormProvider {...methods}>
       <form onSubmit={handleSubmit(onNextStep)}>
          <div className="space-y-4">
            {getStepsContent(activeSteps)}
            {errors.root?.serverError && (
              <p className="text-danger text-sm">
                {errors.root?.serverError.message}
              </p>
            )}
            <div className="flex flex-row items-center gap-6">
              {activeSteps !== 0 && (
                <Button onPress={onBackStep} fullWidth>
                  Back
                </Button>
              )}
              <Button
              isDisabled={!isValid}
              isLoading={isSubmitting}
              fullWidth
              color="secondary"
              type="submit"
            >
              {activeSteps === stepSchemas.length -1  ? 'Submit': 'Next step'}
            </Button>
            </div>
            
          </div>
        </form>
       </FormProvider>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
