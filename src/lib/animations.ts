
import { cn } from "./utils";

// Tipos de animações disponíveis
type AnimationVariant = 
  | "fade-in"
  | "slide-in"
  | "scale-in"
  | "bounce"
  | "pulse";

// Opções de delay para animações
type AnimationDelay = 
  | "delay-0"
  | "delay-100"
  | "delay-200"
  | "delay-300"
  | "delay-400"
  | "delay-500";

// Interface para configuração de animações
interface AnimationOptions {
  variant?: AnimationVariant;
  delay?: AnimationDelay;
  duration?: string;
  className?: string;
}

/**
 * Gera classes CSS para animação baseada nas opções fornecidas
 */
export function animate(options: AnimationOptions = {}): string {
  const {
    variant = "fade-in",
    delay = "delay-0",
    duration = "duration-500",
    className = "",
  } = options;

  return cn(
    variant,
    delay,
    duration,
    "animate-once",
    className
  );
}

/**
 * Aplica animação de entrada em cascata para um grupo de elementos
 * @param baseClassName Classe base para todos os elementos
 * @param itemCount Número total de elementos a animar
 * @param delayStep Etapa de delay entre cada item (em ms)
 */
export function createStaggeredAnimation(baseClassName: string, itemCount: number, delayStep = 100): string[] {
  return Array.from({ length: itemCount }).map((_, index) => {
    const delayMs = index * delayStep;
    const delayClass = `delay-[${delayMs}ms]`;
    return cn(baseClassName, delayClass);
  });
}

