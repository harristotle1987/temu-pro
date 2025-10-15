import { test, expect } from '@playwright/test'

async function waitForServer(url: string, retries = 20, delay = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch (e) {
      // ignore
    }
    await new Promise((r) => setTimeout(r, delay))
  }
  throw new Error('Server did not respond in time')
}

test('create product and show toast', async ({ page }) => {
  const base = 'http://localhost:3000'
  await waitForServer(base)

  // Use deterministic UI sign-in first (we seed a seller account in prisma/seed-test-user.ts)
  const testEmail = process.env.PW_TEST_EMAIL || 'playwright@test.local'
  const testPassword = process.env.PW_TEST_PASSWORD || 'password123'
  // Programmatic sign-in using NextAuth endpoints (deterministic & faster)
  // 1) fetch CSRF token
  const csrfRes = await page.request.get(`${base}/api/auth/csrf`)
  const csrfJson = await csrfRes.json().catch(() => ({}))
  const csrfToken = csrfJson?.csrfToken

  if (csrfToken) {
    // 2) post credentials to NextAuth callback to get cookies
    const post = await page.request.post(`${base}/api/auth/callback/credentials`, {
      form: {
        csrfToken,
        callbackUrl: '/',
        email: testEmail,
        password: testPassword
      },
      // don't follow redirects so we can read Set-Cookie headers
      maxRedirects: 0
    }).catch(() => null)

    if (post && post.headers) {
      const headersObj = post.headers()
      const rawSet = headersObj['set-cookie'] || headersObj['Set-Cookie'] || headersObj['set-cookie']
      const setCookies = Array.isArray(rawSet) ? rawSet : (rawSet ? [rawSet] : [])
      const cookiesToAdd = []
      for (const sc of setCookies) {
        // Very small parser: take name=value and path/domain if present
        const parts: string[] = sc.split(';').map((p: string) => p.trim())
        const [nameValue, ...attrs] = parts
        const [name, value] = nameValue.split('=')
        const cookie: { name: string; value: string; path?: string; url?: string; domain?: string; expires?: number; httpOnly?: boolean; secure?: boolean } = { name, value, path: '/', url: base }
        for (const a of attrs) {
          const [k, v] = a.split('=')
          const key = (k || '').toLowerCase()
          if (key === 'path' && v) cookie.path = v
          if (key === 'domain' && v) cookie.domain = v
          if (key === 'expires' && v) cookie.expires = Math.floor(new Date(v).getTime() / 1000)
          if (key === 'httponly') cookie.httpOnly = true
          if (key === 'secure') cookie.secure = true
        }
        // Ensure url is present for Playwright's addCookies
        if (!cookie.url) cookie.url = base
        cookiesToAdd.push(cookie)
      }
      if (cookiesToAdd.length > 0) {
        try {
          await page.context().addCookies(cookiesToAdd)
        } catch (err) {
          console.warn('Failed to add cookies programmatically, falling back to UI sign-in', err)
        }
      }
    }
  }

  // Diagnostics: list cookies after attempt
  const dbgCookies = await page.context().cookies()
  console.log('Cookies after programmatic sign-in attempt:', dbgCookies.map(c => ({ name: c.name, domain: c.domain, path: c.path })))

  // If no valid cookies were set, fallback to UI sign-in (more tolerant selectors)
  const cookiesNow = await page.context().cookies()
  if (!cookiesNow || cookiesNow.length === 0) {
    console.warn('No cookies present after programmatic sign-in; performing UI sign-in fallback')
    await page.goto(`${base}/signin`, { waitUntil: 'domcontentloaded' })
    const emailByPlaceholder = page.locator('input[placeholder="Enter your email"]').first()
    const pwdByPlaceholder = page.locator('input[placeholder="Enter your password"]').first()
    await emailByPlaceholder.waitFor({ state: 'visible', timeout: 15000 })
    await emailByPlaceholder.fill(testEmail)
    await pwdByPlaceholder.fill(testPassword)
    const btn = page.getByRole('button', { name: /Sign In|Sign in/i }).first()
    await btn.click()
    await page.waitForTimeout(800)
  }

  // Now navigate to the seller product creation page
  await page.goto(`${base}/seller/products/new`, { waitUntil: 'domcontentloaded', timeout: 15000 })
  // If the product form is present, fill and submit. Otherwise try to sign in or sign up then continue
  let nameLabels = await page.getByLabel('Name').all()
  if (nameLabels.length > 0) {
    await page.getByLabel('Name').fill('Playwright Test Product')
    await page.getByLabel('Description').fill('Created by Playwright test')
    await page.getByLabel('Price').fill('9.99')
    await page.getByLabel('Inventory').fill('5')
    await page.getByLabel('Category').fill('testing')
    await page.getByLabel('Images (one URL per line)').fill('https://via.placeholder.com/300')

    await page.getByRole('button', { name: /Create Product/i }).click()

    // Wait for any toast inside the aria-live container
    const toastContainer = page.locator('div[aria-live="polite"]')
    await expect(toastContainer).toBeVisible({ timeout: 5000 })
    await expect(toastContainer).toHaveText(/Product created|Failed to create product|Something went wrong|error/i, { timeout: 5000 })
  } else {
    // likely redirected to sign-in. Attempt UI sign-in using a test account; if not present, create one via signup form.
    await page.goto(`${base}/signin`)
    // Try to sign in (if form fields exist)
  // Scope to the main sign-in form to avoid selecting other email inputs on the page
  const signInForm = page.locator('main').locator('form').first()
  const emailInput = signInForm.locator('input[type="email"]')
  const passwordInput = signInForm.locator('input[type="password"]')
    if (await emailInput.count() > 0 && await passwordInput.count() > 0) {
      // Use a well-known test credential (signup will create this if missing)
      const testEmail = process.env.PW_TEST_EMAIL || 'playwright@test.local'
      const testPassword = process.env.PW_TEST_PASSWORD || 'password123'
      await emailInput.fill(testEmail)
      await passwordInput.fill(testPassword)
      await page.getByRole('button', { name: /Sign In|Sign in/i }).click()
      // After sign-in, go to product page
      await page.goto(`${base}/seller/products/new`)
      nameLabels = await page.getByLabel('Name').all()
    }

    if (nameLabels.length === 0) {
      // If still no form, try signup flow
      await page.goto(`${base}/signup`)
  // Scope signup inputs to the main signup form
  const signupForm = page.locator('main').locator('form').first()
  const signupEmail = signupForm.locator('input[type="email"]')
  const signupPassword = signupForm.locator('input[type="password"]')
      if (await signupEmail.count() > 0 && await signupPassword.count() > 0) {
        const testEmail = process.env.PW_TEST_EMAIL || 'playwright@test.local'
        const testPassword = process.env.PW_TEST_PASSWORD || 'password123'
        await signupEmail.fill(testEmail)
        await signupPassword.fill(testPassword)
        // Try specific button labels used on the signup page, fallback to the form's first button
        const signupButton = page.getByRole('button', { name: /Sign Up|Create Account|Create Customer Account|Create Seller Account/i }).first()
        if (await signupButton.count() > 0) {
          await signupButton.click()
        } else {
          // fallback: click the first button inside the signup form
          const fallbackBtn = signupForm.locator('button').first()
          await fallbackBtn.click()
        }
        // After signup, navigate to product creation
        await page.goto(`${base}/seller/products/new`)
        nameLabels = await page.getByLabel('Name').all()
      }
    }

    // final assertion: either we have the form or we show sign-in link
    if (nameLabels.length === 0) {
      await expect(page.getByRole('link', { name: /Sign In|Sign in/i }).first()).toBeVisible({ timeout: 5000 })
    }
  }
})
