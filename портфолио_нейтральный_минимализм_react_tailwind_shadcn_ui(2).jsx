import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Download, ExternalLink, ArrowRight, Moon, Sun, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// ====== Config (заполни под себя) ======
const PROFILE = {
  name: "Qudratjon",
  role: "Python Backend • Cybersecurity Trainee",
  location: "Tashkent, Uzbekistan",
  email: "tolipjonovqudratillo\n0423@gmail.com",
  phone: "+998 91 325 0017",
  about:
    "Я делаю быстрые и надёжные веб‑сервисы на Python/Django и изучаю кибербезопасность. Люблю чистый код, автоматизацию и практичные решения.",
  avatar: "https://avatars.githubusercontent.com/u/9919?s=200&v=4", // замените на своё фото/URL
  socials: {
    github: "https://github.com/tolipjonovqudratillo0423/",
    linkedin: "https://www.linkedin.com/in/qudratillotolipjonov0423/",
    email: "mailto:tolipjonovqudratillo@gmail.com",
  },
  cv: "/cv.pdf", // положите файл в public
};

const TAGS = [
  "Python", "Django", "DRF", "PostgreSQL", "Docker", "Linux", "Git", "Nginx", "REST API", "Auth", "CI/CD",
];

const PROJECTS = [
  {
    title: "TaskFlow API",
    description:
      "Масштабируемый REST API для управления задачами с ролями и JWT‑аутентификацией. Лимиты, очереди, линтеры, тесты.",
    stack: ["Django", "DRF", "PostgreSQL", "Redis", "Docker"],
    link: "https://example.com",
    repo: "https://github.com/username/taskflow-api",
    impact: "−35% время ручных операций, +42% производительность команды",
  },
  {
    title: "SecureNotes",
    description:
      "Мини‑сервис заметок с шифрованием, двухфакторной аутентификацией и защитой от брут‑форса.",
    stack: ["Django", "Argon2", "TOTP", "Tailwind"],
    link: "https://example.com",
    repo: "https://github.com/username/securenotes",
    impact: "OWASP Top 10 — покрытие ключевых рисков",
  },
  {
    title: "ShopLite",
    description:
      "Лёгкий e‑commerce: каталоги, корзина, оплата (mock), веб‑хуки, веб‑кэширование, админ‑панель.",
    stack: ["Django", "DRF", "Celery", "Stripe (test)"],
    link: "https://example.com",
    repo: "https://tolipjonovqudratillo0423.github.io/project/",
    impact: "TTFB < 100ms на Vercel proxy",
  },
];

const EXPERIENCE = [
  { year: "2025 — наст.время", title: "Python Backend (Django)", where: "Najot Ta'lim — обучение", details: "DRF, авторизация, ORM, деплой, Docker, тестирование." },
  { year: "2024 — 2025", title: "Стажёр кибербезопасности", where: "Haad/HAT — курсы", details: "Red‑Zero/Red‑One основы: анализ уязвимостей, Linux, сети." },
];

// ====== Вспомогательные компоненты ======
function useThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark"); else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
}

function Typewriter({ words, speed = 120, pause = 1200 }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const current = words[index % words.length];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (sub < current.length) setSub(sub + 1);
        else setDeleting(true);
      } else {
        if (sub > 0) setSub(sub - 1);
        else { setDeleting(false); setIndex((i) => i + 1); }
      }
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [sub, deleting, current, speed]);

  useEffect(() => {
    if (sub === current.length && !deleting) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
  }, [sub, deleting, current, pause]);

  return (
    <span className="relative inline-flex items-center">
      <span className="tabular-nums">{current.slice(0, sub)}</span>
      <span className="ml-0.5 h-6 w-[2px] animate-pulse bg-zinc-900 dark:bg-zinc-100" />
    </span>
  );
}

function SectionTitle({ k, title, subtitle }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500">
        <span className="h-[1px] w-6 bg-zinc-300 dark:bg-zinc-700" />
        {k}
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h2>
      {subtitle && <p className="text-zinc-600 dark:text-zinc-400">{subtitle}</p>}
    </div>
  );
}

