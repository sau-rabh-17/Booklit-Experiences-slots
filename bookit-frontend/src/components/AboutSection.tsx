interface AboutProps {
  about: string;
}

export default function AboutSection({ about }: AboutProps) {
  if (!about) return null;

  return (
    <div className="mt-3 w-full">
      <h3 className="font-semibold text-gray-800 mb-2">About</h3>
      <div className="bg-gray-200 border rounded-lg p-1  h-8">
        <p className="text-sm text-gray-600 leading-relaxed">{about}</p>
      </div>
    </div>
  );
}
