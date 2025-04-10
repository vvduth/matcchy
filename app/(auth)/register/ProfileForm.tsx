'use client'

import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { format, subYears } from "date-fns";
import React from "react";
import { useFormContext } from "react-hook-form";

const ProfileForm = () => {
  const {
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext();

  
  const genderList = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
]

  return (
    <div className="space-y-4">
      <Select
       defaultSelectedKeys={getValues('gender')}
        label="Gender"
        aria-label="Select gender"
        variant="bordered"
        {...register("gender")}
        isInvalid={!!errors.gender}
        onChange={e => setValue('gender', e.target.value) }
        errorMessage={errors.gender?.message as string}
      >
        {genderList.map((g) => (
            <SelectItem key={g.value}>
                {g.label}
            </SelectItem>
        ))}
      </Select>
      <Input
      max={format(subYears(new Date(), 18) , 'yyyy-MM-dd')}
        defaultValue={getValues("dateOfBirth")}
        label="Date Of Birth"
        type="date"
        variant="bordered"
        {...register("dateOfBirth")}
        isInvalid={!!errors.dateOfBirth}
        errorMessage={errors.dateOfBirth?.message as string}
      />
      <Textarea
        defaultValue={getValues("description")}
        label="Description"
        type="description"
        variant="bordered"
        {...register("description")}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message as string}
      />

      <Input
        defaultValue=""
        label="City"
        variant="bordered"
        {...register("city")}
        isInvalid={!!errors.city}
        errorMessage={errors.city?.message as string}
      />
      <Input
        defaultValue=""
        label="Country"
        variant="bordered"
        {...register("country")}
        isInvalid={!!errors.country}
        errorMessage={errors.country?.message as string}
      />
    </div>
  );
};

export default ProfileForm;
