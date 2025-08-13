'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { apiRequest } from '@/lib/api'

const postSchema = z.object({
  title: z.string()
    .min(3, 'Titulek musí mít alespoň 3 znaky'),
  content: z.string()
    .min(10, 'Obsah musí mít alespoň 10 znaků'),
  author: z.string()
    .min(1, 'Jméno autora je povinné')
})

export type FormState = {
  error?: string
  fieldErrors?: Partial<Record<keyof z.infer<typeof postSchema>, string[]>>
  formData?: Partial<z.infer<typeof postSchema>>
  success?: boolean
} | null

export async function createPostAction(
  _prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    title: formData.get('title') as string || '',
    content: formData.get('content') as string || '',
    author: formData.get('author') as string || ''
  }

  const validationResult = postSchema.safeParse(rawFormData)
  
  if (!validationResult.success) {
    return {
      fieldErrors: validationResult.error.flatten().fieldErrors,
      formData: rawFormData // Preserve form values
    }
  }

  try {
    const response = await apiRequest<{ status: string }>('/posts/create', {
      method: 'POST',
      data: validationResult.data
    })

    if (response?.status !== 'CREATED') {
      return { 
        error: 'Nepodařilo se vytvořit příspěvek',
        formData: rawFormData // Preserve form values on error
      }
    }
  } catch (error) {
    console.error('Error creating post:', error)
    
    // Return user-friendly error messages
    let errorMessage = 'Nepodařilo se odeslat článek. Zkuste to prosím znovu.';
    
    if (error instanceof Error) {
      if (error.message.includes('API token')) {
        errorMessage = 'Chyba konfigurace serveru. Kontaktujte administrátora.';
      } else if (error.message.includes('připojit k serveru')) {
        errorMessage = 'Nelze se připojit k serveru. Zkontrolujte připojení k internetu.';
      } else if (error.message.includes('Chyba serveru')) {
        errorMessage = 'Server je momentálně nedostupný. Zkuste to prosím později.';
      }
    }
    
    return { 
      error: errorMessage,
      formData: rawFormData // Preserve form values on error
    }
  }

  revalidatePath('/')
  
  return {
    success: true,
    formData: { title: '', content: '', author: '' } 
  }
}