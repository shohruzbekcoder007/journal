import { LoginForm } from "@/components/admin/login-form"
import { translations, type Language } from "@/lib/translations"

export default function LoginPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]

  return (
    <div className="container flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{t.admin.login.title}</h1>
          <p className="text-sm text-muted-foreground">{t.admin.login.description}</p>
        </div>
        <LoginForm translations={t.admin.login} />
      </div>
    </div>
  )
}

