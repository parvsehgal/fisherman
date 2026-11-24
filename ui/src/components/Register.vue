<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const  username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const loading = ref(false);

async function handleSubmit() {
  error.value = "";

  if (password.value.length < 8) {
    error.value = "Password must be at least 8 characters.";
    return;
  }
  if (username.value.length < 3) {
    error.value = "Username must be at least 3 characters.";
    return;
  }
  if (username.value.length > 20) {
    error.value = "Username must be 20 characters or fewer.";
    return;
  }
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  loading.value = true;
  try {
    console.log(email.value)
    console.log(password.value)
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials:'include',
      body: JSON.stringify({ username:username.value, email: email.value, password: password.value }),
    });
    console.log(res)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Could not create your account.");
    }else{ // the response is valid and cookie is set so redirect to dashboard
      //todo redirect to dashboard
      router.push('/dashboard')
     }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="register">
    <h1 class="title">Create your account</h1>
    <p class="subtitle">Sign up to start registering webhooks.</p>

    <form class="form" @submit.prevent="handleSubmit">
      <label class="field">
        <span class="label">username</span>
        <input
          v-model.trim="username"
          type="text"
          autocomplete="username"
          minlength="8"
          required
        />
      </label>

      <label class="field">
        <span class="label">Email</span>
        <input
          v-model.trim="email"
          type="email"
          autocomplete="email"
          required
        />
      </label>

      <label class="field">
        <span class="label">Password</span>
        <input
          v-model="password"
          type="password"
          autocomplete="new-password"
          minlength="8"
          required
        />
      </label>

      <label class="field">
        <span class="label">Confirm password</span>
        <input
          v-model="confirmPassword"
          type="password"
          autocomplete="new-password"
          required
        />
      </label>

      <p class="error" role="alert" aria-live="polite">{{ error }}</p>

      <button class="submit" type="submit" :disabled="loading">
        {{ loading ? "Creating account…" : "Sign up" }}
      </button>
    </form>

    <p class="alt">
      Already have an account?
      <RouterLink to="/login">Sign in</RouterLink>
    </p>
  </section>
</template>

<style scoped>
.register {
  max-width: 26rem;
  margin: 0 auto;
}

.title {
  margin: 0 0 0.25rem;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--sky-900);
}

.subtitle {
  margin: 0 0 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 1.75rem;
  border: 1px solid var(--sky-300);
  border-radius: 0.75rem;
  background: #fff;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--sky-900);
}

input {
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--sky-300);
  border-radius: 0.5rem;
  background: var(--sky-50);
  color: var(--ink);
  font: inherit;
}

input:focus {
  border-color: var(--sky-500);
  background: #fff;
}

.error {
  min-height: 1.4em;
  margin: 0;
  font-size: 0.9rem;
  color: #b42318;
}

.submit {
  padding: 0.8rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background: var(--sky-700);
  color: #fff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.submit:hover:not(:disabled) {
  background: var(--sky-900);
}

.submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.alt {
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.95rem;
}

.alt a {
  color: var(--sky-700);
  font-weight: 600;
}
</style>
