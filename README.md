<div align="center">

# ⚔️ Team Elektros Scout

**Plataforma de scouting competitivo para Clash of Clans**

Convierte una hoja de Excel con cientos de ataques de torneos en estadísticas accionables: qué ejércitos funcionan, contra qué bases y qué jugadores rinden mejor.

[![Demo](https://img.shields.io/badge/Demo-en_vivo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://elektro-scouting-new-xovn.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 💡 La idea

En las competiciones de Clash of Clans, preparar una guerra implica estudiar cómo atacan y defienden los rivales. **Team Elektros Scout** centraliza todos los ataques registrados en ladders, clasificatorias y finales, y los convierte en un panel interactivo para que el equipo tome decisiones basadas en datos.

## ✨ Funcionalidades

| Sección | Qué ofrece |
|---|---|
| 📊 **Overview** | Resumen general del meta, tasa de triples (*hit rate*) por estilo de base y por torre de hechizos, y evolución del meta por competición. |
| 👤 **Players** | Rendimiento individual de cada atacante: estrellas medias, porcentaje y ejércitos más usados. |
| 🛡️ **Teams** | Perfil de cada equipo rival: qué bases usa y cómo le atacan (tierra vs. aire). |
| 🧪 **Combos** | Ranking de combinaciones ejército + base + torre de hechizos con su hit rate y nº de ataques. |
| 🎥 **Matches** | Histórico de partidas con enlaces a la partida y al stream. |
| 📁 **Data** | Importación de un Excel (`.xlsx`) que sustituye la base de datos en un clic. |

Además:

- 🌗 Modo claro y oscuro.
- 🪂 **Clasificación automática tierra/aire** de cada ejército a partir de su composición.
- 🧹 Normalización de nombres de equipos, bases y ejércitos para que las estadísticas no se fragmenten por erratas.
- 🔍 Filtros por competición (ladder, clasificatoria y final de cada mes) y umbral mínimo de ataques para estadísticas fiables.

## 🧱 Arquitectura

```
Excel de ataques ──> Importación en el navegador (SheetJS) ──> Supabase (PostgreSQL)
                                                                   │
                     Panel Next.js + Recharts  <───────────────────┘
```

## 🚀 Puesta en marcha

1. Crea un proyecto en [Supabase](https://supabase.com) y ejecuta [`supabase/schema.sql`](supabase/schema.sql).
2. Crea un archivo `.env.local` con:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...   # solo en el servidor
   ADMIN_PASSWORD=...              # contraseña para importar el Excel
   ```
   La clave pública solo permite leer; la importación pasa por `/api/upload`, que exige la contraseña de administrador.
3. Instala y arranca:
   ```bash
   npm install
   npm run dev
   ```

## 📁 Estructura

```
├── app/
│   ├── page.tsx          # Panel completo (secciones, gráficos, importación)
│   ├── layout.tsx        # Layout + Vercel Analytics y Speed Insights
│   └── globals.css
├── lib/
│   ├── analytics.ts      # Normalización, estadísticas de combos y clasificación tierra/aire
│   ├── supabase.ts       # Cliente de Supabase
│   └── types.ts          # Tipos de datos (ataques, combos)
└── supabase/schema.sql   # Esquema de la base de datos
```

---

<div align="center">
Hecho por <a href="https://github.com/diegotraski">Diego Trascasa García</a> para Team Elektros
</div>
