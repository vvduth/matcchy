"use client";
import { useFilters } from "@/hooks/useFilter";
import { Button, Select, SelectItem, Slider, Selection } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaMale, FaFemale } from "react-icons/fa";
const Filters = () => {
  const pathName = usePathname()

  const {genderList, orderByList, filters,selectAge, selectGender, selectOrder} = useFilters()
  

  return (
    <div className="shadow-md py-2">
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="text-secondary font-semibold text-xl">result: 10</div>
        <div className="flex gap-2 items-center">
          <div>Gender: </div>
          {genderList.map(({ icon: IconBase, value }) => (
            <Button
              key={value}
              size="sm"
              isIconOnly
              color={filters.gender.includes(value) ? "secondary" : "default"}
              onPress={() => selectGender(value)}
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
            onChangeEnd={(value) => selectAge(value as number[])}
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
            selectedKeys={new Set([filters.orderBy])}
            onSelectionChange={selectOrder}
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
