---

## 1️⃣ The Problem: Plain Text Storage

If you store passwords directly in your database:

```ts
// Bad idea:
{
  title: "GitHub",
  password: "mypassword123",
  url: "https://github.com"
}
```

* Anyone with DB access or who intercepts network requests can see all passwords.
* Even if your backend is hacked, all passwords are exposed.
* Violates “privacy-first” principle.

---

## 2️⃣ The Solution: Client-Side Encryption

**Client-side encryption** means:

* Encrypt passwords (and other sensitive info) **in the browser before sending them** to the server.
* Server only ever sees **encrypted blobs** — never the plaintext.
* Only the user (or the client) can decrypt them.

Benefits:

* Backend cannot see your data → reduces risk.
* User data is private even if server/database is compromised.
* Fits “privacy-first” principle.

---

## 3️⃣ How We Do It (AES-GCM + Web Crypto API)

We use **AES-GCM**, a modern symmetric encryption algorithm:

* Symmetric encryption: same key is used to **encrypt and decrypt**.
* AES-GCM is **fast**, **secure**, and supported in all modern browsers via the **Web Crypto API**.

---

### Step 1: Generate a Key from a Secret

* The user or app has a **secret** (`NEXT_PUBLIC_ENCRYPTION_KEY`)
* We hash it using **SHA-256** to get a 256-bit key (required by AES-GCM).

```ts
const secret = "my_secret_key"
const keyBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret))
const key = await crypto.subtle.importKey("raw", keyBuffer, { name: "AES-GCM" }, false, ["encrypt", "decrypt"])
```

✅ Key is now valid for AES-GCM.

---

### Step 2: Encrypt Data

* Generate a **random IV** (12 bytes recommended).
* Convert the string to **Uint8Array**.
* Encrypt using AES-GCM:

```ts
const iv = crypto.getRandomValues(new Uint8Array(12))
const encoded = new TextEncoder().encode("mypassword123")
const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded)
```

* Convert both `iv` and `encrypted` to **Base64** for storage:

```ts
const ivString = btoa(String.fromCharCode(...iv))
const cipherText = btoa(String.fromCharCode(...new Uint8Array(encrypted)))
const storedData = `${ivString}:${cipherText}`
```

* Now `storedData` can safely be sent to your backend.

---

### Step 3: Decrypt Data on Client

* Split `storedData` into IV and ciphertext.
* Convert Base64 back to `Uint8Array`.
* Use the same key to decrypt:

```ts
const [ivString, cipherText] = storedData.split(":")
const iv = Uint8Array.from(atob(ivString), c => c.charCodeAt(0))
const encrypted = Uint8Array.from(atob(cipherText), c => c.charCodeAt(0))
const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted)
const plaintext = new TextDecoder().decode(decrypted)
```

✅ Now the password is back in readable form **only in the browser**.

---

## 4️⃣ Putting It Together

**Flow in your app**:

1. User generates a password → browser encrypts it.
2. Send only the encrypted data to backend (`addToVault` API).
3. Server stores **encrypted blobs**.
4. User views vault → browser fetches encrypted blobs → decrypts using client-side key.
5. Server **never sees plaintext**, data stays private.

---

### 5️⃣ Key Points

* **AES-GCM**: symmetric, secure, fast.
* **Random IV per entry**: prevents attacks using repeated ciphertexts.
* **SHA-256 hashed key**: ensures exact 256-bit key.
* **Base64 encoding**: safe for storage and transmission.
* **Privacy-first**: server is useless without the key.

---

So, in short: **we’re encrypting everything in the browser, storing only encrypted data, and decrypting it back in the browser**, keeping user data private even from our own backend. 🔒

---
