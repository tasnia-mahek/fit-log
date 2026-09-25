# FitLog — Dark Gym Workout Companion

FitLog is a dark-themed, responsive web application designed for focused strength training. Athletes can browse lifts across all major muscle groups, review exercise biomechanics, build a 5-exercise daily routine, and log their training metrics in real time.

## 🚀 Live Demo & Links
- **Live Deployment:** [Your Vercel/Netlify Deployment URL]
- **GitHub Repository:** [Your GitHub Repo URL]

## 🛠️ Technologies Used
- **Next.js (App Router):** Fast client and server page rendering and dynamic route management.
- **TypeScript:** Strict type enforcement across components, context, and external API responses.
- **Tailwind CSS:** Responsive utility styling and dark aesthetic matching Figma design tokens.
- **Lucide React:** Modern icons for stats, status markers, and actions.
- **Cloudflare Workers API:** Dynamic backend delivering workout specifications and details.

## ✨ 5 Key Features
1. **Interactive Lift Library & Dynamic Sorting:** Complete exercise directory featuring real-time client-side sorting by Duration, Calories burned, or Rating.
2. **Dynamic Daily Planner with 5-Lift Cap:** Prevents overtraining by enforcing a strict 5-lift cap for the current day's routine.
3. **Real-time Live Metrics Dashboard:** Automatically tallies planned exercises, total duration (minutes), and cumulative calorie expenditure.
4. **Interactive Completion Logging:** Toggle workouts as "Done" with strikethrough feedback and non-blocking toast notifications.
5. **Session Persistence:** Full `localStorage` synchronization ensuring Today's Plan, Saved Lifts, and Navbar counts survive browser refreshes.