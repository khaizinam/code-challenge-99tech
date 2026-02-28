/**
 * Implementation A: Using mathematical formula (Arithmetic Progression sum).
 * Complexity: 
 * - Time: O(1) as it calculates the result in a single mathematical step using constant time operations.
 * - Space: O(1) as no additional memory is allocated; only the input and output depend on memory.
 * Efficiency: This is the most efficient and optimal approach for summing integers to `n`. 
 * It completes in constant time regardless of how large `n` becomes. Note: In JavaScript/TypeScript, 
 * using `Number.MAX_SAFE_INTEGER` could lead to precision issues if `n * (n + 1)` exceeds max safe integer,
 * but assuming valid bounds per instructions, this is mathematically correct.
 */
function sum_to_n_a(n: number): number {
    return (n * (n + 1)) / 2;
}

/**
 * Implementation B: Iterative loop.
 * Complexity: 
 * - Time: O(n) because the loop iterates `n` times to accumulate the sum.
 * - Space: O(1) as we only use a single variable `sum` to keep track of the accumulated value without any extra array or object generation.
 * Efficiency: This is a safe and common way, avoiding floating point / max limit overflow on single operations before division. 
 * However, as `n` scales (e.g., Millions/Billions), it will take linearly longer to execute compared to the O(1) formula.
 */
function sum_to_n_b(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Implementation C: Recursive approach.
 * Complexity: 
 * - Time: O(n) as the function calls itself `n` times.
 * - Space: O(n) because each recursive call adds a new frame to the call stack.
 * Efficiency: This is an elegant, functional programming approach. However, it is the most 
 * risky in TypeScript/JavaScript environment. For very large values of `n`, it will trigger 
 * a "Maximum call stack size exceeded" error (Stack Overflow) because most JS engines 
 * do not have robust Tail Call Optimization (TCO). Use with caution for small `n`.
 */
function sum_to_n_c(n: number): number {
    if (n <= 0) return 0;
    return n + sum_to_n_c(n - 1);
}
