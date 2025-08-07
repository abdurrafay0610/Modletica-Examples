# 🔀 Mapping `switch` Statements from C to UPPAAL

This document explains how **Modletica** maps C-style `switch` statements into **finite state machine (FSM)** structures for UPPAAL, while preserving fall-through logic and `break` behavior accurately.

---

## 📌 Basic `switch` Structure in C

```c
switch (value) {
    case 1:
        // case 1 body
        break;
    case 2:
        // case 2 body
        // (no break, falls through)
    default:
        // default body
}
```

---

## 🧠 Mapping Strategy in Modletica

The `switch` is modeled as a **sequence of case evaluations**, each conditionally executed. `break` statements are modeled as **sharp exits** to a common `switch end` state. Fall-through (when no break is used) is naturally supported by continuing into the next case body **without checking its condition**.

---

### 🔄 Mapping Steps

1. **`switch start`**: Entry point to the `switch` block.
2. **Resolve the `switch` condition**: This value is matched against the case conditions.
3. **Case Matching & Execution**:
   - Evaluate `case 1` condition.
     - If `true`: execute `case 1 body`.
     - If `break` exists: jump to `switch end`.
     - If `no break`: continue directly to next case’s body (without checking condition).
   - If `case 1` was false, check `case 2` condition, and repeat the above.
4. **Default Case**:
   - If no case matches, transition to `default` state.
   - Execute `default body`, then proceed to `switch end`.

---

### 🧩 Default Case Guarantee

Even if the original C code does **not include a `default` case**, Modletica **automatically inserts an empty default branch** to ensure that:
- The FSM maintains a **single entry (`switch start`) and single exit (`switch end`)** structure.
- The switch behaves as a total construct in UPPAAL (no dead ends).

---

### 🖼 Diagram

📷 **Diagram**: [`./mapping diagram/ideal switch mapping.drawio.png`](./mapping%20diagram/ideal%20switch%20mapping.drawio.png)

![Switch Mapping](./mapping%20diagram/ideal%20switch%20mapping.drawio.png)

---

## ✅ Design Notes

- **Case evaluation is sequential**, just like in C — no parallel matching.
- **`break` logic**: Transitions directly to the `switch end` state.
- **Fall-through logic** is preserved when no `break` is encountered.
- **Empty `default`** ensures composability even in its absence in source code.

---

## 🛠 Example Files in This Folder

- `example_switch.c`: Original C code.
- `example_switch.xml`: Generated UPPAAL model.
- `ideal switch mapping.drawio.png`: FSM visualization.
- `README.md`: This documentation.

---

## 🧩 Related Constructs

- [`if-else` mapping](../if_else/)
- [`conditional operators`](../ternary/)
- [`function call` mapping](../function_calls/)

---

> 📢 For more about how Modletica manages condition resolution and case-body composition, see the global [C to UPPAAL Mapping Strategy](../../README.md).