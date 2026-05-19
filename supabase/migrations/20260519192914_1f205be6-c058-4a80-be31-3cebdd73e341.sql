
-- USER ROLES
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- YACHTS
CREATE TABLE public.yachts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug_en TEXT NOT NULL UNIQUE,
  slug_es TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  size_ft INTEGER,
  capacity INTEGER,
  price_4h NUMERIC(10,2),
  price_original_4h NUMERIC(10,2),
  price_per_day NUMERIC(10,2),
  category TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  title_en TEXT, title_es TEXT,
  description_en TEXT, description_es TEXT,
  meta_title_en TEXT, meta_title_es TEXT,
  meta_description_en TEXT, meta_description_es TEXT,
  whatsapp_message_en TEXT, whatsapp_message_es TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  hero_image TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER yachts_updated_at BEFORE UPDATE ON public.yachts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE public.yachts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active yachts" ON public.yachts FOR SELECT USING (active = true);
CREATE POLICY "Admins full access yachts" ON public.yachts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- EXPERIENCE PACKAGES
CREATE TABLE public.experience_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug_en TEXT NOT NULL UNIQUE,
  slug_es TEXT NOT NULL UNIQUE,
  title_en TEXT, title_es TEXT,
  description_en TEXT, description_es TEXT,
  meta_title_en TEXT, meta_title_es TEXT,
  meta_description_en TEXT, meta_description_es TEXT,
  hero_image TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER experience_packages_updated_at BEFORE UPDATE ON public.experience_packages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE public.experience_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active packages" ON public.experience_packages FOR SELECT USING (active = true);
CREATE POLICY "Admins full access packages" ON public.experience_packages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ADDONS
CREATE TABLE public.addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug_en TEXT NOT NULL UNIQUE,
  slug_es TEXT NOT NULL UNIQUE,
  title_en TEXT, title_es TEXT,
  description_en TEXT, description_es TEXT,
  meta_title_en TEXT, meta_title_es TEXT,
  meta_description_en TEXT, meta_description_es TEXT,
  hero_image TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER addons_updated_at BEFORE UPDATE ON public.addons FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE public.addons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active addons" ON public.addons FOR SELECT USING (active = true);
CREATE POLICY "Admins full access addons" ON public.addons FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- BLOGS
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title_en TEXT, title_es TEXT,
  body_en TEXT, body_es TEXT,
  meta_title_en TEXT, meta_title_es TEXT,
  meta_description_en TEXT, meta_description_es TEXT,
  featured_image TEXT,
  author TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published blogs" ON public.blogs FOR SELECT USING (published = true);
CREATE POLICY "Admins full access blogs" ON public.blogs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- INQUIRIES
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date DATE,
  duration TEXT,
  guests INTEGER,
  departure_time TEXT,
  yacht_preference TEXT,
  message TEXT,
  source_page TEXT,
  language TEXT NOT NULL DEFAULT 'en'
);
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage inquiries" ON public.inquiries FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- TESTIMONIALS
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  body_en TEXT, body_es TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active testimonials" ON public.testimonials FOR SELECT USING (active = true);
CREATE POLICY "Admins full access testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
