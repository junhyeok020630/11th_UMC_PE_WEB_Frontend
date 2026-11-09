import { useState, type SubmitEvent } from "react";
import { checkEmailDuplicate } from "@/api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "@/api/members/check-nickname-duplicate";
import { signup } from "@/api/members/signup";
import { cn } from "@/utils/cn";
// import { useNavigate } from "@tanstack/react-router";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];
type DuplicateCheckKey = "email" | "nickname";

const fieldClassName =
  "flex min-h-12 w-full items-center gap-[9px] rounded-lg border border-[#e3e6eb] bg-white px-[13px] py-[14px] focus-within:border-[#2563eb]";
const inputClassName =
  "min-w-0 flex-1 border-0 bg-transparent px-0.5 py-px text-sm leading-normal text-[#17191e] outline-none placeholder:text-[#969da8]";
const labelClassName =
  "m-0 text-[13px] leading-normal font-extrabold text-[#17191e]";
const errorClassName = "m-0 text-[11px] leading-normal text-[#ef4444]";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  // const navigate = useNavigate();

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;

      setDuplicateCheck((previousCheck) => ({
        ...previousCheck,
        [key]: DEFAULT_DUPLICATE_CHECK,
      }));
    }

    setForm((previousForm) => ({
      ...previousForm,
      [key]: value,
    }));
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";
    setDuplicateCheck((previousCheck) => ({
      ...previousCheck,
      [key]: { isChecking: true, isAvailable: false },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());
      const isAvailable = response.available;

      setDuplicateCheck((previousCheck) => ({
        ...previousCheck,
        [key]: { ...previousCheck[key], isAvailable },
      }));
      alert(
        isAvailable
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
    } catch {
      setDuplicateCheck((previousCheck) => ({
        ...previousCheck,
        [key]: { ...previousCheck[key], isAvailable: false },
      }));
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((previousCheck) => ({
        ...previousCheck,
        [key]: { ...previousCheck[key], isChecking: false },
      }));
    }
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });
      alert(response.message);
      // 로그인 페이지 연결 후 주석 해제
      // navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex w-full flex-1 items-center justify-center px-6 py-16">
      <form
        className="flex w-full max-w-[430px] flex-col items-start gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="m-0 w-full text-[34px] leading-normal font-bold tracking-[-1.53px] text-[#17191e]">
          회원가입
        </h1>

        <div className="flex w-full flex-col items-start gap-2">
          <label className={labelClassName} htmlFor="signup-email">
            이메일
          </label>
          <div className={fieldClassName}>
            <input
              className={inputClassName}
              id="signup-email"
              type="email"
              value={form.email}
              placeholder="name@example.com"
              aria-invalid={showEmailError}
              aria-describedby={showEmailError ? "signup-email-error" : undefined}
              disabled={duplicateCheck.email.isChecking}
              onChange={(event) => handleChangeField("email", event.target.value)}
            />
            <button
              className="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-[13px] leading-normal font-extrabold text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              disabled={!isEmailValid || duplicateCheck.email.isChecking}
              onClick={() => handleCheckDuplicate("email")}
            >
              {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>
          {showEmailError && (
            <p className={errorClassName} id="signup-email-error">
              이메일 형식을 확인해 주세요.
            </p>
          )}
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <label className={labelClassName} htmlFor="signup-nickname">
            닉네임
          </label>
          <div className={fieldClassName}>
            <input
              className={inputClassName}
              id="signup-nickname"
              type="text"
              value={form.nickname}
              placeholder="2~12자"
              minLength={2}
              maxLength={12}
              aria-invalid={showNicknameError}
              aria-describedby={showNicknameError ? "signup-nickname-error" : undefined}
              disabled={duplicateCheck.nickname.isChecking}
              onChange={(event) =>
                handleChangeField("nickname", event.target.value)
              }
            />
            <button
              className="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-[13px] leading-normal font-extrabold text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
              onClick={() => handleCheckDuplicate("nickname")}
            >
              {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>
          {showNicknameError && (
            <p className={errorClassName} id="signup-nickname-error">
              닉네임은 2~12자로 입력해 주세요.
            </p>
          )}
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <label className={labelClassName} htmlFor="signup-password">
            비밀번호
          </label>
          <div className={fieldClassName}>
            <input
              className={inputClassName}
              id="signup-password"
              type="password"
              value={form.password}
              placeholder="8자 이상"
              aria-invalid={showPasswordError}
              aria-describedby="signup-password-description"
              onChange={(event) =>
                handleChangeField("password", event.target.value)
              }
            />
          </div>
          <p
            className="m-0 text-[11px] leading-normal text-[#969da8]"
            id="signup-password-description"
          >
            영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
          </p>
          {showPasswordError && (
            <p className={errorClassName}>비밀번호를 다시 한 번 확인해주세요.</p>
          )}
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <label className={labelClassName} htmlFor="signup-password-confirm">
            비밀번호 확인
          </label>
          <div className={fieldClassName}>
            <input
              className={inputClassName}
              id="signup-password-confirm"
              type="password"
              value={form.passwordConfirm}
              placeholder="다시 입력"
              aria-invalid={showPasswordConfirmError}
              aria-describedby={
                showPasswordConfirmError
                  ? "signup-password-confirm-error"
                  : undefined
              }
              onChange={(event) =>
                handleChangeField("passwordConfirm", event.target.value)
              }
            />
          </div>
          {showPasswordConfirmError && (
            <p className={errorClassName} id="signup-password-confirm-error">
              비밀번호가 일치하지 않아요.
            </p>
          )}
        </div>

        <button
          className={cn(
            "flex h-12 w-full items-center justify-center rounded-lg border-0 px-4 text-sm leading-normal font-extrabold text-white",
            canSubmit && !isSubmitting
              ? "cursor-pointer bg-[#2563eb]"
              : "cursor-not-allowed bg-[#8eaff0]",
          )}
          type="submit"
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? "가입 중" : "가입하기"}
        </button>

        <p className="m-0 w-full text-center text-xs leading-normal text-[#969da8]">
          이미 계정이 있나요?{" "}
          <button
            className="cursor-pointer border-0 bg-transparent p-0 text-xs leading-normal font-extrabold text-[#2563eb]"
            type="button"
          >
            로그인
          </button>
        </p>
      </form>
    </main>
  );
}
