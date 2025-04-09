"use client";
import { createMessage } from "@/app/actions/messageAction";
import { messageSchema, MessageSchema } from "@/lib/messageSchema";
import { handleFormServerErrors } from "@/lib/util";
import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

const ChatForm = () => {
  const router = useRouter();
  const params = useParams<{ userId: string }>();

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: MessageSchema) => {
    
    const res = await createMessage(params.userId, data);
    if (res.status === "error") {
      handleFormServerErrors(res, setError);
    } else {
      reset();
      router.refresh();
      setTimeout(() => {
        setFocus("text");
      },50)
    }
  };
  useEffect(() => {
    setFocus("text");
  }, [setFocus]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
      <div className="flex items-center gap-2">
        <Input
          fullWidth
          placeholder="Type a message"
          variant="faded"
          {...register("text")}
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
        />
        <Button
          type="submit"
          isIconOnly
          color="secondary"
          radius="full"
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
        >
          <HiPaperAirplane size={18} />
        </Button>
      </div>
      <div className="flex flex-col">
        {errors.root?.serverError && (
          <p className="text-danger text-sm">
            {errors.root?.serverError.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default ChatForm;
