'use server'

export type VerifyResponse = {
  success: boolean
  challenge_ts: string
  hostname: string
  score: number
  action: string
}

const CAPTCHA_SECRET = process.env.GOOGLE_RECAPTCHA_SECRET_KEY ?? "-";
const CAPTCHA_SCORE_THRESHOLD = process.env.GOOGLE_RECAPTCHA_SCORE_THRESHOLD ?? "0.5";

async function getCaptchaSettings(headers: any) {
  const captchaSecret = CAPTCHA_SECRET;
  const captchaScoreThreshold = CAPTCHA_SCORE_THRESHOLD;

  return [captchaSecret, captchaScoreThreshold]
}

async function verifyCaptchaRequest(captchaSecret: string, captchaToken: string) {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecret}&response=${captchaToken}`,
  )

  return (await res.json()) as VerifyResponse
}

const failedResult = {
  success: false,
  message: 'captcha.failed',
  score: 0,
}

export async function verifyCaptcha(token: string): Promise<any> {
  try {

    // Verify the token against google recaptcha
    const captchaResult = await verifyCaptchaRequest(CAPTCHA_SECRET, token)

    // Give back the result
    if (captchaResult.success && captchaResult.score > Number(CAPTCHA_SCORE_THRESHOLD)) {
      return {
        success: true,
        message: 'captcha.success',
        score: captchaResult.score,
      }
    }
  } catch (err) {
    console.warn('[next/verify-captcha]: ', err)
  }

  return failedResult
}
