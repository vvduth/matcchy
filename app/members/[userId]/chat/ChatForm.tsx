'use client'
import { messageSchema, MessageSchema } from '@/lib/messageSchema'
import { Button, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HiPaperAirplane } from 'react-icons/hi2'

const ChatForm = () => {

    const router = useRouter()

    const {register, handleSubmit, reset, formState: {
        isSubmitting, isValid, errors
    }} = useForm<MessageSchema>({
        resolver: zodResolver(messageSchema)
    })

    const onSubmit = async (data: MessageSchema) => { 
        console.log(data)

    }

  return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex items-center gap-2'
    >
        <Input fullWidth 
        placeholder='Type a message'
        variant='faded' 
        {...register('text')}
        isInvalid={!!errors.text}
        errorMessage={errors.text?.message}
        />
        <Button
            type='submit'
            isIconOnly
            color='secondary'
            radius='full'
            isLoading={isSubmitting}
            isDisabled={!isValid || isSubmitting}
        >
            <HiPaperAirplane size={18} />
        </Button>
    </form>
  )
}

export default ChatForm