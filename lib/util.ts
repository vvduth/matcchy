import {differenceInYears} from 'date-fns'

export function calAge(dob: Date) {
    return differenceInYears(new Date(),dob)
}