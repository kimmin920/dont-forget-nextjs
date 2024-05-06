import { findManyEventee } from '@/api/eventee';

export async function GET(request: Request) {
  const eventees = await findManyEventee();
  return new Response(JSON.stringify({ eventees }));
}
