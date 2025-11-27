export const SkillTag = ({ label }: { label: string }) => (
  <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg text-sm font-medium hover:border-red-900/50 hover:bg-red-950/10 hover:text-red-200 transition-colors cursor-default">
    {label}
  </span>
);