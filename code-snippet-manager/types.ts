
export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
}

export type Language = {
  value: string;
  label: string;
};
