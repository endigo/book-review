import { auth } from "~/lib/auth";
import { insertReviewSchema } from "~/lib/db";
import { ReviewService } from "~/services/review-service";

const requestSchema = insertReviewSchema.pick({
  bookId: true,
  reviewText: true,
  rating: true,
});

// POST http://localhost:3000/api/reviews
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await auth();

    const reviewService = ReviewService.getInstance();

    const data = requestSchema.parse(body);

    const review = await reviewService.insertReview({
      ...data,
      userId: session?.user?.id,
    });

    return Response.json({ data: review });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
