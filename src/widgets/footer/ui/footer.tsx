import Link from "next/link";
import { Terminal, Github, Twitter, Disc } from "lucide-react";
import { footerNavigation } from "@/widgets/footer/confg/links"; // Импорт из соседнего сегмента

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-zinc-400 mt-auto">
      {/* Декоративная сетка (как на главной) */}
      <div className="relative w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Колонка 1: Брендинг */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-white mb-4 group"
            >
              <div className="p-1.5 rounded bg-white/10 border border-white/5 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-colors">
                <Terminal className="w-5 h-5 text-zinc-200 group-hover:text-red-500 transition-colors" />
              </div>
              <span className="font-bold tracking-tight">Dev Community</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500 mb-6">
              Платформа для разработчиков. Делитесь кодом, обсуждайте
              архитектуру, развивайтесь вместе.
            </p>

            {/* Соцсети */}
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Disc className="w-5 h-5" /> {/* Discord icon placeholder */}
              </Link>
            </div>
          </div>

          {/* Колонки навигации (генерируются из конфига) */}
          {footerNavigation.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-red-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Нижняя часть: Копирайт */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 font-mono">
          <p>&copy; {new Date().getFullYear()} Dev Community. Open Source.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
