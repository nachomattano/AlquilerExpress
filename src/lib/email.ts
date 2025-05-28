import { Resend } from 'resend'

const resend = new Resend('re_iY8U9Sk2_BF6B3YANFZBjBFJtNWenkUr4')

export async function sendVerificationEmail(to: string, code: string) {
  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev', // o un dominio verificado por Resend
    to,
    subject: 'Tu código de verificación',
    html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`
  })

  if (error) {
    console.error("Error al enviar correo:", error)
    throw new Error('No se pudo enviar el correo')
  }
}