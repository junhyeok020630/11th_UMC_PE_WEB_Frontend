import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";

const DEFAULT_LOGIN_FORM = {
  email: "",
  password: "",
};

type LoginFormKey = keyof typeof DEFAULT_LOGIN_FORM;

const labelClassName =
  "m-0 text-[13px] leading-4 font-extrabold text-[#17191e]";
const fieldClassName =
  "flex min-h-12 w-full items-center gap-1 rounded-lg border border-[#e3e6eb] bg-white px-[13px] py-[14px] focus-within:border-[#2563eb]";
const inputClassName =
  "min-w-0 flex-1 border-0 bg-transparent px-0.5 py-px text-sm leading-[17px] text-[#17191e] outline-none placeholder:text-[#969da8]";

export function LoginPage() {
  const [form, setForm] = useState(DEFAULT_LOGIN_FORM);

  const handleChangeField = (key: LoginFormKey, value: string) => {
    setForm((previousForm) => ({
      ...previousForm,
      [key]: value,
    }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="flex w-full flex-1 items-center justify-center px-6 py-16">
      <form
        className="flex w-full max-w-[430px] flex-col items-start gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="m-0 w-full text-[34px] leading-[41px] font-bold tracking-[-1.53px] text-[#17191e]">
          로그인
        </h1>

        <div className="flex w-full flex-col items-start gap-2">
          <label className={labelClassName} htmlFor="login-email">
            이메일
          </label>
          <div className={fieldClassName}>
            <img className="size-4 shrink-0" src="/icons/mail.svg" alt="" />
            <input
              className={inputClassName}
              id="login-email"
              type="email"
              value={form.email}
              placeholder="name@example.com"
              onChange={(event) =>
                handleChangeField("email", event.target.value)
              }
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <label className={labelClassName} htmlFor="login-password">
            비밀번호
          </label>
          <div className={fieldClassName}>
            <img className="size-4 shrink-0" src="/icons/lock.svg" alt="" />
            <input
              className={inputClassName}
              id="login-password"
              type="password"
              value={form.password}
              placeholder="비밀번호"
              onChange={(event) =>
                handleChangeField("password", event.target.value)
              }
            />
          </div>
        </div>

        <button
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-white bg-[#2563eb] px-4 text-sm leading-normal font-extrabold text-white"
          type="submit"
        >
          로그인
        </button>

        <p className="m-0 flex w-full items-end justify-center pt-[5px] text-[13px] leading-4 text-[#606774]">
          처음이신가요?&nbsp;
          <Link
            className="text-xs leading-[14px] font-extrabold text-[#2563eb] no-underline"
            to="/signup"
          >
            회원가입
          </Link>
        </p>
      </form>
    </main>
  );
}
