import {
  ArgumentsType,
  Mock,
  afterAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ApiResponse } from "./semanticBrowseSchemas";
import {
  FetchError,
  getFieldErrors,
  renderError,
  semanticBrowseFetch,
  setFormErrors,
} from "./semanticBrowseFetcher";

vi.stubGlobal("fetch", vi.fn());
fetch;
afterAll(() => {
  vi.unstubAllGlobals();
});

const createResponse = (status: number, val: ApiResponse) =>
  ({
    ok: status < 400,
    status,
    headers: {
      get: vi.fn().mockReturnValue("application/json"),
    },
    json() {
      return Promise.resolve(val);
    },
  }) as unknown as Response;

const fetchMock = fetch as unknown as Mock<
  ArgumentsType<typeof fetch>,
  ReturnType<typeof fetch>
>;

describe("API Fetcher", () => {
  describe("on error", () => {
    it("should forward an API error", () => {
      fetchMock.mockResolvedValueOnce(
        createResponse(200, {
          status: 400,
          errors: [
            {
              message: "Bad request",
            },
          ],
        }),
      );

      expect(
        semanticBrowseFetch({
          url: "/api/v1/hello",
          method: "GET",
          body: {},
        }),
      ).to.rejects.toMatchObject({
        status: 400,
        payload: {
          status: 400,
          errors: [
            {
              message: "Bad request",
            },
          ],
        },
      });
    });

    it("should handle an error HTTP status code", () => {
      fetchMock.mockResolvedValueOnce(
        createResponse(500, {
          status: 500,
          errors: [
            {
              message: "Internal server error",
            },
          ],
        }),
      );

      expect(
        semanticBrowseFetch({
          url: "/api/v1/hello",
          method: "GET",
          body: {},
        }),
      ).to.rejects.toMatchObject({
        status: 500,
        payload: {
          status: 500,
          errors: [
            {
              message: "Internal server error",
            },
          ],
        },
      });
    });

    it("should handle a rejection when fetching", () => {
      fetchMock.mockRejectedValueOnce(new Error("Network error"));

      expect(
        semanticBrowseFetch({
          url: "/api/v1/hello",
          method: "GET",
          body: {},
        }),
      ).to.rejects.toMatchObject({
        status: 500,
        errors: [
          {
            message: expect.stringContaining("Network error"),
          },
        ],
      });
    });
  });

  describe("on success", () => {
    it("should return the data", async () => {
      fetchMock.mockResolvedValueOnce(
        createResponse(200, {
          status: 200,
          data: {
            hello: "world",
          },
        }),
      );

      expect(
        await semanticBrowseFetch({
          url: "/api/v1/hello",
          method: "GET",
          body: {},
        }),
      ).toEqual({
        status: 200,
        data: {
          hello: "world",
        },
      });
    });

    it("should accept 201 Created status", () => {
      fetchMock.mockResolvedValueOnce(
        createResponse(201, {
          status: 201,
          data: {
            hello: "world",
          },
        }),
      );

      expect(
        semanticBrowseFetch({
          url: "/api/v1/hello",
          method: "GET",
          body: {},
        }),
      ).resolves.toEqual({
        status: 201,
        data: {
          hello: "world",
        },
      });
    });
  });

  describe("fetch call", () => {
    it("should call fetch with the right arguments", async () => {
      fetchMock.mockResolvedValueOnce(
        createResponse(200, {
          status: 200,
          data: {
            hello: "world",
          },
        }),
      );

      await semanticBrowseFetch({
        url: "/hello",
        method: "GET",
        body: {},
      });

      expect(fetch).toHaveBeenCalledWith(
        "/api/v1/hello",
        expect.objectContaining({
          method: "GET",
          body: "{}",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );
    });
  });
});

const simpleError = {
  status: 400,
  payload: {
    status: 400,
    errors: [
      {
        message: "Bad request",
      },
    ],
  },
} satisfies FetchError;

const multipleErrors = {
  status: 400,
  payload: {
    status: 400,
    errors: [
      {
        message: "Bad request",
      },
      {
        message: "Invalid email",
      },
    ],
  },
} satisfies FetchError;

const formError = {
  status: 400,
  payload: {
    status: 400,
    errors: [
      {
        message: "Invalid email",
        field: "email",
      },
      {
        message: "Password too short",
        field: "password",
      },
    ],
  },
} satisfies FetchError;

const allErrors = {
  status: 400,
  payload: {
    status: 400,
    errors: [
      {
        message: "Bad request",
      },
      {
        message: "Invalid email",
        field: "email",
      },
      {
        message: "Password too short",
        field: "password",
      },
    ],
  },
} satisfies FetchError;

const emptyError = {
  status: 400,
  payload: {
    status: 400,
    errors: [],
  },
} satisfies FetchError;

describe("renderErrors", () => {
  it("should not throw ", () => {
    renderError(simpleError);
  });

  it("should render general errors", () => {
    expect(renderError(simpleError)).toEqual("Bad request");
  });

  it("should render multiple errors", () => {
    expect(renderError(multipleErrors)).toEqual("Bad request\nInvalid email");
  });

  it("should render form errors when there are general errors", () => {
    expect(renderError(allErrors)).toEqual(
      "Bad request\n\nField errors:\nemail: Invalid email\npassword: Password too short",
    );
  });

  it("should render form errors", () => {
    expect(renderError(formError)).toEqual(
      "Field errors:\nemail: Invalid email\npassword: Password too short",
    );
  });
});

describe("getFieldErrors", () => {
  it("should not return general errors", () => {
    expect(getFieldErrors(simpleError)).toEqual({});
  });

  it("should return field errors", () => {
    expect(getFieldErrors(formError)).toEqual({
      email: "Invalid email",
      password: "Password too short",
    });
  });
});

// export const setFormErrors = <T extends FieldValues>(
//   error: FetchError,
//   setError: UseFormSetError<T>,
// ) => {
//   const fieldErrors = Object.entries(getFieldErrors(error));

//   fieldErrors.forEach(([field, message]) => {
//     setError(field as FieldPath<T>, { message });
//   });

//   const hasGeneralError = !!error?.payload?.errors?.filter((e) => !e.field)
//     ?.length;
//   if (hasGeneralError || !fieldErrors.length) {
//     setError("root.serverError", { message: renderError(error, true) });
//   }
// };
describe("setFormErrors", () => {
  it("should set general errors", () => {
    const setError = vi.fn();

    setFormErrors(simpleError, setError);

    expect(setError).toHaveBeenCalledWith("root.serverError", {
      message: "Bad request",
    });
  });

  it("should set field errors", () => {
    const setError = vi.fn();

    setFormErrors(formError, setError);

    expect(setError).toHaveBeenCalledWith("email", {
      message: "Invalid email",
    });
    expect(setError).toHaveBeenCalledWith("password", {
      message: "Password too short",
    });
  });

  it("should set general errors when there are field errors", () => {
    const setError = vi.fn();

    setFormErrors(allErrors, setError);

    expect(setError).toHaveBeenCalledWith("email", {
      message: "Invalid email",
    });
    expect(setError).toHaveBeenCalledWith("password", {
      message: "Password too short",
    });
    expect(setError).toHaveBeenCalledWith("root.serverError", {
      message: "Bad request",
    });
  });

  it("should set serverError to unknown error when no errors are available", () => {
    const setError = vi.fn();

    setFormErrors(emptyError, setError);

    expect(setError).toHaveBeenCalledWith("root.serverError", {
      message: expect.stringContaining("Unknown error"),
    });
  });

  it("should not set the serverError when only field errors are present", () => {
    const setError = vi.fn();

    setFormErrors(formError, setError);

    expect(setError.mock.calls).toHaveLength(2);
    expect(setError).not.toHaveBeenCalledWith(
      "root.serverError",
      expect.anything(),
    );
  });
});
