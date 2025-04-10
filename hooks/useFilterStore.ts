import { UserFilters } from "@/types"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export type FilterState = {
    filters: UserFilters;
    setFilters: (filterName: keyof FilterState['filters'], 
        value: string | number[] | string[] | boolean) => void;
}

const useFilterStore = create<FilterState>()(devtools((set) => ({
    filters: {
        ageRange: [18, 100],
        gender: ['male', 'female'],
        orderBy: 'updatedAt',
        withPhoto: true
    },
    setFilters: (filterName, value) => set(state => {
        return {
            filters: {...state.filters, [filterName]: value}
        }
    })
}), {name: 'FilterStore'})) 

export default useFilterStore;