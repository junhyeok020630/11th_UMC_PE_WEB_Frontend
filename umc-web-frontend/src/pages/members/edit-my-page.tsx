import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { checkEmailDuplicate } from "@/api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "@/api/members/check-nickname-duplicate";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_PROFILE_FORM = {
  nickname: "gs0428",
  email: "gwangsoo@cinemalab.kr",
};

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = keyof typeof DEFAULT_PROFILE_FORM;

export function EditMyPage() {
  const [form, setForm] = useState(DEFAULT_PROFILE_FORM);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;

  const handleChangeField = (key: DuplicateCheckKey, value: string) => {
    if (duplicateCheck[key].isChecking) return;

    setDuplicateCheck((previousCheck) => ({
      ...previousCheck,
      [key]: DEFAULT_DUPLICATE_CHECK,
    }));
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

      setDuplicateCheck((previousCheck) => ({
        ...previousCheck,
        [key]: {
          ...previousCheck[key],
          isAvailable: response.available,
        },
      }));
      alert(
        response.available
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

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("프로필 이미지는 5MB 이하만 선택할 수 있어요.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        setProfileImage(reader.result);
      }
    });
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="flex w-full flex-1 flex-col items-start gap-8 px-20 py-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-[9px]">
          <h1 className="m-0 text-[31px] leading-[37px] font-bold tracking-[-1.24px] text-[#17191e]">
            내 정보 수정
          </h1>
          <p className="m-0 text-sm leading-[22.4px] font-normal text-[#606774]">
            닉네임, 이메일과 프로필 이미지를 변경할 수 있어요.
          </p>
        </div>
        <button
          className="flex h-[42px] cursor-pointer items-center justify-center rounded-lg border border-white bg-[#2563eb] px-4 text-sm leading-normal font-extrabold text-white"
          type="submit"
          form="profile-form"
        >
          변경사항 저장
        </button>
      </div>

      <form
        className="relative flex min-h-0 w-full flex-1 items-start gap-11"
        id="profile-form"
        onSubmit={handleSubmit}
      >
        <section className="flex w-full items-center gap-11">
          <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1">
            <label className="relative cursor-pointer" htmlFor="profile-image">
              <span className="flex size-[82px] items-center justify-center overflow-hidden rounded-full bg-[#e3e6eb]">
                {profileImage ? (
                  <img
                    className="size-full object-cover"
                    src={profileImage}
                    alt="선택한 프로필"
                  />
                ) : (
                  <img className="size-12" src="/icons/person.svg" alt="" />
                )}
              </span>
              <img
                className="absolute -right-1 bottom-0 size-6"
                src="/icons/edit.svg"
                alt="프로필 이미지 변경"
              />
            </label>
            <input
              className="sr-only"
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
            <strong className="text-[15px] leading-[18px] font-bold text-[#17191e]">
              프로필 이미지
            </strong>
            <p className="m-0 text-[11px] leading-[13px] font-normal text-[#969da8]">
              선택 사항 · 최대 5MB
            </p>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-[17px]">
            <div className="flex w-full flex-col items-start gap-2">
              <label
                className="text-[13px] leading-4 font-extrabold text-[#17191e]"
                htmlFor="profile-nickname"
              >
                닉네임
              </label>
              <div className="flex min-h-12 w-full items-center gap-2 rounded-lg border border-[#e3e6eb] bg-white px-[13px] py-[14px] focus-within:border-[#2563eb]">
                <input
                  className="min-w-0 flex-1 border-0 bg-transparent px-0.5 py-px text-sm leading-[17px] text-[#17191e] outline-none"
                  id="profile-nickname"
                  type="text"
                  value={form.nickname}
                  minLength={2}
                  maxLength={12}
                  disabled={duplicateCheck.nickname.isChecking}
                  onChange={(event) =>
                    handleChangeField("nickname", event.target.value)
                  }
                />
                <button
                  className="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-xs leading-[14px] font-extrabold text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  disabled={
                    !isNicknameValid || duplicateCheck.nickname.isChecking
                  }
                  onClick={() => handleCheckDuplicate("nickname")}
                >
                  {duplicateCheck.nickname.isChecking
                    ? "확인 중"
                    : duplicateCheck.nickname.isAvailable
                      ? "확인 완료"
                      : "중복 확인"}
                </button>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-2 pt-px">
              <label
                className="text-[13px] leading-4 font-extrabold text-[#17191e]"
                htmlFor="profile-email"
              >
                이메일
              </label>
              <div className="flex min-h-12 w-full items-center gap-2 rounded-lg border border-[#e3e6eb] bg-white px-[13px] py-[14px] focus-within:border-[#2563eb]">
                <input
                  className="min-w-0 flex-1 border-0 bg-transparent px-0.5 py-px text-sm leading-[17px] text-[#17191e] outline-none"
                  id="profile-email"
                  type="email"
                  value={form.email}
                  disabled={duplicateCheck.email.isChecking}
                  onChange={(event) =>
                    handleChangeField("email", event.target.value)
                  }
                />
                <button
                  className="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-xs leading-[14px] font-extrabold text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  disabled={!isEmailValid || duplicateCheck.email.isChecking}
                  onClick={() => handleCheckDuplicate("email")}
                >
                  {duplicateCheck.email.isChecking
                    ? "확인 중"
                    : duplicateCheck.email.isAvailable
                      ? "확인 완료"
                      : "중복 확인"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="absolute right-0 bottom-0 left-0 flex items-center justify-between rounded-[10px] border border-[#d92d20] bg-[rgba(217,45,32,0.1)] p-5">
          <div className="flex w-[570px] flex-col items-start gap-1 text-[#d92d20]">
            <h2 className="m-0 w-full text-sm leading-[17px] font-bold">
              회원 탈퇴
            </h2>
            <p className="m-0 w-full text-[11px] leading-[16.5px] font-normal">
              탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.
            </p>
          </div>
          <button
            className="flex h-[42px] cursor-pointer items-center justify-center rounded-lg border border-[#d92d20] bg-white px-4 text-sm leading-normal font-extrabold text-[#d92d20]"
            type="button"
          >
            회원 탈퇴
          </button>
        </section>
      </form>
    </main>
  );
}
