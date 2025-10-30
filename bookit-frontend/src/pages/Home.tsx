import { useEffect, useState } from "react";
import { getExperiences } from "../api/api";
import ExperienceCard from "../components/ExperienceCard";

interface HomeProps {
  searchTerm: string;
}

export default function Home({ searchTerm }: HomeProps) {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences()
      .then((res) => setExperiences(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  const filtered = experiences.filter((exp) => {
    const term = searchTerm.toLowerCase();
    return (
      exp.title.toLowerCase().includes(term) ||
      (exp.location && exp.location.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
      {filtered.length > 0 ? (
        filtered.map((exp) => (
          <ExperienceCard
            key={exp.id}
            id={exp.id}
            title={exp.title}
            price={exp.price}
            imageUrl={exp.image_url}
            location={exp.location}
            description={exp.description}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No experiences found for “{searchTerm}”
        </div>
      )}
    </div>
  );
}
