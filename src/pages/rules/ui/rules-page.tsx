import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";
import { Rule, ruleApi, RuleCard } from "@/entities/rule"; 
export const revalidate = 0; 
export const RulesPage = async () => {
  
   let rules: Rule[] = [];
  try {
    rules = await ruleApi.getAll();
  } catch (e) {
    console.error("Ошибка загрузки правил:", e);
  }
  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-900/30 selection:text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-white transition-colors mb-6 text-sm font-mono group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Назад на главную
          </Link>
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center self-start gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-[10px] font-mono text-red-400 uppercase tracking-wider">
              <Scale className="w-3 h-3" />
              <span>Protocol v1.0</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
             Правила Сообщества
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
              Чтобы наше комьюнити оставалось полезным и комфортным местом для разработчиков, мы просим соблюдать этот простой кодекс.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rules.length > 0 ? (
    // 👇 ДОБАВЛЯЕМ index в аргументы map
    rules.map((rule, index) => (
      <RuleCard 
        key={rule.id} 
        rule={rule} 
        index={index + 1} 
      />
    ))
  ) : (
            <div className="col-span-2 py-20 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
              <p className="text-zinc-500">Список правил временно недоступен или пуст.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};