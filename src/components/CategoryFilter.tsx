import React from 'react';
import { Dog, Cat, Bird, Fish, Turtle, PawPrint } from 'lucide-react';
import { PetCategory, PET_CATEGORIES } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selected: PetCategory | 'all';
  onSelect: (category: PetCategory | 'all') => void;
}

const iconMap: Record<string, React.ElementType> = {
  Dog, Cat, Bird, Fish, Turtle, PawPrint,
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onSelect }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onSelect('all')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "border-2 hover:scale-105",
            selected === 'all'
              ? "bg-orange-500 dark:bg-orange-600 text-white border-orange-500 dark:border-orange-600 shadow-lg shadow-orange-200 dark:shadow-orange-900/30"
              : "bg-card text-foreground border-border hover:border-orange-300 dark:hover:border-orange-700"
          )}
        >
          <span className="flex items-center gap-1.5">
            <PawPrint className="h-4 w-4" />
            הכל
          </span>
        </button>
        {PET_CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon];
          return (
            <button
              key={cat.value}
              onClick={() => onSelect(cat.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "border-2 hover:scale-105",
                selected === cat.value
                  ? "bg-orange-500 dark:bg-orange-600 text-white border-orange-500 dark:border-orange-600 shadow-lg shadow-orange-200 dark:shadow-orange-900/30"
                  : "bg-card text-foreground border-border hover:border-orange-300 dark:hover:border-orange-700"
              )}
            >
              <span className="flex items-center gap-1.5">
                {Icon && <Icon className="h-4 w-4" />}
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
