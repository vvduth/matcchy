"use client";
import { Button, Select, SelectItem, Slider, Selection } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaMale, FaFemale } from "react-icons/fa";
const Filters = () => {
  const orderByList = [
    { label: "Last active", value: "updatedAt" },
    { label: "Newest member", value: "createdAt" },
  ];

  const gender = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedGender = searchParams.get("gender")?.split(",") || [
    "female",
    "male",
  ];

  const handleAgeSelect = (value: number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("ageRange", value.join(","));
    router.replace(`${pathName}?${params}`);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      const params = new URLSearchParams(searchParams);
      params.set("orderBy", value.values().next().value as string);
      router.replace(`${pathName}?${params}`);
    }
  };

  const handleGenderSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedGender.includes(value)) {
      params.set(
        "gender",
        selectedGender.filter((g) => g !== value).toString()
      );
    } else {
      params.set("gender", [...selectedGender, value].toString());
    }
    router.replace(`${pathName}?${params}`);

  };

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
            <Button
              key={value}
              size="sm"
              isIconOnly
              color={selectedGender.includes(value) ? "secondary" : "default"}
              onPress={() => handleGenderSelect(value)}
            >
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
            onChangeEnd={(value) => handleAgeSelect(value as number[])}
            maxValue={100}
            defaultValue={[18, 100]}
          />
        </div>
        <div className="w-1/4">
          <Select
             size="sm"
             fullWidth
             label="Order by"
             variant="bordered"
             color='secondary'
             aria-label="Sort selection"
            selectedKeys={new Set([searchParams.get("orderBy") || "updated"])}
            onSelectionChange={handleOrderSelect}
          >
            {orderByList.map((item) => (
              <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
