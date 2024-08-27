import { cookies } from "next/headers";
import { insertReviewSchema } from "~/lib/db";
import { insertReview } from "~/services/review-service";

const requestSchema = insertReviewSchema.pick({
  bookId: true,
  reviewText: true,
  rating: true,
});

export async function GET(request: Request) {
  return Response.json({ data: "Hello, World!" });
}

// POST http://localhost:3000/api/reviews
export async function POST(request: Request) {
  const body = await request.json();

  const data = requestSchema.parse(body);

  // TODO: get userId from request
  // data.bookId = request.user.id

  const review = await insertReview(data);

  return Response.json({ data: review });
}
