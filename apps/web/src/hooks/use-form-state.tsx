import { FormEvent, useState, useTransition } from "react";

interface FormState {
    success: boolean
    message: string | null
    errors: Record<string, string[]> | null
}

export function useFormState(
    action: (data: FormData) => Promise<FormState>,
    onSuccess: () => Promise<void> | void,
    initialState?: FormState
) {
    const [isPending, startTransition] = useTransition()
    const [state, setFormState] = useState(initialState ?? {
        success: false,
        message: null,
        errors: null
    })

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        startTransition(async () => {
            const nextState = await action(formData)
            if (nextState.success && onSuccess) {
                await onSuccess()
            }
            setFormState(nextState)
        })
    }

    return [state, handleSubmit, isPending] as const
}