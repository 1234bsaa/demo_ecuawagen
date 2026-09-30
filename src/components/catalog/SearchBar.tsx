"use client";

import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/** Buscador con debounce; el campo se expande al enfocarlo. */
export function SearchBar({ value, onChange }: SearchBarProps) {
  const [text, setText] = useState(value);
  const last = useRef(value);

  // Sincroniza cuando la URL cambia desde fuera (p. ej. "limpiar filtros").
  useEffect(() => {
    if (value !== last.current) {
      last.current = value;
      setText(value);
    }
  }, [value]);

  useEffect(() => {
    if (text === last.current) return;
    const id = setTimeout(() => {
      last.current = text;
      onChange(text.trim());
    }, 300);
    return () => clearTimeout(id);
  }, [text, onChange]);

  return (
    <label className="relative block w-full sm:w-64 sm:transition-[width] sm:duration-500 sm:ease-out sm:focus-within:w-80">
      <span className="sr-only">Buscar productos</span>
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="7" cy="7" r="4.5" />
        <path d="m10.5 10.5 3 3" />
      </svg>
      <input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Buscar productos"
        className="h-11 w-full rounded-brand border border-line bg-bg pl-10 pr-3 text-sm outline-none transition-colors duration-300 placeholder:text-muted focus:border-fg"
      />
    </label>
  );
}
