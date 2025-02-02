export interface Recipe {
  id: string;
  title: string;
  category: 'agar' | 'liquid-culture' | 'substrate' | 'other';
  ingredients: string[];
  steps: string[];
  notes?: string;
  createdAt: Date;
  isCustom: boolean;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy?: string;
}

export interface RecipeFormData {
  title: string;
  category: Recipe['category'];
  ingredients: string[];
  steps: string[];
  notes?: string;
  submittedBy: string;
}

export interface AdminState {
  isAdmin: boolean;
  password: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  featured_image: string | null;
  is_published: boolean;
}

export interface BlogComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  is_approved: boolean;
}

export interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  meta_title?: string;
  meta_description?: string;
  featured_image?: string;
  is_published: boolean;
}