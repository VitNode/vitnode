import { describe, expect, it } from "vitest";

import type { SessionApi } from "./session-api";

import {
  anonymousSession,
  signInFormResult,
  ssoCallbackResult,
  ssoLinkFormResult,
  ssoStartFeedback,
} from "./screens";

describe("signInFormResult", () => {
  it("says nothing on success, which is how the shared form knows to stand down", () => {
    expect(signInFormResult({ ok: true })).toBeUndefined();
  });

  it("renders a denial in the form", () => {
    expect(signInFormResult({ ok: false, reason: "access_denied" })).toEqual({
      message: "access_denied",
    });
  });

  it("renders anything else as the internal-error toast", () => {
    expect(signInFormResult({ ok: false, reason: "server_error" })).toEqual({
      message: "Internal Server Error",
    });
  });
});

describe("ssoStartFeedback", () => {
  it("says nothing on success - the caller has a browser to send to the provider", () => {
    expect(
      ssoStartFeedback({
        ok: true,
        url: "https://accounts.google.com/o/oauth2",
      }),
    ).toBeUndefined();
  });

  it.each(["server_error", "unknown_provider"] as const)(
    "asks the button row for a toast on %s",
    reason => {
      expect(ssoStartFeedback({ ok: false, reason })).toEqual({
        message: reason,
      });
    },
  );
});

describe("ssoCallbackResult", () => {
  it("reports no failure on success", () => {
    expect(ssoCallbackResult({ ok: true })).toEqual({});
  });

  it("keeps the one failure a visitor can act on", () => {
    expect(ssoCallbackResult({ ok: false, reason: "email_exists" })).toEqual({
      failure: "email_exists",
    });
  });

  it.each(["invalid_state", "server_error", "unknown_provider"] as const)(
    "collapses %s, which a visitor cannot act on differently",
    reason => {
      expect(ssoCallbackResult({ ok: false, reason })).toEqual({
        failure: "unknown",
      });
    },
  );
});

describe("ssoCallbackResult with a link offer", () => {
  it("hands the offer to the callback screen", () => {
    const offer = {
      email: "jan@example.com",
      hasPassword: false,
      linkToken: "t".repeat(40),
    };

    expect(
      ssoCallbackResult({ offer, ok: false, reason: "email_exists" }),
    ).toEqual({ failure: "email_exists", offer });
  });
});

describe("ssoLinkFormResult", () => {
  it("reports no failure on success", () => {
    expect(ssoLinkFormResult({ ok: true })).toBeUndefined();
  });

  it("names a wrong password", () => {
    expect(ssoLinkFormResult({ ok: false, reason: "access_denied" })).toEqual({
      message: "access_denied",
    });
  });

  it.each(["invalid_token", "already_linked"] as const)(
    "treats %s as an offer that must be restarted",
    reason => {
      expect(ssoLinkFormResult({ ok: false, reason })).toEqual({
        message: "invalid_token",
      });
    },
  );

  it.each(["server_error", "unknown_provider"] as const)(
    "collapses %s into the generic failure",
    reason => {
      expect(ssoLinkFormResult({ ok: false, reason })).toEqual({
        message: "Internal Server Error",
      });
    },
  );
});

describe("anonymousSession", () => {
  const session = {
    installation: { timezone: "Europe/Warsaw" },
    user: { email: "test@test.com", id: 1, name: "Test" },
  } as unknown as SessionApi;

  it("removes the visitor", () => {
    expect(anonymousSession(session).user).toBeNull();
  });

  it("keeps everything that describes the installation rather than the visitor", () => {
    expect(anonymousSession(session)).toEqual({
      installation: { timezone: "Europe/Warsaw" },
      user: null,
    });
  });

  it("does not mutate the session it was given", () => {
    anonymousSession(session);

    expect(session.user).not.toBeNull();
  });
});
