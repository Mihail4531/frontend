// src/entities/rule/index.ts

// 1. Экспортируем UI-компоненты, которые можно использовать снаружи
export { RuleCard } from "./ui/rule-card";

// 2. Экспортируем API, чтобы страница могла загружать данные
export { ruleApi } from "./api/rule.api";

// 3. Экспортируем Типы, если они нужны снаружи (например, в пропсах)
export type { Rule } from "./model/types";