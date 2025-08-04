# 🔁 Mapping `for` Loops from C to UPPAAL

This document explains how **Modletica** translates C-style `for` loops into UPPAAL-compatible **finite state machines (FSMs)**, using a structured approach that ensures accurate semantics and easy composability.

---

## 📌 Basic `for` Loop in C

```c
for (int i = 0; i < 10; i++) {
    // loop body
}
```

---

## 🧠 Mapping Strategy in Modletica

Modletica models the `for` loop by breaking it into distinct phases, each represented by a state in the FSM. The mapping is structured to capture the initialization, conditional checks, loop body, and iteration update separately — preserving the control flow exactly as in C.

---

### 🔄 Mapping Steps

1. **`for start`**: Entry point of the loop mapping.
2. **Resolve Initialization Expression**: Executed **only once**, this corresponds to `int i = 0`.
3. **Resolve Conditional Expression**: Evaluate the loop condition, e.g., `i < 10`.
4. **Branch Decision**:
   - If the condition is `true`, transition to the `for body start`.
   - If the condition is `false`, transition directly to `for end` (loop exit).
5. **Execute Loop Body**: The loop body is inserted between `for body start` and `for body end`.
6. **Resolve Iteration Expression**: Corresponds to `i++`.
7. **Repeat**: Loop back to the conditional check (step 3).

---

### 🖼 Diagram

Refer to the following image for a visual depiction of this mapping:

📷 **Diagram**: [`./mapping diagram/for mapping.drawio.png`](./mapping%20diagram/for%20mapping.drawio.png)

![For Mapping](./mapping%20diagram/for%20mapping.drawio.png)

---

## ✅ Design Notes

- The **initializer expression** is executed once at the start of the loop and is represented as a separate state (`Resolving For Initializer Expression`).
- The **conditional expression** is resolved at the beginning of each loop iteration.
- The **iteration expression** is resolved only **after** the loop body has been executed.
- The loop merges into a single `for end` state, allowing further composition or continuation.

---

## 🧩 Benefits of the Mapping

- **Separation of concerns**: Each part of the `for` loop (init, condition, body, update) is handled in its own FSM segment.
- **Safe nesting**: Dotted lines show where nested bodies or expressions are inserted.
- **UPPAAL Compatibility**: The structure allows direct simulation and verification in UPPAAL.

---

## 🛠 Example Files in This Folder

- `example_for_loop.c`: Original C code.
- `example_for_loop.xml`: Auto-generated UPPAAL model.
- `for mapping.drawio.png`: Visual diagram showing the FSM structure.
- `README.md`: This documentation.

---

## 🧩 Related Constructs

- [`while` loop mapping](../while/)
- [`if-else` conditionals](../if_else/)
- [`function call` mapping](../function_calls/)

---

> 📢 For details on expression resolution and handling complex conditions or updates, refer to the global [C to UPPAAL Mapping Strategy](../../README.md).