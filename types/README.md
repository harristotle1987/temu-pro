Why there was a `next-auth` augmentation
=========================================

Historically this project added a global augmentation that allowed the `signUp` key
on NextAuth's `PagesOptions`. The upstream NextAuth types expect the key
`newUser` for redirecting newly-registered users. The augmentation allowed
`signUp` as an alias so existing code could continue to use that name.

Why we removed it
------------------

Keeping a global augmentation can hide mismatches with upstream types and cause
surprises when upgrading NextAuth. We prefer to use the canonical `newUser`
key everywhere in the codebase to remain aligned with the library's public API.

If you have a compelling reason to reintroduce the alias, prefer a small,
localized type helper (or a single file with explicit comments) instead of a
global augmentation.
