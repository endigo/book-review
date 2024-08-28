import { format } from "date-fns";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Ratings } from "~/components/ui//rating";

export const Review = ({ review }: { review: any }) => {
  return (
    <article>
      <hr className="border-bottom-[1px] border-color-grey-100 my-4" />
      <div className="flex items-center mb-4">
        <Avatar className="w-10 h-10 mr-4">
          <AvatarFallback>{review.user?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="font-medium dark:text-white">
          <p>
            {review.user?.name}
            <time
              dateTime={review.user?.createdAt.toString()}
              className="block text-sm text-gray-500 dark:text-gray-400"
            >
              {format(review.user?.createdAt, "'Joined on 'yyyy/MM/dd")}
            </time>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        <Ratings rating={review.rating || 5} />
      </div>
      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>{format(review.createdAt, "'Reviewed on 'yyyy/MM/dd")}</p>
      </footer>
      <p className="mb-2 text-gray-500 dark:text-gray-400">
        {review.reviewText}
      </p>
    </article>
  );
};
