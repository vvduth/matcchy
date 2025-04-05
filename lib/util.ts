import {differenceInYears} from 'date-fns'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { ZodIssue } from 'zod'

export function calAge(dob: Date) {
    return differenceInYears(new Date(),dob)
}
export function handleFormServerErrors<TFieldValues extends FieldValues>(
    errorResponse: {error: string | ZodIssue[]},
    setError: UseFormSetError<TFieldValues>
) {
    if (Array.isArray(errorResponse.error)) {
        errorResponse.error.forEach((e) => {
            const fieldName = e.path.join('.') as Path<TFieldValues>;
            setError(fieldName, {message: e.message});
        })
    } else {
        setError('root.serverError', {message: errorResponse.error});
    }
}


export function transformImgUrl(imageUrl: string | null) {
    if (!imageUrl) return null 

    if (!imageUrl.includes('cloudinary')) return imageUrl

    const uploadIndex = imageUrl.indexOf('/upload/') + '/upload/'.length;

    const transformation = 'c_fill,h_300,w_300,g_faces/';

    return `${imageUrl.slice(0, uploadIndex)}${transformation}${imageUrl.slice(uploadIndex)}`
}