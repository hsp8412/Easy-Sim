export default async function User({params}: {params: Promise<{id: string}>}) {
  const userId = (await params).id;
  return <div>User {userId}</div>;
}
