import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaMale, FaFemale } from "react-icons/fa";
import useFilterStore from "./useFilterStore";
import { useEffect, useTransition } from "react";
import { Selection } from "@heroui/react";
import usePaginationStore from "./usePaginationStore";
export const useFilters = () => {
  const orderByList = [
    { label: "Last active", value: "updatedAt" },
    { label: "Newest member", value: "createdAt" },
  ];

  const genderList = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition()
  

  const { filters, setFilters } = useFilterStore();
  const pageNumber = usePaginationStore(state => state.pagination.pageNumber)
  const pageSize = usePaginationStore(state => state.pagination.pageSize)

  const { gender, ageRange, orderBy } = filters;
  console.log(gender)

  useEffect(() => {
    startTransition(() => {
      const searchParams = new URLSearchParams();

      if (gender) searchParams.set('gender', gender.join(','));
      if (ageRange) searchParams.set("ageRange", ageRange.toString());
      if (orderBy) searchParams.set("orderBy", orderBy);
      if (pageSize ) searchParams.set("pageSize",pageSize.toString())
      if (pageNumber ) searchParams.set("pageNumber",pageNumber.toString())

  
      router.replace(`${pathName}?${searchParams}`);
    })
    
  }, [ageRange, gender, pageSize, pageNumber,orderBy, pathName, router]);

  const handleAgeSelect = (value: number[]) => {
    setFilters('ageRange', value)
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      setFilters('orderBy',value.values().next().value as string)
    }
  };

  const handleGenderSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (gender.includes(value)) {
      setFilters(
        "gender",
        gender.filter((g) => g !== value)
      );
    } else {
      setFilters("gender", [...gender, value]);
    }
    router.replace(`${pathName}?${params}`);
  };

  return {
    orderByList,
    genderList,
    filters,
    isPending,
    selectAge:  handleAgeSelect,
    selectGender: handleGenderSelect,
    selectOrder: handleOrderSelect
  }
};
