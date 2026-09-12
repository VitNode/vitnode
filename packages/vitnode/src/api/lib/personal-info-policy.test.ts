import { describe, expect, it } from "vitest";

import { effectivePersonalInfoPolicy } from "./personal-info-policy";

describe("whether a visitor may edit their own personal information", () => {
  it("says yes when their one role allows it", () => {
    expect(
      effectivePersonalInfoPolicy([{ allowEditPersonalInfo: true }]),
    ).toEqual({ canEdit: true });
  });

  it("says no when their one role forbids it", () => {
    expect(
      effectivePersonalInfoPolicy([{ allowEditPersonalInfo: false }]),
    ).toEqual({ canEdit: false });
  });

  it("lets one role that forbids it override the rest", () => {
    // The opposite of the image rule, and deliberately so. This column defaults
    // to `true`, so under "any role grants" an administrator who switched it off
    // on one role would find it silently re-granted by every other role the
    // member happens to hold - the setting would almost never take effect.
    expect(
      effectivePersonalInfoPolicy([
        { allowEditPersonalInfo: false },
        { allowEditPersonalInfo: true },
      ]),
    ).toEqual({ canEdit: false });
  });

  it("allows it when every role the visitor holds allows it", () => {
    expect(
      effectivePersonalInfoPolicy([
        { allowEditPersonalInfo: true },
        { allowEditPersonalInfo: true },
      ]),
    ).toEqual({ canEdit: true });
  });

  it("says no when the visitor holds no role at all", () => {
    expect(effectivePersonalInfoPolicy([])).toEqual({ canEdit: false });
  });
});
