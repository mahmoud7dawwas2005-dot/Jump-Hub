function getAI(score) {
  if (score < 5) return { gravity: 0.7, gap: 220 };
  if (score < 15) return { gravity: 0.9, gap: 260 };
  if (score < 30) return { gravity: 1.1, gap: 300 };
  return { gravity: 1.3, gap: 340 };
}
