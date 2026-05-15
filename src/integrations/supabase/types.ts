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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ab_test_logs: {
        Row: {
          cliques: number
          conversoes: number
          created_at: string
          id: string
          pagina: string
          tenant_id: string
          variacao: string
        }
        Insert: {
          cliques?: number
          conversoes?: number
          created_at?: string
          id?: string
          pagina: string
          tenant_id: string
          variacao?: string
        }
        Update: {
          cliques?: number
          conversoes?: number
          created_at?: string
          id?: string
          pagina?: string
          tenant_id?: string
          variacao?: string
        }
        Relationships: [
          {
            foreignKeyName: "ab_test_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      blog: {
        Row: {
          author_avatar: string | null
          author_bio: string | null
          author_link: string | null
          author_name: string | null
          categoria_id: string | null
          conteudo: string | null
          created_at: string
          excerpt: string | null
          focus_keyword: string | null
          id: string
          imagem_capa: string | null
          meta_description: string | null
          meta_title: string | null
          publicado: boolean
          published_at: string | null
          seo_score: number | null
          slug: string
          status: string
          tenant_id: string
          titulo: string
          unpublish_at: string | null
          updated_at: string
        }
        Insert: {
          author_avatar?: string | null
          author_bio?: string | null
          author_link?: string | null
          author_name?: string | null
          categoria_id?: string | null
          conteudo?: string | null
          created_at?: string
          excerpt?: string | null
          focus_keyword?: string | null
          id?: string
          imagem_capa?: string | null
          meta_description?: string | null
          meta_title?: string | null
          publicado?: boolean
          published_at?: string | null
          seo_score?: number | null
          slug: string
          status?: string
          tenant_id: string
          titulo: string
          unpublish_at?: string | null
          updated_at?: string
        }
        Update: {
          author_avatar?: string | null
          author_bio?: string | null
          author_link?: string | null
          author_name?: string | null
          categoria_id?: string | null
          conteudo?: string | null
          created_at?: string
          excerpt?: string | null
          focus_keyword?: string | null
          id?: string
          imagem_capa?: string | null
          meta_description?: string | null
          meta_title?: string | null
          publicado?: boolean
          published_at?: string | null
          seo_score?: number | null
          slug?: string
          status?: string
          tenant_id?: string
          titulo?: string
          unpublish_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_blog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias_blog: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          nome: string
          parent_id: string | null
          slug: string
          tenant_id: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          nome: string
          parent_id?: string | null
          slug: string
          tenant_id: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          nome?: string
          parent_id?: string | null
          slug?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "categorias_blog_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categorias_blog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categorias_blog_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias_produtos: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          nome: string
          slug: string
          tenant_id: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          nome: string
          slug: string
          tenant_id: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          nome?: string
          slug?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "categorias_produtos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          anotacoes: string | null
          bairro: string | null
          cep: string | null
          cidade: string | null
          cpf_cnpj: string | null
          created_at: string | null
          data_nascimento: string | null
          email: string | null
          estado: string | null
          filhos: number | null
          id: string
          logradouro: string | null
          nome: string
          numero: string | null
          produto_interesse: string | null
          sexo: string | null
          status: string | null
          tags: string[] | null
          telefone: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          anotacoes?: string | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          estado?: string | null
          filhos?: number | null
          id?: string
          logradouro?: string | null
          nome: string
          numero?: string | null
          produto_interesse?: string | null
          sexo?: string | null
          status?: string | null
          tags?: string[] | null
          telefone?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          anotacoes?: string | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          estado?: string | null
          filhos?: number | null
          id?: string
          logradouro?: string | null
          nome?: string
          numero?: string | null
          produto_interesse?: string | null
          sexo?: string | null
          status?: string | null
          tags?: string[] | null
          telefone?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clientes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracao_floating_global: {
        Row: {
          ab_test_ativo: boolean
          balao_ativo: boolean
          created_at: string
          delay_exibicao: number
          foto_agente: string | null
          id: string
          mensagem_padrao: string | null
          modo: string
          nome_agente: string | null
          numero_whatsapp: string | null
          prompt_agente_global: string | null
          scroll_percentual_ativacao: number
          tenant_id: string
          texto_balao: string | null
          updated_at: string
          usar_modal_expandido: boolean
        }
        Insert: {
          ab_test_ativo?: boolean
          balao_ativo?: boolean
          created_at?: string
          delay_exibicao?: number
          foto_agente?: string | null
          id?: string
          mensagem_padrao?: string | null
          modo?: string
          nome_agente?: string | null
          numero_whatsapp?: string | null
          prompt_agente_global?: string | null
          scroll_percentual_ativacao?: number
          tenant_id: string
          texto_balao?: string | null
          updated_at?: string
          usar_modal_expandido?: boolean
        }
        Update: {
          ab_test_ativo?: boolean
          balao_ativo?: boolean
          created_at?: string
          delay_exibicao?: number
          foto_agente?: string | null
          id?: string
          mensagem_padrao?: string | null
          modo?: string
          nome_agente?: string | null
          numero_whatsapp?: string | null
          prompt_agente_global?: string | null
          scroll_percentual_ativacao?: number
          tenant_id?: string
          texto_balao?: string | null
          updated_at?: string
          usar_modal_expandido?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "configuracao_floating_global_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracao_floating_pagina: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          modo: string | null
          numero_whatsapp: string | null
          pagina_slug: string
          prompt_agente: string | null
          tenant_id: string
          texto_balao: string | null
          updated_at: string
          usar_modal_expandido: boolean | null
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          modo?: string | null
          numero_whatsapp?: string | null
          pagina_slug: string
          prompt_agente?: string | null
          tenant_id: string
          texto_balao?: string | null
          updated_at?: string
          usar_modal_expandido?: boolean | null
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          modo?: string | null
          numero_whatsapp?: string | null
          pagina_slug?: string
          prompt_agente?: string | null
          tenant_id?: string
          texto_balao?: string | null
          updated_at?: string
          usar_modal_expandido?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "configuracao_floating_pagina_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracao_header: {
        Row: {
          altura_menu: number
          botao_destaque_link: string | null
          botao_destaque_texto: string | null
          botao_destaque_tipo: string | null
          botao_nova_aba: boolean
          cor_fundo: string
          cor_hover: string
          cor_texto: string
          created_at: string
          fundo_transparente: boolean
          id: string
          logo_posicao: string
          opacidade: number
          ordem_menu: Json
          sombra_ao_rolar: boolean
          sticky: boolean
          tenant_id: string
          updated_at: string
        }
        Insert: {
          altura_menu?: number
          botao_destaque_link?: string | null
          botao_destaque_texto?: string | null
          botao_destaque_tipo?: string | null
          botao_nova_aba?: boolean
          cor_fundo?: string
          cor_hover?: string
          cor_texto?: string
          created_at?: string
          fundo_transparente?: boolean
          id?: string
          logo_posicao?: string
          opacidade?: number
          ordem_menu?: Json
          sombra_ao_rolar?: boolean
          sticky?: boolean
          tenant_id: string
          updated_at?: string
        }
        Update: {
          altura_menu?: number
          botao_destaque_link?: string | null
          botao_destaque_texto?: string | null
          botao_destaque_tipo?: string | null
          botao_nova_aba?: boolean
          cor_fundo?: string
          cor_hover?: string
          cor_texto?: string
          created_at?: string
          fundo_transparente?: boolean
          id?: string
          logo_posicao?: string
          opacidade?: number
          ordem_menu?: Json
          sombra_ao_rolar?: boolean
          sticky?: boolean
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "configuracao_header_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracao_ia: {
        Row: {
          avatar_url: string | null
          created_at: string
          delay: number
          descricao_agente: string | null
          ia_ativa: boolean
          id: string
          mensagem_inicial: string | null
          nome_agente: string | null
          objetivo: string
          permitir_override_pagina: boolean
          prompt_base: string | null
          prompt_complementar: string | null
          tenant_id: string
          tom: string
          updated_at: string
          usar_contexto_pagina: boolean
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          delay?: number
          descricao_agente?: string | null
          ia_ativa?: boolean
          id?: string
          mensagem_inicial?: string | null
          nome_agente?: string | null
          objetivo?: string
          permitir_override_pagina?: boolean
          prompt_base?: string | null
          prompt_complementar?: string | null
          tenant_id: string
          tom?: string
          updated_at?: string
          usar_contexto_pagina?: boolean
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          delay?: number
          descricao_agente?: string | null
          ia_ativa?: boolean
          id?: string
          mensagem_inicial?: string | null
          nome_agente?: string | null
          objetivo?: string
          permitir_override_pagina?: boolean
          prompt_base?: string | null
          prompt_complementar?: string | null
          tenant_id?: string
          tom?: string
          updated_at?: string
          usar_contexto_pagina?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "configuracao_ia_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      conteudo_secoes: {
        Row: {
          created_at: string
          id: string
          json_conteudo: Json | null
          secao: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          json_conteudo?: Json | null
          secao: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          json_conteudo?: Json | null
          secao?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conteudo_secoes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      conteudo_vitrine: {
        Row: {
          created_at: string
          id: string
          json_conteudo: Json | null
          layout_id: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          json_conteudo?: Json | null
          layout_id?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          json_conteudo?: Json | null
          layout_id?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conteudo_vitrine_layout_id_fkey"
            columns: ["layout_id"]
            isOneToOne: false
            referencedRelation: "layouts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conteudo_vitrine_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      conversas_ia: {
        Row: {
          assigned_nome: string | null
          assigned_to: string | null
          chat_id: string | null
          created_at: string
          email_visitante: string | null
          id: string
          lida: boolean
          nome_editado: boolean | null
          nome_original: string | null
          nome_visitante: string | null
          origem: string | null
          pagina_origem: string | null
          sender_id: string | null
          session_id: string | null
          status: string
          telefone_visitante: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          assigned_nome?: string | null
          assigned_to?: string | null
          chat_id?: string | null
          created_at?: string
          email_visitante?: string | null
          id?: string
          lida?: boolean
          nome_editado?: boolean | null
          nome_original?: string | null
          nome_visitante?: string | null
          origem?: string | null
          pagina_origem?: string | null
          sender_id?: string | null
          session_id?: string | null
          status?: string
          telefone_visitante?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          assigned_nome?: string | null
          assigned_to?: string | null
          chat_id?: string | null
          created_at?: string
          email_visitante?: string | null
          id?: string
          lida?: boolean
          nome_editado?: boolean | null
          nome_original?: string | null
          nome_visitante?: string | null
          origem?: string | null
          pagina_origem?: string | null
          sender_id?: string | null
          session_id?: string | null
          status?: string
          telefone_visitante?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversas_ia_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversas_ia_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_automation_logs: {
        Row: {
          created_at: string
          deal_type: string | null
          details: Json | null
          event: string
          id: string
          lead_id: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string
          deal_type?: string | null
          details?: Json | null
          event: string
          id?: string
          lead_id?: string | null
          tenant_id: string
        }
        Update: {
          created_at?: string
          deal_type?: string | null
          details?: Json | null
          event?: string
          id?: string
          lead_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_automation_logs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_automation_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_automation_queue: {
        Row: {
          created_at: string
          deal_type: string
          error_message: string | null
          id: string
          lead_id: string
          message_content: string
          message_index: number
          scheduled_at: string
          sent_at: string | null
          status: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          deal_type: string
          error_message?: string | null
          id?: string
          lead_id: string
          message_content: string
          message_index?: number
          scheduled_at: string
          sent_at?: string | null
          status?: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          deal_type?: string
          error_message?: string | null
          id?: string
          lead_id?: string
          message_content?: string
          message_index?: number
          scheduled_at?: string
          sent_at?: string | null
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_automation_queue_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_automation_queue_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_automation_settings: {
        Row: {
          ai_followup_delay_type: string
          ai_followup_delay_value: number
          ai_followup_enabled: boolean
          ai_followup_loop: boolean
          ai_followup_prompt: string | null
          created_at: string
          deal_type: string
          enabled: boolean
          id: string
          messages: Json
          send_until_hour: number
          tenant_id: string
          updated_at: string
        }
        Insert: {
          ai_followup_delay_type?: string
          ai_followup_delay_value?: number
          ai_followup_enabled?: boolean
          ai_followup_loop?: boolean
          ai_followup_prompt?: string | null
          created_at?: string
          deal_type: string
          enabled?: boolean
          id?: string
          messages?: Json
          send_until_hour?: number
          tenant_id: string
          updated_at?: string
        }
        Update: {
          ai_followup_delay_type?: string
          ai_followup_delay_value?: number
          ai_followup_enabled?: boolean
          ai_followup_loop?: boolean
          ai_followup_prompt?: string | null
          created_at?: string
          deal_type?: string
          enabled?: boolean
          id?: string
          messages?: Json
          send_until_hour?: number
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_automation_settings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_optouts: {
        Row: {
          created_at: string
          id: string
          motivo: string | null
          telefone: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          motivo?: string | null
          telefone: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          id?: string
          motivo?: string | null
          telefone?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_optouts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      device_tokens: {
        Row: {
          created_at: string
          id: string
          tenant_id: string | null
          token: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          tenant_id?: string | null
          token: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          tenant_id?: string | null
          token?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "device_tokens_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          created_at: string
          event: string
          id: string
          metadata_json: Json | null
          outbox_id: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string
          event?: string
          id?: string
          metadata_json?: Json | null
          outbox_id?: string | null
          tenant_id: string
        }
        Update: {
          created_at?: string
          event?: string
          id?: string
          metadata_json?: Json | null
          outbox_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_outbox_id_fkey"
            columns: ["outbox_id"]
            isOneToOne: false
            referencedRelation: "email_outbox"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      email_outbox: {
        Row: {
          attempts: number
          created_at: string
          error_message: string | null
          id: string
          identity_id: string | null
          payload_json: Json | null
          provider_message_id: string | null
          scheduled_at: string | null
          status: string
          template_key: string | null
          tenant_id: string
          to_email: string
          to_name: string | null
        }
        Insert: {
          attempts?: number
          created_at?: string
          error_message?: string | null
          id?: string
          identity_id?: string | null
          payload_json?: Json | null
          provider_message_id?: string | null
          scheduled_at?: string | null
          status?: string
          template_key?: string | null
          tenant_id: string
          to_email: string
          to_name?: string | null
        }
        Update: {
          attempts?: number
          created_at?: string
          error_message?: string | null
          id?: string
          identity_id?: string | null
          payload_json?: Json | null
          provider_message_id?: string | null
          scheduled_at?: string | null
          status?: string
          template_key?: string | null
          tenant_id?: string
          to_email?: string
          to_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_outbox_identity_id_fkey"
            columns: ["identity_id"]
            isOneToOne: false
            referencedRelation: "tenant_email_identities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_outbox_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          created_at: string
          html_body: string
          id: string
          key: string
          subject: string
          tenant_id: string | null
          text_body: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          html_body?: string
          id?: string
          key?: string
          subject?: string
          tenant_id?: string | null
          text_body?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          html_body?: string
          id?: string
          key?: string
          subject?: string
          tenant_id?: string | null
          text_body?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          ativo: boolean
          avisa_api_token: string | null
          bairro: string | null
          celular: string | null
          cidade: string | null
          cnpj: string | null
          cor_primaria: string | null
          cor_secundaria: string | null
          created_at: string
          dominio: string | null
          email: string | null
          email_leads: string | null
          endereco: string | null
          gtm_id: string | null
          horario_atendimento: string | null
          id: string
          layout_id: string | null
          logo: string | null
          modulos_ativos: Json | null
          nome: string
          pixel_meta: string | null
          plano: string
          regiao_atendimento: string | null
          responsavel: string | null
          seo_description: string | null
          seo_title: string | null
          sitemap_auto_semanal: boolean | null
          sitemap_blog_separado: boolean | null
          telefone_fixo: string | null
          telefones: string | null
          template_engine_version_aplicada: number | null
          updated_at: string
          usar_template_padrao: boolean | null
          webhook_token: string | null
          whatsapp: string | null
          whatsapp_business: string | null
        }
        Insert: {
          ativo?: boolean
          avisa_api_token?: string | null
          bairro?: string | null
          celular?: string | null
          cidade?: string | null
          cnpj?: string | null
          cor_primaria?: string | null
          cor_secundaria?: string | null
          created_at?: string
          dominio?: string | null
          email?: string | null
          email_leads?: string | null
          endereco?: string | null
          gtm_id?: string | null
          horario_atendimento?: string | null
          id?: string
          layout_id?: string | null
          logo?: string | null
          modulos_ativos?: Json | null
          nome: string
          pixel_meta?: string | null
          plano?: string
          regiao_atendimento?: string | null
          responsavel?: string | null
          seo_description?: string | null
          seo_title?: string | null
          sitemap_auto_semanal?: boolean | null
          sitemap_blog_separado?: boolean | null
          telefone_fixo?: string | null
          telefones?: string | null
          template_engine_version_aplicada?: number | null
          updated_at?: string
          usar_template_padrao?: boolean | null
          webhook_token?: string | null
          whatsapp?: string | null
          whatsapp_business?: string | null
        }
        Update: {
          ativo?: boolean
          avisa_api_token?: string | null
          bairro?: string | null
          celular?: string | null
          cidade?: string | null
          cnpj?: string | null
          cor_primaria?: string | null
          cor_secundaria?: string | null
          created_at?: string
          dominio?: string | null
          email?: string | null
          email_leads?: string | null
          endereco?: string | null
          gtm_id?: string | null
          horario_atendimento?: string | null
          id?: string
          layout_id?: string | null
          logo?: string | null
          modulos_ativos?: Json | null
          nome?: string
          pixel_meta?: string | null
          plano?: string
          regiao_atendimento?: string | null
          responsavel?: string | null
          seo_description?: string | null
          seo_title?: string | null
          sitemap_auto_semanal?: boolean | null
          sitemap_blog_separado?: boolean | null
          telefone_fixo?: string | null
          telefones?: string | null
          template_engine_version_aplicada?: number | null
          updated_at?: string
          usar_template_padrao?: boolean | null
          webhook_token?: string | null
          whatsapp?: string | null
          whatsapp_business?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empresas_layout_id_fkey"
            columns: ["layout_id"]
            isOneToOne: false
            referencedRelation: "layouts"
            referencedColumns: ["id"]
          },
        ]
      }
      floating_analytics: {
        Row: {
          created_at: string
          id: string
          pagina: string
          tenant_id: string
          tipo_evento: string
        }
        Insert: {
          created_at?: string
          id?: string
          pagina: string
          tenant_id: string
          tipo_evento: string
        }
        Update: {
          created_at?: string
          id?: string
          pagina?: string
          tenant_id?: string
          tipo_evento?: string
        }
        Relationships: [
          {
            foreignKeyName: "floating_analytics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      funil_metricas: {
        Row: {
          cliques: number | null
          created_at: string
          fechamentos: number | null
          id: string
          leads: number | null
          mes_referencia: string
          oportunidades: number | null
          receita: number | null
          tenant_id: string
          visitantes: number | null
        }
        Insert: {
          cliques?: number | null
          created_at?: string
          fechamentos?: number | null
          id?: string
          leads?: number | null
          mes_referencia: string
          oportunidades?: number | null
          receita?: number | null
          tenant_id: string
          visitantes?: number | null
        }
        Update: {
          cliques?: number | null
          created_at?: string
          fechamentos?: number | null
          id?: string
          leads?: number | null
          mes_referencia?: string
          oportunidades?: number | null
          receita?: number | null
          tenant_id?: string
          visitantes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "funil_metricas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      ga4_data: {
        Row: {
          bounce_rate: number | null
          conversoes: number | null
          created_at: string
          data: string
          id: string
          sessoes: number | null
          tempo_medio: number | null
          tenant_id: string
          usuarios: number | null
        }
        Insert: {
          bounce_rate?: number | null
          conversoes?: number | null
          created_at?: string
          data: string
          id?: string
          sessoes?: number | null
          tempo_medio?: number | null
          tenant_id: string
          usuarios?: number | null
        }
        Update: {
          bounce_rate?: number | null
          conversoes?: number | null
          created_at?: string
          data?: string
          id?: string
          sessoes?: number | null
          tempo_medio?: number | null
          tenant_id?: string
          usuarios?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ga4_data_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      ga4_paginas: {
        Row: {
          created_at: string
          data: string
          id: string
          pagina: string
          tenant_id: string
          visualizacoes: number | null
        }
        Insert: {
          created_at?: string
          data: string
          id?: string
          pagina: string
          tenant_id: string
          visualizacoes?: number | null
        }
        Update: {
          created_at?: string
          data?: string
          id?: string
          pagina?: string
          tenant_id?: string
          visualizacoes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ga4_paginas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      google_oauth_tokens: {
        Row: {
          access_token: string | null
          created_at: string
          google_email: string | null
          id: string
          refresh_token: string | null
          scopes: string[] | null
          service: string
          tenant_id: string
          token_expiry: string | null
          updated_at: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          google_email?: string | null
          id?: string
          refresh_token?: string | null
          scopes?: string[] | null
          service?: string
          tenant_id: string
          token_expiry?: string | null
          updated_at?: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          google_email?: string | null
          id?: string
          refresh_token?: string | null
          scopes?: string[] | null
          service?: string
          tenant_id?: string
          token_expiry?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "google_oauth_tokens_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      heatmap_clicks: {
        Row: {
          created_at: string
          device: string | null
          id: string
          pagina: string
          pos_x: number
          pos_y: number
          tenant_id: string
        }
        Insert: {
          created_at?: string
          device?: string | null
          id?: string
          pagina: string
          pos_x: number
          pos_y: number
          tenant_id: string
        }
        Update: {
          created_at?: string
          device?: string | null
          id?: string
          pagina?: string
          pos_x?: number
          pos_y?: number
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "heatmap_clicks_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_config: {
        Row: {
          created_at: string
          cta_texto: string | null
          id: string
          imagem_fundo: string | null
          subtitulo: string | null
          tenant_id: string
          titulo: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_texto?: string | null
          id?: string
          imagem_fundo?: string | null
          subtitulo?: string | null
          tenant_id: string
          titulo?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_texto?: string | null
          id?: string
          imagem_fundo?: string | null
          subtitulo?: string | null
          tenant_id?: string
          titulo?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hero_config_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      ia_override_pagina: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          mensagem_inicial_override: string | null
          pagina_slug: string
          prompt_override: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          mensagem_inicial_override?: string | null
          pagina_slug: string
          prompt_override?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          mensagem_inicial_override?: string | null
          pagina_slug?: string
          prompt_override?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ia_override_pagina_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      ia_prompt_versions: {
        Row: {
          created_at: string
          id: string
          prompt_salvo: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          prompt_salvo: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          id?: string
          prompt_salvo?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ia_prompt_versions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      identidade_visual: {
        Row: {
          cor_accent: string | null
          cor_botao_primario: string | null
          cor_botao_secundario: string | null
          cor_fundo: string | null
          cor_primaria: string | null
          cor_secundaria: string | null
          cor_texto: string | null
          created_at: string
          css_personalizado: string | null
          estilo_borda: string | null
          estilo_botoes: string | null
          estilo_cards: string | null
          estilo_menu: string | null
          estilo_sombra: string | null
          favicon: string | null
          fonte_principal: string | null
          fonte_secundaria: string | null
          icone_pwa: string | null
          id: string
          js_personalizado: string | null
          logo_branca: string | null
          logo_principal: string | null
          logo_quadrada: string | null
          og_image: string | null
          peso_fonte: string | null
          tamanho_base: number | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          cor_accent?: string | null
          cor_botao_primario?: string | null
          cor_botao_secundario?: string | null
          cor_fundo?: string | null
          cor_primaria?: string | null
          cor_secundaria?: string | null
          cor_texto?: string | null
          created_at?: string
          css_personalizado?: string | null
          estilo_borda?: string | null
          estilo_botoes?: string | null
          estilo_cards?: string | null
          estilo_menu?: string | null
          estilo_sombra?: string | null
          favicon?: string | null
          fonte_principal?: string | null
          fonte_secundaria?: string | null
          icone_pwa?: string | null
          id?: string
          js_personalizado?: string | null
          logo_branca?: string | null
          logo_principal?: string | null
          logo_quadrada?: string | null
          og_image?: string | null
          peso_fonte?: string | null
          tamanho_base?: number | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          cor_accent?: string | null
          cor_botao_primario?: string | null
          cor_botao_secundario?: string | null
          cor_fundo?: string | null
          cor_primaria?: string | null
          cor_secundaria?: string | null
          cor_texto?: string | null
          created_at?: string
          css_personalizado?: string | null
          estilo_borda?: string | null
          estilo_botoes?: string | null
          estilo_cards?: string | null
          estilo_menu?: string | null
          estilo_sombra?: string | null
          favicon?: string | null
          fonte_principal?: string | null
          fonte_secundaria?: string | null
          icone_pwa?: string | null
          id?: string
          js_personalizado?: string | null
          logo_branca?: string | null
          logo_principal?: string | null
          logo_quadrada?: string | null
          og_image?: string | null
          peso_fonte?: string | null
          tamanho_base?: number | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "identidade_visual_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      imagens_instagram: {
        Row: {
          created_at: string
          id: string
          ordem: number
          tenant_id: string
          url_imagem: string
          url_post: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ordem?: number
          tenant_id: string
          url_imagem: string
          url_post?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ordem?: number
          tenant_id?: string
          url_imagem?: string
          url_post?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "imagens_instagram_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      insights_mensais: {
        Row: {
          created_at: string
          critico: boolean | null
          descricao: string
          icone: string | null
          id: string
          lido: boolean | null
          mes_referencia: string
          tenant_id: string
          tipo: string
        }
        Insert: {
          created_at?: string
          critico?: boolean | null
          descricao: string
          icone?: string | null
          id?: string
          lido?: boolean | null
          mes_referencia: string
          tenant_id: string
          tipo?: string
        }
        Update: {
          created_at?: string
          critico?: boolean | null
          descricao?: string
          icone?: string | null
          id?: string
          lido?: boolean | null
          mes_referencia?: string
          tenant_id?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "insights_mensais_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      layout_versions: {
        Row: {
          changelog: string | null
          created_at: string
          engine_version: number
          id: string
          json_engine: Json | null
          layout_id: string
        }
        Insert: {
          changelog?: string | null
          created_at?: string
          engine_version?: number
          id?: string
          json_engine?: Json | null
          layout_id: string
        }
        Update: {
          changelog?: string | null
          created_at?: string
          engine_version?: number
          id?: string
          json_engine?: Json | null
          layout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "layout_versions_layout_id_fkey"
            columns: ["layout_id"]
            isOneToOne: false
            referencedRelation: "layouts"
            referencedColumns: ["id"]
          },
        ]
      }
      layouts: {
        Row: {
          ativo: boolean
          created_at: string
          engine_version: number | null
          id: string
          json_config: Json | null
          json_engine: Json | null
          nicho: string | null
          nome_layout: string
          preview: string | null
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          engine_version?: number | null
          id?: string
          json_config?: Json | null
          json_engine?: Json | null
          nicho?: string | null
          nome_layout: string
          preview?: string | null
        }
        Update: {
          ativo?: boolean
          created_at?: string
          engine_version?: number | null
          id?: string
          json_config?: Json | null
          json_engine?: Json | null
          nicho?: string | null
          nome_layout?: string
          preview?: string | null
        }
        Relationships: []
      }
      lead_anotacoes: {
        Row: {
          conteudo: string
          created_at: string
          id: string
          lead_id: string
        }
        Insert: {
          conteudo: string
          created_at?: string
          id?: string
          lead_id: string
        }
        Update: {
          conteudo?: string
          created_at?: string
          id?: string
          lead_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_anotacoes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          anotacoes: string | null
          assigned_to: string | null
          bairro: string | null
          cep: string | null
          cidade: string | null
          created_at: string
          data_nascimento: string | null
          email: string | null
          estado: string | null
          filhos: number | null
          id: string
          logradouro: string | null
          nome: string
          numero: string | null
          observacoes: string | null
          origem: string | null
          pagina_origem: string | null
          produto_interesse: string | null
          sexo: string | null
          status: string
          tags: string[] | null
          telefone: string | null
          tenant_id: string
          updated_at: string
          valor_estimado: number | null
        }
        Insert: {
          anotacoes?: string | null
          assigned_to?: string | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          created_at?: string
          data_nascimento?: string | null
          email?: string | null
          estado?: string | null
          filhos?: number | null
          id?: string
          logradouro?: string | null
          nome: string
          numero?: string | null
          observacoes?: string | null
          origem?: string | null
          pagina_origem?: string | null
          produto_interesse?: string | null
          sexo?: string | null
          status?: string
          tags?: string[] | null
          telefone?: string | null
          tenant_id: string
          updated_at?: string
          valor_estimado?: number | null
        }
        Update: {
          anotacoes?: string | null
          assigned_to?: string | null
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          created_at?: string
          data_nascimento?: string | null
          email?: string | null
          estado?: string | null
          filhos?: number | null
          id?: string
          logradouro?: string | null
          nome?: string
          numero?: string | null
          observacoes?: string | null
          origem?: string | null
          pagina_origem?: string | null
          produto_interesse?: string | null
          sexo?: string | null
          status?: string
          tags?: string[] | null
          telefone?: string | null
          tenant_id?: string
          updated_at?: string
          valor_estimado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      link_clicks: {
        Row: {
          cidade: string | null
          created_at: string
          device: string | null
          id: string
          pagina: string | null
          pais: string | null
          tenant_id: string
          tipo: string
          url_destino: string | null
        }
        Insert: {
          cidade?: string | null
          created_at?: string
          device?: string | null
          id?: string
          pagina?: string | null
          pais?: string | null
          tenant_id: string
          tipo: string
          url_destino?: string | null
        }
        Update: {
          cidade?: string | null
          created_at?: string
          device?: string | null
          id?: string
          pagina?: string | null
          pais?: string | null
          tenant_id?: string
          tipo?: string
          url_destino?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "link_clicks_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      mensagens_ia: {
        Row: {
          content: string
          conversa_id: string
          created_at: string
          id: string
          media_caption: string | null
          media_type: string | null
          media_url: string | null
          role: string
          sender_nome: string | null
          tenant_id: string
        }
        Insert: {
          content?: string
          conversa_id: string
          created_at?: string
          id?: string
          media_caption?: string | null
          media_type?: string | null
          media_url?: string | null
          role?: string
          sender_nome?: string | null
          tenant_id: string
        }
        Update: {
          content?: string
          conversa_id?: string
          created_at?: string
          id?: string
          media_caption?: string | null
          media_type?: string | null
          media_url?: string | null
          role?: string
          sender_nome?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mensagens_ia_conversa_id_fkey"
            columns: ["conversa_id"]
            isOneToOne: false
            referencedRelation: "conversas_ia"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensagens_ia_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      metas: {
        Row: {
          created_at: string
          id: string
          mes_referencia: string
          meta_cliques: number | null
          meta_leads: number | null
          meta_oportunidades: number | null
          meta_vendas: number | null
          meta_visitas: number | null
          receita_meta: number | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          mes_referencia: string
          meta_cliques?: number | null
          meta_leads?: number | null
          meta_oportunidades?: number | null
          meta_vendas?: number | null
          meta_visitas?: number | null
          receita_meta?: number | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          mes_referencia?: string
          meta_cliques?: number | null
          meta_leads?: number | null
          meta_oportunidades?: number | null
          meta_vendas?: number | null
          meta_visitas?: number | null
          receita_meta?: number | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "metas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      modo_autonomo_execucoes: {
        Row: {
          aplicado: boolean
          briefing_text: string | null
          created_at: string
          erro: string | null
          id: string
          imagens_geradas: Json | null
          instrucoes_adicionais: string | null
          resultado_ia: Json | null
          seo_local: Json | null
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          aplicado?: boolean
          briefing_text?: string | null
          created_at?: string
          erro?: string | null
          id?: string
          imagens_geradas?: Json | null
          instrucoes_adicionais?: string | null
          resultado_ia?: Json | null
          seo_local?: Json | null
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          aplicado?: boolean
          briefing_text?: string | null
          created_at?: string
          erro?: string | null
          id?: string
          imagens_geradas?: Json | null
          instrucoes_adicionais?: string | null
          resultado_ia?: Json | null
          seo_local?: Json | null
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modo_autonomo_execucoes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          cidade: string | null
          created_at: string
          device: string | null
          id: string
          navegador: string | null
          pagina: string
          pais: string | null
          referrer: string | null
          session_id: string | null
          tenant_id: string
        }
        Insert: {
          cidade?: string | null
          created_at?: string
          device?: string | null
          id?: string
          navegador?: string | null
          pagina: string
          pais?: string | null
          referrer?: string | null
          session_id?: string | null
          tenant_id: string
        }
        Update: {
          cidade?: string | null
          created_at?: string
          device?: string | null
          id?: string
          navegador?: string | null
          pagina?: string
          pais?: string | null
          referrer?: string | null
          session_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_views_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      paginas: {
        Row: {
          ativa: boolean
          canonical_url: string | null
          created_at: string
          id: string
          json_ld: Json | null
          nome: string
          og_image: string | null
          ordem: number | null
          robots: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          ativa?: boolean
          canonical_url?: string | null
          created_at?: string
          id?: string
          json_ld?: Json | null
          nome: string
          og_image?: string | null
          ordem?: number | null
          robots?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          ativa?: boolean
          canonical_url?: string | null
          created_at?: string
          id?: string
          json_ld?: Json | null
          nome?: string
          og_image?: string | null
          ordem?: number | null
          robots?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "paginas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      paginas_servico: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          json_conteudo: Json
          meta_description: string | null
          meta_title: string | null
          nome: string
          slug: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          json_conteudo?: Json
          meta_description?: string | null
          meta_title?: string | null
          nome: string
          slug: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          json_conteudo?: Json
          meta_description?: string | null
          meta_title?: string | null
          nome?: string
          slug?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "paginas_servico_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      perfis: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          nome: string | null
          telefone: string | null
          tenant_id: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id: string
          nome?: string | null
          telefone?: string | null
          tenant_id?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nome?: string | null
          telefone?: string | null
          tenant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "perfis_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      permission_audit_log: {
        Row: {
          action: string
          created_at: string
          details: string | null
          id: string
          tenant_id: string
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: string | null
          id?: string
          tenant_id: string
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: string | null
          id?: string
          tenant_id?: string
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permission_audit_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos: {
        Row: {
          ativo: boolean
          categoria_id: string | null
          created_at: string
          descricao: string | null
          id: string
          imagem: string | null
          meta_description: string | null
          meta_title: string | null
          nome: string
          preco: number | null
          slug: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          categoria_id?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          imagem?: string | null
          meta_description?: string | null
          meta_title?: string | null
          nome: string
          preco?: number | null
          slug: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          categoria_id?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          imagem?: string | null
          meta_description?: string | null
          meta_title?: string | null
          nome?: string
          preco?: number | null
          slug?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "produtos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      push_automations: {
        Row: {
          created_at: string | null
          delay_minutes: number | null
          frequency_limit_days: number | null
          id: string
          is_active: boolean | null
          name: string
          notification_config: Json
          tenant_id: string
          total_triggered: number | null
          trigger_config: Json
          type: string
        }
        Insert: {
          created_at?: string | null
          delay_minutes?: number | null
          frequency_limit_days?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          notification_config?: Json
          tenant_id: string
          total_triggered?: number | null
          trigger_config?: Json
          type?: string
        }
        Update: {
          created_at?: string | null
          delay_minutes?: number | null
          frequency_limit_days?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          notification_config?: Json
          tenant_id?: string
          total_triggered?: number | null
          trigger_config?: Json
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_automations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      push_events: {
        Row: {
          event_type: string
          id: string
          occurred_at: string | null
          send_id: string
          subscriber_id: string
        }
        Insert: {
          event_type: string
          id?: string
          occurred_at?: string | null
          send_id: string
          subscriber_id: string
        }
        Update: {
          event_type?: string
          id?: string
          occurred_at?: string | null
          send_id?: string
          subscriber_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_events_send_id_fkey"
            columns: ["send_id"]
            isOneToOne: false
            referencedRelation: "push_sends"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "push_events_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "push_subscribers"
            referencedColumns: ["id"]
          },
        ]
      }
      push_notifications: {
        Row: {
          action_button_text: string | null
          action_button_url: string | null
          action_url: string
          body: string
          created_at: string | null
          icon_url: string | null
          id: string
          image_url: string | null
          sent_at: string | null
          status: string | null
          tenant_id: string
          title: string
        }
        Insert: {
          action_button_text?: string | null
          action_button_url?: string | null
          action_url?: string
          body: string
          created_at?: string | null
          icon_url?: string | null
          id?: string
          image_url?: string | null
          sent_at?: string | null
          status?: string | null
          tenant_id: string
          title: string
        }
        Update: {
          action_button_text?: string | null
          action_button_url?: string | null
          action_url?: string
          body?: string
          created_at?: string | null
          icon_url?: string | null
          id?: string
          image_url?: string | null
          sent_at?: string | null
          status?: string | null
          tenant_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_notifications_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      push_schedules: {
        Row: {
          created_at: string | null
          id: string
          notification_id: string
          recurrence_days: number[] | null
          recurrence_max_count: number | null
          recurrence_type: string | null
          recurrence_until: string | null
          scheduled_for: string
          segment_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_id: string
          recurrence_days?: number[] | null
          recurrence_max_count?: number | null
          recurrence_type?: string | null
          recurrence_until?: string | null
          scheduled_for: string
          segment_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_id?: string
          recurrence_days?: number[] | null
          recurrence_max_count?: number | null
          recurrence_type?: string | null
          recurrence_until?: string | null
          scheduled_for?: string
          segment_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_schedules_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "push_notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "push_schedules_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "push_segments"
            referencedColumns: ["id"]
          },
        ]
      }
      push_segments: {
        Row: {
          created_at: string | null
          id: string
          name: string
          rules: Json
          subscriber_count: number | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          rules?: Json
          subscriber_count?: number | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          rules?: Json
          subscriber_count?: number | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_segments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      push_sends: {
        Row: {
          created_at: string | null
          id: string
          notification_id: string
          scheduled_for: string | null
          segment_id: string | null
          sent_at: string | null
          target_type: string
          total_delivered: number | null
          total_opened: number | null
          total_sent: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_id: string
          scheduled_for?: string | null
          segment_id?: string | null
          sent_at?: string | null
          target_type?: string
          total_delivered?: number | null
          total_opened?: number | null
          total_sent?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_id?: string
          scheduled_for?: string | null
          segment_id?: string | null
          sent_at?: string | null
          target_type?: string
          total_delivered?: number | null
          total_opened?: number | null
          total_sent?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "push_sends_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "push_notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "push_sends_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "push_segments"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscribers: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          id: string
          is_active: boolean | null
          os: string | null
          state: string | null
          subscription_json: Json
          tags: string[] | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          is_active?: boolean | null
          os?: string | null
          state?: string | null
          subscription_json: Json
          tags?: string[] | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          is_active?: boolean | null
          os?: string | null
          state?: string | null
          subscription_json?: Json
          tags?: string[] | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_subscribers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      ranking_mensal: {
        Row: {
          created_at: string
          crescimento_percentual: number | null
          id: string
          mes_referencia: string
          score_geral: number | null
          taxa_conversao: number | null
          tenant_id: string
          total_cliques_whatsapp: number | null
          total_leads: number | null
        }
        Insert: {
          created_at?: string
          crescimento_percentual?: number | null
          id?: string
          mes_referencia: string
          score_geral?: number | null
          taxa_conversao?: number | null
          tenant_id: string
          total_cliques_whatsapp?: number | null
          total_leads?: number | null
        }
        Update: {
          created_at?: string
          crescimento_percentual?: number | null
          id?: string
          mes_referencia?: string
          score_geral?: number | null
          taxa_conversao?: number | null
          tenant_id?: string
          total_cliques_whatsapp?: number | null
          total_leads?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ranking_mensal_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      scripts_customizados: {
        Row: {
          ativo: boolean
          codigo: string
          created_at: string
          id: string
          local: string
          nome: string
          observacao: string | null
          paginas_especificas: Json | null
          tenant_id: string
          tipo: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          codigo?: string
          created_at?: string
          id?: string
          local?: string
          nome: string
          observacao?: string | null
          paginas_especificas?: Json | null
          tenant_id: string
          tipo?: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          codigo?: string
          created_at?: string
          id?: string
          local?: string
          nome?: string
          observacao?: string | null
          paginas_especificas?: Json | null
          tenant_id?: string
          tipo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scripts_customizados_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      search_console_data: {
        Row: {
          cliques: number | null
          created_at: string
          ctr: number | null
          data: string
          id: string
          impressoes: number | null
          posicao_media: number | null
          tenant_id: string
        }
        Insert: {
          cliques?: number | null
          created_at?: string
          ctr?: number | null
          data: string
          id?: string
          impressoes?: number | null
          posicao_media?: number | null
          tenant_id: string
        }
        Update: {
          cliques?: number | null
          created_at?: string
          ctr?: number | null
          data?: string
          id?: string
          impressoes?: number | null
          posicao_media?: number | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_console_data_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      search_console_keywords: {
        Row: {
          cliques: number | null
          created_at: string
          ctr: number | null
          data: string
          id: string
          impressoes: number | null
          keyword: string
          pagina: string | null
          posicao_media: number | null
          tenant_id: string
        }
        Insert: {
          cliques?: number | null
          created_at?: string
          ctr?: number | null
          data: string
          id?: string
          impressoes?: number | null
          keyword: string
          pagina?: string | null
          posicao_media?: number | null
          tenant_id: string
        }
        Update: {
          cliques?: number | null
          created_at?: string
          ctr?: number | null
          data?: string
          id?: string
          impressoes?: number | null
          keyword?: string
          pagina?: string | null
          posicao_media?: number | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_console_keywords_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      servicos: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          id: string
          imagem: string | null
          nome: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          imagem?: string | null
          nome: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          imagem?: string | null
          nome?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "servicos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      site_screenshots: {
        Row: {
          autor: string | null
          created_at: string
          descricao_alteracao: string | null
          id: string
          imagem_url: string | null
          pagina: string
          secoes_modificadas: string[] | null
          tenant_id: string
          tipo_alteracao: string | null
          url_capturada: string
        }
        Insert: {
          autor?: string | null
          created_at?: string
          descricao_alteracao?: string | null
          id?: string
          imagem_url?: string | null
          pagina?: string
          secoes_modificadas?: string[] | null
          tenant_id: string
          tipo_alteracao?: string | null
          url_capturada: string
        }
        Update: {
          autor?: string | null
          created_at?: string
          descricao_alteracao?: string | null
          id?: string
          imagem_url?: string | null
          pagina?: string
          secoes_modificadas?: string[] | null
          tenant_id?: string
          tipo_alteracao?: string | null
          url_capturada?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_screenshots_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      sitemap_endpoints: {
        Row: {
          created_at: string
          id: string
          tenant_id: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          tenant_id: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          tenant_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "sitemap_endpoints_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      sitemap_logs: {
        Row: {
          created_at: string
          enviado_em: string
          erro: string | null
          id: string
          resposta_google: string | null
          sitemap_version_id: string | null
          status: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          enviado_em?: string
          erro?: string | null
          id?: string
          resposta_google?: string | null
          sitemap_version_id?: string | null
          status?: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          enviado_em?: string
          erro?: string | null
          id?: string
          resposta_google?: string | null
          sitemap_version_id?: string | null
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sitemap_logs_sitemap_version_id_fkey"
            columns: ["sitemap_version_id"]
            isOneToOne: false
            referencedRelation: "sitemap_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sitemap_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      sitemap_urls: {
        Row: {
          changefreq: string
          created_at: string
          id: string
          images: Json | null
          lastmod: string | null
          loc: string
          priority: string
          tenant_id: string
          tipo: string
          updated_at: string
        }
        Insert: {
          changefreq?: string
          created_at?: string
          id?: string
          images?: Json | null
          lastmod?: string | null
          loc: string
          priority?: string
          tenant_id: string
          tipo?: string
          updated_at?: string
        }
        Update: {
          changefreq?: string
          created_at?: string
          id?: string
          images?: Json | null
          lastmod?: string | null
          loc?: string
          priority?: string
          tenant_id?: string
          tipo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sitemap_urls_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      sitemap_versions: {
        Row: {
          created_at: string
          enviado_gsc: boolean
          enviado_ping: boolean | null
          generated_at: string
          id: string
          observacoes: string | null
          status: string
          tenant_id: string
          total_images: number
          total_urls: number
          urls_json: Json | null
          version_number: number
        }
        Insert: {
          created_at?: string
          enviado_gsc?: boolean
          enviado_ping?: boolean | null
          generated_at?: string
          id?: string
          observacoes?: string | null
          status?: string
          tenant_id: string
          total_images?: number
          total_urls?: number
          urls_json?: Json | null
          version_number?: number
        }
        Update: {
          created_at?: string
          enviado_gsc?: boolean
          enviado_ping?: boolean | null
          generated_at?: string
          id?: string
          observacoes?: string | null
          status?: string
          tenant_id?: string
          total_images?: number
          total_urls?: number
          urls_json?: Json | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "sitemap_versions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      system_modules: {
        Row: {
          category: string
          created_at: string
          id: string
          name: string
          slug: string
          version: number
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          name: string
          slug: string
          version?: number
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          name?: string
          slug?: string
          version?: number
        }
        Relationships: []
      }
      tenant_email_identities: {
        Row: {
          created_at: string
          from_email: string
          from_name: string
          id: string
          is_default: boolean
          is_verified: boolean
          label: string
          reply_to: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string
          from_email?: string
          from_name?: string
          id?: string
          is_default?: boolean
          is_verified?: boolean
          label?: string
          reply_to?: string | null
          tenant_id: string
        }
        Update: {
          created_at?: string
          from_email?: string
          from_name?: string
          id?: string
          is_default?: boolean
          is_verified?: boolean
          label?: string
          reply_to?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_email_identities_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_email_settings: {
        Row: {
          created_at: string
          from_email_default: string | null
          from_name_default: string | null
          id: string
          is_active: boolean
          provider_type: string
          reply_to_default: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_email_default?: string | null
          from_name_default?: string | null
          id?: string
          is_active?: boolean
          provider_type?: string
          reply_to_default?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_email_default?: string | null
          from_name_default?: string | null
          id?: string
          is_active?: boolean
          provider_type?: string
          reply_to_default?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_email_settings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_permissions: {
        Row: {
          can_create: boolean
          can_delete: boolean
          can_edit: boolean
          can_export: boolean
          can_view: boolean
          created_at: string
          id: string
          module_id: string
          role_id: string
          tenant_id: string
        }
        Insert: {
          can_create?: boolean
          can_delete?: boolean
          can_edit?: boolean
          can_export?: boolean
          can_view?: boolean
          created_at?: string
          id?: string
          module_id: string
          role_id: string
          tenant_id: string
        }
        Update: {
          can_create?: boolean
          can_delete?: boolean
          can_edit?: boolean
          can_export?: boolean
          can_view?: boolean
          created_at?: string
          id?: string
          module_id?: string
          role_id?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_permissions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "system_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "tenant_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_permissions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_roles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_system: boolean
          name: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_system?: boolean
          name: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_system?: boolean
          name?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_smtp_credentials: {
        Row: {
          created_at: string
          dkim_enabled: boolean
          host: string
          id: string
          last_test_error: string | null
          last_test_status: string
          last_tested_at: string | null
          password_encrypted: string
          port: number
          secure: boolean
          tenant_id: string
          tls_required: boolean
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          dkim_enabled?: boolean
          host?: string
          id?: string
          last_test_error?: string | null
          last_test_status?: string
          last_tested_at?: string | null
          password_encrypted?: string
          port?: number
          secure?: boolean
          tenant_id: string
          tls_required?: boolean
          updated_at?: string
          username?: string
        }
        Update: {
          created_at?: string
          dkim_enabled?: boolean
          host?: string
          id?: string
          last_test_error?: string | null
          last_test_status?: string
          last_tested_at?: string | null
          password_encrypted?: string
          port?: number
          secure?: boolean
          tenant_id?: string
          tls_required?: boolean
          updated_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_smtp_credentials_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_user_roles: {
        Row: {
          created_at: string
          id: string
          role_id: string
          status: string
          tenant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role_id: string
          status?: string
          tenant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role_id?: string
          status?: string
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "tenant_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_user_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      vitrine_slides: {
        Row: {
          ativo: boolean
          created_at: string
          cta_texto: string | null
          id: string
          imagem_url: string | null
          ordem: number
          subtitulo: string | null
          tenant_id: string
          titulo: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          cta_texto?: string | null
          id?: string
          imagem_url?: string | null
          ordem?: number
          subtitulo?: string | null
          tenant_id: string
          titulo?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          cta_texto?: string | null
          id?: string
          imagem_url?: string | null
          ordem?: number
          subtitulo?: string | null
          tenant_id?: string
          titulo?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vitrine_slides_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_debug_logs: {
        Row: {
          created_at: string
          error: string | null
          id: string
          parsed_info: Json | null
          payload: Json | null
          source: string | null
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          parsed_info?: Json | null
          payload?: Json | null
          source?: string | null
        }
        Update: {
          created_at?: string
          error?: string | null
          id?: string
          parsed_info?: Json | null
          payload?: Json | null
          source?: string | null
        }
        Relationships: []
      }
      whatsapp_ai_config: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          max_historico: number
          modelo: string
          pausar_se_humano: boolean
          prompt_sistema: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          max_historico?: number
          modelo?: string
          pausar_se_humano?: boolean
          prompt_sistema?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          max_historico?: number
          modelo?: string
          pausar_se_humano?: boolean
          prompt_sistema?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_ai_config_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_user_role: {
        Args: { p_role_id: string; p_tenant_id: string; p_user_id: string }
        Returns: undefined
      }
      decrypt_smtp_password: {
        Args: { encrypted_text: string; encryption_key: string }
        Returns: string
      }
      encrypt_smtp_password: {
        Args: { encryption_key: string; plain_text: string }
        Returns: string
      }
      find_profile_by_email: {
        Args: { p_email: string }
        Returns: {
          email: string
          id: string
          nome: string
        }[]
      }
      get_next_atendente: { Args: { p_tenant_id: string }; Returns: string }
      get_tenant_employees: {
        Args: { p_tenant_id: string }
        Returns: {
          assignment_id: string
          role_id: string
          role_name: string
          status: string
          user_email: string
          user_id: string
          user_name: string
        }[]
      }
      get_tenant_smtp_config: {
        Args: { p_encryption_key: string; p_tenant_id: string }
        Returns: {
          smtp_from_email: string
          smtp_from_name: string
          smtp_host: string
          smtp_password: string
          smtp_port: number
          smtp_reply_to: string
          smtp_secure: boolean
          smtp_tls_required: boolean
          smtp_username: string
        }[]
      }
      get_user_tenant_id: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_atendimento: {
        Args: { p_tenant_id: string; p_user_id: string }
        Returns: boolean
      }
      mopen_list_tables: {
        Args: never
        Returns: {
          table_name: string
        }[]
      }
      normalize_phone_br: { Args: { p: string }; Returns: string }
      transferir_conversa: {
        Args: {
          p_assigned_nome: string
          p_assigned_to: string
          p_conversa_ids: string[]
          p_tenant_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "master" | "admin_empresa" | "colaborador"
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
      app_role: ["master", "admin_empresa", "colaborador"],
    },
  },
} as const