// ====== Главный компонент ======
export default function Portfolio() {
  const { dark, setDark } = useThemeToggle();

  const words = useMemo(
    () => ["Python Backend", "Django/DRF", "Cybersecurity Trainee", "Linux & Docker", "REST API"],
    []
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      {/* Навбар */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-zinc-900/40 border-b border-zinc-200/50 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 ring-1 ring-zinc-200 dark:ring-zinc-800">
              <AvatarImage src={PROFILE.avatar} alt={PROFILE.name} />
              <AvatarFallback>{PROFILE.name.slice(0,1)}</AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <div className="font-semibold">{PROFILE.name}</div>
              <div className="text-xs text-zinc-500">{PROFILE.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href={PROFILE.socials.github} aria-label="GitHub" target="_blank" rel="noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={PROFILE.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={PROFILE.socials.email} aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>

            <Separator orientation="vertical" className="mx-2 hidden sm:block" />

            <Button variant="outline" className="hidden sm:flex" asChild>
              <a href={PROFILE.cv} download>
                <Download className="mr-2 h-4 w-4" />Скачать CV
              </a>
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Привет! Я {PROFILE.name}
            </motion.h1>

            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              <Typewriter words={words} />
            </p>

            <p className="max-w-prose text-zinc-700 dark:text-zinc-300">
              {PROFILE.about}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#projects">
                  Посмотреть проекты <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={PROFILE.cv} download>
                  <Download className="mr-2 h-4 w-4" /> Скачать CV
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {TAGS.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Card className="border-zinc-200/80 dark:border-zinc-800/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {PROFILE.location}
                </CardTitle>
                <CardDescription>Доступен к сотрудничеству и стажировкам</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="text-zinc-500">Email</div>
                    <a href={`mailto:${PROFILE.email}`} className="font-medium hover:underline">{PROFILE.email}</a>
                  </div>
                  <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="text-zinc-500">Телефон</div>
                    <a href={`tel:${PROFILE.phone}`} className="font-medium hover:underline">{PROFILE.phone}</a>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-1 ring-zinc-200 dark:ring-zinc-800">
                    <AvatarImage src={PROFILE.avatar} alt={PROFILE.name} />
                    <AvatarFallback>{PROFILE.name.slice(0,1)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    "Фокус на результате, безопасность по умолчанию, простота в эксплуатации."
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle k="Проекты" title="Подборка моих работ" subtitle="Открытый код, понятная архитектура и метрики" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Card key={p.title} className="group flex flex-col border-zinc-200/80 transition hover:shadow-lg dark:border-zinc-800/80">
              <CardHeader>
                <CardTitle className="text-lg">{p.title}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Badge key={s} variant="outline" className="rounded-full">
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Влияние: {p.impact}</div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="secondary" asChild>
                  <a href={p.repo} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Репозиторий
                  </a>
                </Button>
                <Button variant="ghost" asChild>
                  <a href={p.link} target="_blank" rel="noreferrer">
                    Демо <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Опыт */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle k="Опыт" title="Образование и практика" />
        <div className="mt-8 grid gap-4">
          {EXPERIENCE.map((e) => (
            <div key={e.title} className="grid items-start gap-2 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
              <div className="text-xs text-zinc-500">{e.year}</div>
              <div className="text-base font-medium">{e.title} — <span className="text-zinc-500">{e.where}</span></div>
              <div className="text-zinc-600 dark:text-zinc-400">{e.details}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Контакты */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle k="Контакты" title="Связаться со мной" subtitle="Ответ обычно в течение дня" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="border-zinc-200/80 dark:border-zinc-800/80">
            <CardHeader>
              <CardTitle>Написать сообщение</CardTitle>
              <CardDescription>Форма без бэкенда — откроется ваш почтовый клиент</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <Card className="border-zinc-200/80 dark:border-zinc-800/80">
            <CardHeader>
              <CardTitle>Быстрые ссылки</CardTitle>
              <CardDescription>GitHub, LinkedIn, Email</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <QuickLink href={PROFILE.socials.github} icon={<Github className="h-4 w-4" />} label="GitHub" />
              <QuickLink href={PROFILE.socials.linkedin} icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
              <QuickLink href={PROFILE.socials.email} icon={<Mail className="h-4 w-4" />} label="Email" />
              <QuickLink href={`tel:${PROFILE.phone}`} icon={<Phone className="h-4 w-4" />} label="Позвонить" />
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-xs text-zinc-500">
        © {new Date().getFullYear()} {PROFILE.name}. Сделано с любовью к минимализму.
      </footer>
    </div>
  );
}

function QuickLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex items-center justify-between rounded-xl border border-zinc-200 p-3 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
    >
      <span className="flex items-center gap-3 text-sm">
        {icon}
        {label}
      </span>
      <ExternalLink className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
    </a>
  );
}

function ContactForm() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  function handleSubmit(e) {
    e.preventDefault();
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const message = messageRef.current?.value || "";
    const body = encodeURIComponent(`Привет, я ${name}.\n\n${message}\n\nСвязь: ${email}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Письмо с портфолио")}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input ref={nameRef} placeholder="Ваше имя" required />
      <Input ref={emailRef} type="email" placeholder="Ваш email" required />
      <Textarea ref={messageRef} placeholder="Коротко о задаче" required rows={5} />
      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-500">Нажимая «Отправить», откроется почтовый клиент</div>
        <Button type="submit">Отправить</Button>
      </div>
    </form>
  );
}
 <div className=""></div>