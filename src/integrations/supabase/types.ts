export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      addons: {
        Row: {
          active: boolean
          created_at: string
          description_en: string | null
          description_es: string | null
          hero_image: string | null
          id: string
          meta_description_en: string | null
          meta_description_es: string | null
          meta_title_en: string | null
          meta_title_es: string | null
          slug_en: string
          slug_es: string
          sort_order: number
          title_en: string | null
          title_es: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          hero_image?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_title_en?: string | null
          meta_title_es?: string | null
          slug_en: string
          slug_es: string
          sort_order?: number
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          hero_image?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_title_en?: string | null
          meta_title_es?: string | null
          slug_en?: string
          slug_es?: string
          sort_order?: number
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author: string | null
          body_en: string | null
          body_es: string | null
          created_at: string
          featured_image: string | null
          id: string
          meta_description_en: string | null
          meta_description_es: string | null
          meta_title_en: string | null
          meta_title_es: string | null
          published: boolean
          published_at: string | null
          slug: string
          title_en: string | null
          title_es: string | null
          updated_at: string
        }
        Insert: {
          author?: string | null
          body_en?: string | null
          body_es?: string | null
          created_at?: string
          featured_image?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_title_en?: string | null
          meta_title_es?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
        }
        Update: {
          author?: string | null
          body_en?: string | null
          body_es?: string | null
          created_at?: string
          featured_image?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_title_en?: string | null
          meta_title_es?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      experience_packages: {
        Row: {
          active: boolean
          created_at: string
          description_en: string | null
          description_es: string | null
          hero_image: string | null
          id: string
          meta_description_en: string | null
          meta_description_es: string | null
          meta_title_en: string | null
          meta_title_es: string | null
          slug_en: string
          slug_es: string
          sort_order: number
          title_en: string | null
          title_es: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          hero_image?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_title_en?: string | null
          meta_title_es?: string | null
          slug_en: string
          slug_es: string
          sort_order?: number
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          hero_image?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_title_en?: string | null
          meta_title_es?: string | null
          slug_en?: string
          slug_es?: string
          sort_order?: number
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          date: string | null
          departure_time: string | null
          duration: string | null
          email: string
          guests: number | null
          id: string
          language: string
          message: string | null
          name: string
          phone: string | null
          source_page: string | null
          yacht_preference: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          departure_time?: string | null
          duration?: string | null
          email: string
          guests?: number | null
          id?: string
          language?: string
          message?: string | null
          name: string
          phone?: string | null
          source_page?: string | null
          yacht_preference?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          departure_time?: string | null
          duration?: string | null
          email?: string
          guests?: number | null
          id?: string
          language?: string
          message?: string | null
          name?: string
          phone?: string | null
          source_page?: string | null
          yacht_preference?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          active: boolean
          body_en: string | null
          body_es: string | null
          created_at: string
          id: string
          name: string
          rating: number | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          body_en?: string | null
          body_es?: string | null
          created_at?: string
          id?: string
          name: string
          rating?: number | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          body_en?: string | null
          body_es?: string | null
          created_at?: string
          id?: string
          name?: string
          rating?: number | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      yachts: {
        Row: {
          active: boolean
          capacity: number | null
          category: string | null
          created_at: string
          description_en: string | null
          description_es: string | null
          featured: boolean
          hero_image: string | null
          id: string
          images: string[]
          meta_description_en: string | null
          meta_description_es: string | null
          meta_title_en: string | null
          meta_title_es: string | null
          name: string
          price_4h: number | null
          price_original_4h: number | null
          price_per_day: number | null
          size_ft: number | null
          slug_en: string
          slug_es: string
          sort_order: number
          title_en: string | null
          title_es: string | null
          updated_at: string
          whatsapp_message_en: string | null
          whatsapp_message_es: string | null
        }
        Insert: {
          active?: boolean
          capacity?: number | null
          category?: string | null
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          featured?: boolean
          hero_image?: string | null
          id?: string
          images?: string[]
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_title_en?: string | null
          meta_title_es?: string | null
          name: string
          price_4h?: number | null
          price_original_4h?: number | null
          price_per_day?: number | null
          size_ft?: number | null
          slug_en: string
          slug_es: string
          sort_order?: number
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
          whatsapp_message_en?: string | null
          whatsapp_message_es?: string | null
        }
        Update: {
          active?: boolean
          capacity?: number | null
          category?: string | null
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          featured?: boolean
          hero_image?: string | null
          id?: string
          images?: string[]
          meta_description_en?: string | null
          meta_description_es?: string | null
          meta_title_en?: string | null
          meta_title_es?: string | null
          name?: string
          price_4h?: number | null
          price_original_4h?: number | null
          price_per_day?: number | null
          size_ft?: number | null
          slug_en?: string
          slug_es?: string
          sort_order?: number
          title_en?: string | null
          title_es?: string | null
          updated_at?: string
          whatsapp_message_en?: string | null
          whatsapp_message_es?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
