export default function Title({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div>
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{subTitle}</p>
    </div>
  );
}
