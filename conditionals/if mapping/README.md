# 🔀 Mapping `if-else` Statements from C to UPPAAL

This document describes how **Modletica** translates C-style `if-else` conditionals into **UPPAAL-compatible finite state machines (FSMs)**.

---

## 📌 Basic `if-else` Structure in C

```c
if (condition) {
    // then-body
} else {
    // else-body
}
```

---

## 🧠 Mapping Strategy in Modletica

> 💡 **Note**: If the original C code has an `if` without an `else`, Modletica automatically adds an **empty `else` block**.
> This ensures the FSM always has a **single-entry, single-exit structure**, making it easier to compose with other mappings.


Modletica generates a set of interconnected states and transitions in the UPPAAL model to represent the semantics of the `if-else` construct. The FSM structure ensures that both branches are represented explicitly and flow into a common exit state.

### 🔄 Mapping Steps

1. **If State**: A named state representing the start of the `if` block.
2. **Condition Resolution State**: This state handles evaluation of the condition (including compound or complex conditions).
3. **Branch Decision**:
   - If `condition` is `true`, control moves to the `Then` state.
   - If `condition` is `false`, control moves to the `Else` state.
4. **Then and Else Bodies**:
   - The body of each branch is inserted using dashed transitions into `Then Body` and `Else Body` placeholders.
5. **Merging**:
   - Both branches transition into a common state called `If End`.

### 🖼 Diagram

Refer to the following image for a visual depiction of this mapping:

📷 **Diagram**: [`./mapping diagram/If mapping.drawio.png`](./mapping%20diagram/If%20mapping.drawio.png)

![If Mapping](./mapping%20diagram/If%20mapping.drawio.png)

---

## ➕ Nested and Compound Conditions

### `if-else if-else` Handling

Modletica simplifies this by **recursively rewriting** `else-if` chains into nested `if-else` blocks.

### Example Transformation:

```c
if (cond1) {
    // block1
} else if (cond2) {
    // block2
} else {
    // block3
}
```

⬇️ Transformed into:

```c
if (cond1) {
    // block1
} else {
    if (cond2) {
        // block2
    } else {
        // block3
    }
}
```

This transformation ensures **uniform application** of the standard `if-else` FSM mapping logic.

---

## ✅ Design Principles

- **Single Entry & Exit**: All conditional mappings begin from a single `If` state and unify at `If End`.
- **Composability**: Allows nesting of conditionals or loops inside either branch.
- **Clarity**: Dashed lines represent nested inserts, aiding human readability and modular generation.

---

## 🛠 Example Files in This Folder

- `example_if_else.c`: Original C code.
- `example_if_else.xml`: Auto-generated UPPAAL model.
- `If mapping.drawio.png`: Diagram representing the FSM structure.
- `README.md`: This documentation.

---

## 🧩 Related Constructs

- [`switch-case`](../switch_case/)
- [`for` loop mapping`](../loops/)
- [`function call` mapping`](../function_calls/)

---

> 📢 For technical details on how Modletica resolves compound expressions or creates temporary variables during condition evaluation, see the global [C to UPPAAL Mapping Strategy](../../README.md).