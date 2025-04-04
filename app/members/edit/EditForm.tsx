"use client";
import { MemberEditSchema, memberEditSchema } from "@/lib/memberEditSchema";
import { Button, Input, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member } from "@prisma/client";
import { error } from "console";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateMemberProfile } from "@/app/actions/userActions";
import { handleFormServerErrors } from "@/lib/util";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
type Props = {
  member: Member;
};

const EditForm = ({ member }: Props) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting ,errors},
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  const onSubmit =async  (data: MemberEditSchema) => {
    const result = await updateMemberProfile(member.id, data);

    if (result.status === 'success' ) {
      toast.success('Profile updated successfully')
      router.refresh()
      reset({...data})
    } else {
      handleFormServerErrors(result, setError)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input 
        label="Name"
        variant="bordered"
        {...register("name")}
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea 
        label="Description"
        variant="bordered"
        {...register("description")}
        defaultValue={member.description}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={6}
      />
      <div className="flex flex-col gap-4 md:flex-row md:gap-2">
        <Input
          label="City"
          variant="bordered"
          {...register("city")}
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          label="Country"
          variant="bordered"
          {...register("country")}
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      {errors.root?.serverError && (
              <p className="text-danger text-sm">
                {errors.root?.serverError.message}
              </p>
            )}
      <Button
        type="submit"
        className="flex self-end"
        isDisabled={!isValid || !isDirty }
        isLoading={isSubmitting}
color="secondary"

      >Save</Button>
    </form>
  )
};

export default EditForm;
