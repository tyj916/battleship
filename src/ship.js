export default function Ship(length) {
  let hitCount = 0;

  function hit() {
    if (hitCount < length) hitCount += 1;
  }

  function isSunk() {
    return hitCount === length;
  }

  return {
    length,
    getHitCount: () => hitCount,
    hit,
    isSunk,
  };
}
