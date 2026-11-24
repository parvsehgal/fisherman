<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const email = ref("");

const password = ref("");
const error = ref("");
const loading = ref(false);

async function handleSubmit() {
  error.value = "";

  if (!email.value || !password.value) {
    error.value = "Enter your email and password.";
    return;
  }

  loading.value = true;
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: email.value, password: password.value }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Could not sign you in.");
    } else {
      // the response is valid so redirect to dashboard
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
  <section class="login">
    <h1 class="title">Welcome back</h1>
    <p class="subtitle">Sign in to manage your webhooks.</p>

    <form class="form" @submit.prevent="handleSubmit">
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
          autocomplete="current-password"
          required
        />
      </label>

      <p class="error" role="alert" aria-live="polite">{{ error }}</p>

      <button class="submit" type="submit" :disabled="loading">
        {{ loading ? "Signing in…" : "Sign in" }}
      </button>
    </form>

    <p class="alt">
      Don't have an account?
      <RouterLink to="/register">Sign up</RouterLink>
    </p>
  </section>
</template>

<style scoped>
.login {
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
