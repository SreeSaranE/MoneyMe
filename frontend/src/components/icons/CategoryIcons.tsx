import type { LucideIcon } from "lucide-react";
import { categoryIcons } from "./category-icons";

interface CategoryIconsProps {
  iconId?: number;
  size?: number;
  selectable?: boolean;
  onSelect?: (iconId: number) => void;
}

function CategoryIcons({
  iconId,
  size = 20,
  selectable = false,
  onSelect,
}: CategoryIconsProps) {

  if (iconId !== undefined) {
    const Icon = categoryIcons[iconId as keyof typeof categoryIcons];

    if (!Icon) {
      return null;
    }

    return <Icon size={size} />;
  }

  return (
    <div>
      {Object.entries(categoryIcons).map(([id, Icon]) => {
        const currentId = Number(id);

        return (
          <button
            key={currentId}
            type="button"
            onClick={() => onSelect?.(currentId)}
          >
            <Icon size={size} />
          </button>
        );
      })}
    </div>
  );
}

export default CategoryIcons;