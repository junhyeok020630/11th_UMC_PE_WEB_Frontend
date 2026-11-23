import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { getMemberRatings } from "@/api/ratings/get-member-ratings";
import type { Rating } from "@/api/ratings/models";
import { ratingQueryKeys } from "@/api/ratings/rating-query-keys";
import { useCreateRatingMutation } from "@/hooks/use-create-rating-mutation";
import { useDeleteRatingMutation } from "@/hooks/use-delete-rating-mutation";
import { useUpdateRatingMutation } from "@/hooks/use-update-rating-mutation";
import { useAuthStore } from "@/stores/auth-store";
import { getMemberIdFromAccessToken } from "@/utils/auth/get-member-id-from-access-token";
import { cn } from "@/utils/cn";

interface RatingEditorProps {
  movieId: number;
}

const panelClassName =
  "flex w-[360px] shrink-0 flex-col items-start gap-2 border-l border-[#e3e6eb] pb-[41px] pl-[30px]";

export function RatingEditor({ movieId }: RatingEditorProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = getMemberIdFromAccessToken(accessToken);
  const ratingsQuery = useQuery({
    queryKey: ratingQueryKeys.member(memberId ?? 0),
    queryFn: () => getMemberRatings(memberId as number),
    enabled: memberId !== null,
    retry: false,
  });

  if (!accessToken) {
    return (
      <aside className={panelClassName}>
        <h2 className="m-0 w-full text-[21px] leading-normal font-bold tracking-[-0.63px] text-[#17191e]">
          내 평점
        </h2>
        <p className="m-0 w-full text-xs leading-normal text-[#969da8]">
          로그인 후 평점을 남길 수 있어요.
        </p>
        <Link
          className="flex h-[42px] w-full items-center justify-center rounded-lg bg-[#2563eb] text-sm font-extrabold text-white no-underline"
          to="/login"
        >
          로그인
        </Link>
      </aside>
    );
  }

  if (memberId === null) {
    return (
      <aside className={panelClassName}>
        <h2 className="m-0 w-full text-[21px] leading-normal font-bold tracking-[-0.63px] text-[#17191e]">
          내 평점
        </h2>
        <p className="m-0 w-full text-xs leading-normal text-[#d92d20]">
          로그인 정보를 확인할 수 없어요. 다시 로그인해 주세요.
        </p>
      </aside>
    );
  }

  if (ratingsQuery.isPending) {
    return (
      <aside className={panelClassName}>
        <h2 className="m-0 w-full text-[21px] leading-normal font-bold tracking-[-0.63px] text-[#17191e]">
          내 평점
        </h2>
        <p className="m-0 w-full text-xs leading-normal text-[#969da8]">
          평점 정보를 불러오는 중이에요.
        </p>
      </aside>
    );
  }

  if (ratingsQuery.isError) {
    return (
      <aside className={panelClassName}>
        <h2 className="m-0 w-full text-[21px] leading-normal font-bold tracking-[-0.63px] text-[#17191e]">
          내 평점
        </h2>
        <p className="m-0 w-full text-xs leading-normal text-[#d92d20]">
          평점 정보를 불러오지 못했어요.
        </p>
      </aside>
    );
  }

  const currentRating = ratingsQuery.data.find(
    (rating) => rating.movieId === movieId,
  );

  return (
    <RatingForm
      key={currentRating?.ratingId ?? "new-rating"}
      memberId={memberId}
      movieId={movieId}
      currentRating={currentRating}
    />
  );
}

interface RatingFormProps {
  memberId: number;
  movieId: number;
  currentRating?: Rating;
}

function RatingForm({ memberId, movieId, currentRating }: RatingFormProps) {
  const [score, setScore] = useState<number | null>(
    currentRating?.score ?? null,
  );
  const [comment, setComment] = useState(currentRating?.comment ?? "");
  const createRatingMutation = useCreateRatingMutation(memberId);
  const updateRatingMutation = useUpdateRatingMutation(memberId);
  const deleteRatingMutation = useDeleteRatingMutation(memberId);
  const isPending =
    createRatingMutation.isPending ||
    updateRatingMutation.isPending ||
    deleteRatingMutation.isPending;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (score === null || isPending) return;

    const body = {
      score,
      comment: comment.trim() || null,
    };

    if (currentRating) {
      updateRatingMutation.mutate({
        ratingId: currentRating.ratingId,
        body,
      });
      return;
    }

    createRatingMutation.mutate({ movieId, ...body });
  };

  const handleDelete = () => {
    if (!currentRating || isPending) return;
    deleteRatingMutation.mutate(currentRating.ratingId);
  };

  return (
    <aside className={panelClassName}>
      <h2 className="m-0 w-full text-[21px] leading-normal font-bold tracking-[-0.63px] text-[#17191e]">
        내 평점
      </h2>
      <p className="m-0 w-full text-xs leading-normal text-[#969da8]">
        별점은 필수, 후기는 선택이에요.
      </p>
      <form className="flex w-full flex-col items-start gap-2" onSubmit={handleSubmit}>
        <div className="flex w-full items-start gap-1" aria-label="영화 별점">
          {[1, 2, 3, 4, 5].map((ratingScore) => {
            const isSelected = score !== null && ratingScore <= score;

            return (
              <button
                className={cn(
                  "flex size-[38px] cursor-pointer items-center justify-center rounded-lg border bg-white p-0",
                  isSelected
                    ? "border-[#2563eb] bg-[#eff4ff]"
                    : "border-[#e3e6eb]",
                )}
                type="button"
                aria-label={`${ratingScore}점`}
                aria-pressed={score === ratingScore}
                disabled={isPending}
                key={ratingScore}
                onClick={() => setScore(ratingScore)}
              >
                <img
                  className={cn("size-6", isSelected ? "opacity-100" : "opacity-40")}
                  src="/icons/star.svg"
                  alt=""
                />
              </button>
            );
          })}
        </div>
        <textarea
          className="h-[102px] w-full resize-none rounded-lg border border-[#e3e6eb] bg-white px-3 py-4 text-[13px] leading-[19.5px] text-[#17191e] outline-none placeholder:text-[#969da8]"
          value={comment}
          maxLength={500}
          placeholder="영화를 보고 느낀 점을 남겨보세요."
          aria-label="영화 후기"
          disabled={isPending}
          onChange={(event) => setComment(event.target.value)}
        />
        <button
          className="flex h-[42px] w-full cursor-pointer items-center justify-center rounded-lg border border-white bg-[#17191e] px-4 text-sm leading-normal font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40"
          type="submit"
          disabled={score === null || isPending}
        >
          {isPending
            ? "처리 중"
            : currentRating
              ? "평점 수정"
              : "평점 저장"}
        </button>
        {currentRating && (
          <button
            className="flex h-[42px] w-full cursor-pointer items-center justify-center rounded-lg border border-[#d92d20] bg-white px-4 text-sm leading-normal font-extrabold text-[#d92d20] disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            disabled={isPending}
            onClick={handleDelete}
          >
            평점 삭제
          </button>
        )}
      </form>
    </aside>
  );
}
