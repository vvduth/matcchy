'use client'
import { Button, Select, SelectItem, Slider } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaMale, FaFemale } from "react-icons/fa";
const Filters = () => {
  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest member", value: "created" },
  ];

  const gender = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];
  const pathName = usePathname();
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleAgeSelect = (value: number[]) => {
    const params = new URLSearchParams(searchParams)
    params.set('ageRange', value.join(','))
    router.replace(`${pathName}?${params}`)
  }
  if (pathName !== "/members") {
    return null;
  }

  return (
    <div className="shadow-md py-2">
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="text-secondary font-semibold text-xl">result: 10</div>
        <div className="flex gap-2 items-center">
          <div>Gender: </div>
          {gender.map(({ icon: IconBase, value }) => (
            <Button key={value} size="sm" isIconOnly color="secondary">
              <IconBase size={24} />
            </Button>
          ))}
        </div>
        <div className="flex flex-row items-center gap-2 w-1/4">
          <Slider
            label="Age range"
            color="secondary"
            size="sm"
            aria-label="Slider for age selection"
            minValue={18}
            onChangeEnd={(value) =>handleAgeSelect(value as number[])}
            maxValue={100}
            defaultValue={[18, 100]}
          />
        </div>
        <div className="w-1/4">
        <Select 
            size="sm"
            fullWidth
            placeholder="Order by"
            variant="bordered"
            color="secondary"
            aria-label="Order by selector"
        >
            {orderByList.map((item) => (
                <SelectItem key={item.value} >
                    {item.label}
                </SelectItem>
            ))}
        </Select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
