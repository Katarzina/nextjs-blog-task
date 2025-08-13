'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPostAction } from '@/app/actions/posts'
import { useNotification } from '@/contexts/NotificationContext'
import { Label } from '@/components/ui/Label'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { SubmitButton } from '@/components/ui/SubmitButton'

export function PostForm() {
  const [state, formAction] = useActionState(createPostAction, null)
  const router = useRouter()
  const { showSuccess, showError } = useNotification()
  
  // Handle success state
  useEffect(() => {
    if (state?.success) {
      showSuccess('Článek byl úspěšně odeslán!')
      // Redirect after 2 seconds
      const timer = setTimeout(() => {
        router.push('/')
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [state?.success, router, showSuccess])
  
  // Handle error state
  useEffect(() => {
    if (state?.error) {
      showError(state.error)
    }
  }, [state?.error, showError])
  
  return (
    <form action={formAction} className="w-full max-w-md space-y-6" aria-label="Formulář pro vytvoření nového článku">
      
      {/* Title field */}
      <div>
        <Label htmlFor="title" required>
          Titulek
        </Label>
        <Input
          type="text"
          id="title"
          name="title"
          defaultValue={state?.formData?.title || ''}
          aria-describedby={state?.fieldErrors?.title ? "title-error" : undefined}
          aria-invalid={state?.fieldErrors?.title ? true : false}
          aria-required="true"
          error={!!state?.fieldErrors?.title}
        />
        <ErrorMessage 
          id="title-error" 
          error={state?.fieldErrors?.title} 
        />
      </div>
      
      {/* Content field */}
      <div>
        <Label htmlFor="content" required>
          Obsah
        </Label>
        <Textarea
          id="content"
          name="content"
          rows={5}
          defaultValue={state?.formData?.content || ''}
          aria-describedby={state?.fieldErrors?.content ? "content-error" : undefined}
          aria-invalid={state?.fieldErrors?.content ? true : false}
          aria-required="true"
          error={!!state?.fieldErrors?.content}
        />
        <ErrorMessage 
          id="content-error" 
          error={state?.fieldErrors?.content} 
        />
      </div>
      
      {/* Author field */}
      <div>
        <Label htmlFor="author" required>
          Jméno autora
        </Label>
        <Input
          type="text"
          id="author"
          name="author"
          defaultValue={state?.formData?.author || ''}
          aria-describedby={state?.fieldErrors?.author ? "author-error" : undefined}
          aria-invalid={state?.fieldErrors?.author ? true : false}
          aria-required="true"
          error={!!state?.fieldErrors?.author}
        />
        <ErrorMessage 
          id="author-error" 
          error={state?.fieldErrors?.author} 
        />
      </div>
      
      {/* Submit button */}
      <div className="pt-8">
        <SubmitButton />
      </div>
    </form>
  )
}