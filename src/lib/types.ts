export type PetCategory = 'dogs' | 'cats' | 'birds' | 'fish' | 'reptiles' | 'other';

export interface Tweet {
  id: string;
  content: string;
  timestamp: Date;
  category: PetCategory;
  likes: number;
  liked: boolean;
  authorName: string;
}

export const PET_CATEGORIES: { value: PetCategory; label: string; icon: string; emoji: string }[] = [
  { value: 'dogs', label: 'כלבים', icon: 'Dog', emoji: '🐕' },
  { value: 'cats', label: 'חתולים', icon: 'Cat', emoji: '🐱' },
  { value: 'birds', label: 'ציפורים', icon: 'Bird', emoji: '🐦' },
  { value: 'fish', label: 'דגים', icon: 'Fish', emoji: '🐟' },
  { value: 'reptiles', label: 'זוחלים', icon: 'Turtle', emoji: '🦎' },
  { value: 'other', label: 'אחר', icon: 'PawPrint', emoji: '🐾' },
];

export const AUTHOR_NAMES = [
  'אוהב כלבים',
  'חובבת חתולים',
  'מאלף ציפורים',
  'שומר הדגים',
  'חובב זוחלים',
  'אוהבת חיות',
  'רופא וטרינר',
  'מצילת חיות',
];
