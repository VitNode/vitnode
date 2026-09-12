import type { usersModule } from "@/api/modules/users/users.module";

import { CONFIG_PLUGIN } from "@/config";
import { clientModule } from "@/lib/fetcher-client";
import { fetcher } from "@/tanstack/fetcher";

import type {
  ChangePasswordInput,
  ChangePasswordResult,
  CompleteSsoResult,
  PasswordResetRequestInput,
  PasswordResetRequestResult,
  SignInInput,
  SignInResult,
  SignOutInput,
  SignOutResult,
  SignUpInput,
  SignUpResult,
  SsoCallbackInput,
  SsoLinkInput,
  SsoLinkResult,
  SsoStartInput,
  SsoStartResult,
} from "./contract";

import { callUsersApi, readJson, readText } from "./api-helpers";
import {
  changePasswordResultFromStatus,
  completeSsoResultFromStatus,
  isUsableSessionStatus,
  passwordResetRequestResultFromStatus,
  SESSION_UNAVAILABLE,
  signInResultFromStatus,
  signOutResultFromStatus,
  signUpResultFromStatus,
  ssoLinkResultFromStatus,
  ssoStartResultFromStatus,
} from "./contract";

const users = clientModule<typeof usersModule>(CONFIG_PLUGIN.pluginId);

export const readSessionFromApi = async () => {
  try {
    const response = await fetcher(users, {
      method: "get",
      module: "users",
      path: "/session",
    });

    if (isUsableSessionStatus(response.status)) return await response.json();

    throw new Error(`the session route answered ${response.status}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[auth] ${SESSION_UNAVAILABLE}`, error);

    // eslint-disable-next-line preserve-caught-error
    throw new Error(SESSION_UNAVAILABLE);
  }
};

const signInFromApi = async (data: SignInInput): Promise<SignInResult> => {
  const response = await callUsersApi(async () =>
    fetcher(users, {
      args: { body: data },
      method: "post",
      module: "users",
      path: "/sign_in",
    }),
  );

  if (!response) return { ok: false, reason: "server_error" };

  return signInResultFromStatus(response.status);
};

const signOutFromApi = async (data: SignOutInput): Promise<SignOutResult> => {
  const response = await callUsersApi(async () =>
    fetcher(users, {
      args: { body: { isAdmin: data.isAdmin ?? false } },
      method: "delete",
      module: "users",
      path: "/sign_out",
    }),
  );

  if (!response) return { ok: false, reason: "server_error" };

  return signOutResultFromStatus(response.status);
};

const startSsoFromApi = async (
  data: SsoStartInput,
): Promise<SsoStartResult> => {
  const response = await callUsersApi(async () =>
    fetcher(users, {
      args: { params: { providerId: data.providerId } },
      method: "post",
      module: "users/sso",
      path: "/{providerId}",
    }),
  );

  if (!response) return { ok: false, reason: "server_error" };

  if (response.status !== 200) {
    return ssoStartResultFromStatus(response.status, undefined);
  }

  const { url } = await response.json();

  return ssoStartResultFromStatus(response.status, url);
};

const completeSsoFromApi = async (
  data: SsoCallbackInput,
): Promise<CompleteSsoResult> => {
  const response = await callUsersApi(async () =>
    fetcher(users, {
      args: {
        params: { providerId: data.providerId },
        query: { code: data.code, state: data.state },
      },
      method: "get",
      module: "users/sso",
      path: "/{providerId}/callback",
    }),
  );

  if (!response) return { ok: false, reason: "server_error" };

  if (response.status === 409) {
    return completeSsoResultFromStatus(409, await readJson(response));
  }

  return completeSsoResultFromStatus(response.status);
};

const linkSsoFromApi = async (data: SsoLinkInput): Promise<SsoLinkResult> => {
  const response = await callUsersApi(async () =>
    fetcher(users, {
      args: {
        body: { password: data.password, token: data.token },
        params: { providerId: data.providerId },
      },
      method: "post",
      module: "users/sso",
      path: "/{providerId}/link",
    }),
  );

  if (!response) return { ok: false, reason: "server_error" };

  return ssoLinkResultFromStatus(response.status);
};

const signUpFromApi = async ({
  captchaToken,
  ...body
}: SignUpInput): Promise<SignUpResult> => {
  const response = await callUsersApi(async () =>
    fetcher(users, {
      captchaToken,
      args: { body },
      method: "post",
      module: "users",
      path: "/sign_up",
    }),
  );

  if (!response) return { ok: false, reason: "server_error" };

  if (response.status === 201) {
    return signUpResultFromStatus(201, { body: await readJson(response) });
  }

  if (response.status === 409) {
    return signUpResultFromStatus(409, { conflict: await readText(response) });
  }

  return signUpResultFromStatus(response.status);
};

const requestPasswordResetFromApi = async ({
  captchaToken,
  email,
}: PasswordResetRequestInput): Promise<PasswordResetRequestResult> => {
  const response = await callUsersApi(async () =>
    fetcher(users, {
      captchaToken,
      args: { body: { email } },
      method: "post",
      module: "users",
      path: "/reset-password",
    }),
  );

  if (!response) return { ok: false, reason: "server_error" };

  return passwordResetRequestResultFromStatus(response.status);
};

const changePasswordFromResetFromApi = async (
  data: ChangePasswordInput,
): Promise<ChangePasswordResult> => {
  const response = await callUsersApi(async () =>
    fetcher(users, {
      args: { body: data },
      method: "post",
      module: "users",
      path: "/change-password",
    }),
  );

  if (!response) return { ok: false, reason: "server_error" };

  return changePasswordResultFromStatus(response.status);
};

export const defaultAuthTransport = {
  changePasswordFromReset: changePasswordFromResetFromApi,
  completeSso: completeSsoFromApi,
  linkSso: linkSsoFromApi,
  readSession: readSessionFromApi,
  requestPasswordReset: requestPasswordResetFromApi,
  signIn: signInFromApi,
  signOut: signOutFromApi,
  signUp: signUpFromApi,
  startSso: startSsoFromApi,
};
