export interface Question {
  id: number;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer: 'a' | 'b' | 'c' | 'd';
}

export const questions: Question[] = [
  {
    id: 1,
    question: "¿Cuál será el salario mínimo en California en 2026?",
    options: {
      a: "$7.25",
      b: "$13.50",
      c: "$16.50",
      d: "$16.90"
    },
    correctAnswer: "d"
  },
  {
    id: 2,
    question: "¿Qué porcentaje de tu ingreso deberías ahorrar según la regla 50/30/20?",
    options: {
      a: "10%",
      b: "20%",
      c: "30%",
      d: "50%"
    },
    correctAnswer: "b"
  },
  {
    id: 3,
    question: "¿Cuántos meses de gastos deberías tener en un fondo de emergencia?",
    options: {
      a: "1-2 meses",
      b: "3-6 meses",
      c: "12 meses",
      d: "24 meses"
    },
    correctAnswer: "b"
  },
  {
    id: 4,
    question: "¿Qué es el FICO score?",
    options: {
      a: "Un tipo de seguro",
      b: "Un puntaje de crédito",
      c: "Una cuenta de ahorro",
      d: "Un impuesto federal"
    },
    correctAnswer: "b"
  },
  {
    id: 5,
    question: "¿Cuál es el límite de contribución al 401(k) en 2026?",
    options: {
      a: "$19,500",
      b: "$22,500",
      c: "$23,500",
      d: "$25,000"
    },
    correctAnswer: "c"
  },
  {
    id: 6,
    question: "¿Qué significa APR en un préstamo?",
    options: {
      a: "Ahorro Por Retiro",
      b: "Annual Percentage Rate",
      c: "Acceso Prioritario Rápido",
      d: "Aplicación Para Refinanciar"
    },
    correctAnswer: "b"
  },
  {
    id: 7,
    question: "¿Cuánto debes pagar de impuestos si ganas $50,000 como soltero?",
    options: {
      a: "10%",
      b: "12%",
      c: "22%",
      d: "24%"
    },
    correctAnswer: "c"
  },
  {
    id: 8,
    question: "¿Qué es un Roth IRA?",
    options: {
      a: "Seguro de vida",
      b: "Cuenta de retiro con impuestos pagados al contribuir",
      c: "Préstamo estudiantil",
      d: "Tarjeta de crédito premium"
    },
    correctAnswer: "b"
  },
  {
    id: 9,
    question: "¿Cuál es el puntaje mínimo de crédito para ser considerado 'bueno'?",
    options: {
      a: "500",
      b: "600",
      c: "670",
      d: "750"
    },
    correctAnswer: "c"
  },
  {
    id: 10,
    question: "¿Qué porcentaje de tu ingreso no debería superar el pago de tu renta?",
    options: {
      a: "20%",
      b: "30%",
      c: "40%",
      d: "50%"
    },
    correctAnswer: "b"
  }
];

export const getRandomQuestions = (count: number = 10): Question[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
