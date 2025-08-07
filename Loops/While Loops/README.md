# 🔁 Mapping `while` Loops from C to UPPAAL

This document explains how **Modletica** maps `while` loops from C into an equivalent **finite state machine (FSM)** structure for UPPAAL.

---

## 📌 Basic `while` Loop in C

```c
while (condition) {
    // while body
}
```

---

## 🧠 Mapping Strategy in Modletica

Modletica maps the `while` loop using a repetitive evaluation structure that mirrors the C loop’s semantics. The key idea is to continuously evaluate the condition and execute the body as long as the condition holds.

---

### 🔄 Mapping Steps

1. **`While` State**:
   - Entry point for the `while` loop block.

2. **Resolve the Condition**:
   - Evaluate the loop condition (e.g., `i < 10`) in a dedicated state.

3. **Branch Decision**:
   - If the condition is `true`, transition to the body start.
   - If the condition is `false`, transition to the `While End` state.

4. **Execute Loop Body**:
   - The loop body is inserted between `Body Start` and `Body End`.

5. **Repeat**:
   - After completing the body, control loops back to the condition resolution.

---

### 🖼 Diagram

📷 **Diagram**: [`./mapping diagram/while mapping.drawio.png`](./mapping%20diagram/while%20mapping.drawio.png)

![While Mapping](./mapping%20diagram/while%20mapping.drawio.png)

---

## ✅ Design Notes

- **Condition First**: Since `while` is a pre-checked loop, the body is only entered if the condition is true.
- **Dotted transitions** are placeholders for inserting logic such as:
  - Condition resolution
  - Actual body content
- **Single Entry and Exit**: The structure starts at `While` and ends at `While End`, promoting composability.

---

## 🧩 Related Constructs

- [`for` loop mapping](../for/)
- [`do-while` mapping](../do_while/) (if supported)
- [`if-else` conditionals](../if_else/)

---

> 📢 For more on how Modletica resolves conditions and decomposes statements, refer to the global [C to UPPAAL Mapping Strategy](../../README.md).