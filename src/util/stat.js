/*
 * Pearson's R
 * r = \frac{ n \sum{xy}-(\sum{x})(\sum{y}) }{ \sqrt{ [n \sum{x^2}-(\sum{x})^2][n \sum{y^2}-(\sum{y})^2] } }
 */
export const pearsonsR = (x, y) => {
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0,
    sumY2 = 0;
  const minLength = x.length = y.length = Math.min(x.length, y.length),
    reduce = (xi, idx) => {
      const yi = y[idx];
      sumX += xi;
      sumY += yi;
      sumXY += xi * yi;
      sumX2 += xi * xi;
      sumY2 += yi * yi;
    }
  x.forEach(reduce);
  return (minLength * sumXY - sumX * sumY) / Math.sqrt((minLength * sumX2 - sumX * sumX) * (minLength * sumY2 - sumY * sumY));
};

/*
 * Spearman's Rank Correlation Coefficient
 */

// Ranking function
function rank(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  return arr.map(v => sorted.indexOf(v) + 1);
}

// Compute the Spearman's rank correlation coefficient
export const spearmanRankCorrelation = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must have the same length");
  }
  const n = arr1.length;

  const rank1 = rank(arr1);
  const rank2 = rank(arr2);

  const d = rank1.map((rank, i) => rank - rank2[i]);
  const dSquaredSum = d.reduce((sum, diff) => sum + diff ** 2, 0);

  const spearmanCoefficient = 1 - (6 * dSquaredSum) / (n * (n ** 2 - 1));

  return spearmanCoefficient;
}

export const clamp = (min, value, max) => Math.min(Math.max(value, min), max);

export const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

export const median = arr => {
  if (!arr.length) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

export const percentile = (arr, p) => {
  if (!arr.length) return null;
  if (p <= 0) return Math.min(...arr);
  if (p >= 100) return Math.max(...arr);

  const sorted = [...arr].sort((a, b) => a - b);
  const rank = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);

  if (lower === upper) {
    return sorted[lower];
  } else {
    const weight = rank - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  }
};

