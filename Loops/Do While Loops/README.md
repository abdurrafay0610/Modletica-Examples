# 🔁 Mapping `do-while` Loops from C to UPPAAL

This document explains how **Modletica** maps `do-while` loops from C into equivalent **finite state machine (FSM)** constructs in UPPAAL.

---

## 📌 Basic `do-while` Loop in C

```c
do {
    // loop body
} while (condition);
```

---

## 🧠 Mapping Strategy in Modletica

Unlike `while` loops, the `do-while` loop always **executes its body at least once** before checking the condition. Modletica reflects this control flow explicitly using an FSM structure that separates the body from the condition evaluation and ensures one full execution cycle before checking the exit condition.

---

### 🔄 Mapping Steps

1. **`do` State**:
   - Entry point into the loop.
   - Transitions into the body section.

2. **Execute the Body**:
   - The actual loop body is inserted between `do` and `do body end`.

3. **Resolve the Condition**:
   - After the body ends, the condition is evaluated in a separate state.

4. **Branch Decision**:
   - If the condition is `true`, control loops back to the `do` state.
   - If `false`, the loop terminates and transitions to `do end`.

---

### 🖼 Diagram

📷 **Diagram**: [`./mapping diagram/do mapping.drawio.png`](./mapping%20diagram/do%20mapping.drawio.png)

![Do While Mapping](./mapping%20diagram/do%20mapping.drawio.png)

---

## ✅ Design Notes

- The `do-while` loop differs from `while` in that **the body executes at least once** regardless of the condition.
- The condition is evaluated **after** the body.
- A dotted transition leads into the body logic, and a separate one handles condition resolution.
- This mapping ensures a clean **single-entry, single-exit** flow with composable structure for nesting or continuation.

---

## 🛠 Example Files in This Folder

- `example_do_while.c`: Original C code.
- `example_do_while.xml`: Generated UPPAAL model.
- `do mapping.drawio.png`: FSM visualization.
- `README.md`: This documentation.

---

## 🧩 Related Constructs

- [`while` loop mapping](../while/)
- [`for` loop mapping](../for/)
- [`if-else` mapping](../if_else/)

---

> 📢 For more about temporary variables and loop body breakdowns, see the global [C to UPPAAL Mapping Strategy](../../README.md).