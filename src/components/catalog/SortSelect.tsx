"use client";

import type { ProductSort } from "@/domain/product";

interface SortSelectProps {
  value: string;
  options: Array<{ value: ProductSort; label: string }>;
  onChange: (value: ProductSort) => void;
}

export function SortSelect({ value, options, onChange }: SortSelectProps) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="text-muted">Ordenar por</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ProductSort)}
        className="h-11 cursor-pointer rounded-brand border border-line bg-bg px-3 outline-none transition-colors duration-300 hover:border-fg focus:border-fg"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
