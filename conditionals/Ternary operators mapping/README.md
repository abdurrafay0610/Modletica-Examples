# ❓ Mapping Ternary (`?:`) Operators from C to UPPAAL

This document explains how **Modletica** handles the C ternary operator (`condition ? true_value : false_value`) by converting it into a finite state machine (FSM) representation for UPPAAL.

---

## 📌 Ternary Operator in C

```c
int result = (condition) ? true_value : false_value;
```

---

## 🧠 Mapping Strategy in Modletica

Ternary operators are **expressions**, not statements. Therefore, Modletica translates them by **introducing an intermediate variable** and simulating the evaluation logic through explicit state transitions.

---

### 🔄 Mapping Steps

1. **Introduce a Temporary Variable**:
   - A variable is declared to hold the final result of the ternary expression.
   - This variable replaces the ternary wherever it appears.

2. **Resolve the Condition**:
   - The condition is evaluated via an intermediate state.
   - Transitions depend on whether the condition resolves to `true` or `false`.

3. **Branch Evaluation**:
   - If the condition is **true**, resolve `true_value` and assign it to the variable.
   - If the condition is **false**, resolve `false_value` and assign it to the variable.

4. **Merge**:
   - Both branches join into a common state, continuing the control flow with the resolved variable.

---

### 🖼 Diagram

📷 **Diagram**: [`ternary_mapping.drawio.png`](./mapping%20diagram/ternary_mapping.drawio.png)

![Ternary Mapping](./mapping%20diagram/ternary_mapping.drawio.png)

---

## 🛠 Example in C

```c
int max = (a > b) ? a : b;
```

⬇️ Translated internally to:

```c
int __tmp_ternary;
if (a > b)
    __tmp_ternary = a;
else
    __tmp_ternary = b;

int max = __tmp_ternary;
```

This same logic is reflected in the UPPAAL FSM structure.

---

## ✅ Design Notes

- **Temporary variables** ensure modularity and reusability in the model.
- **Only the needed branch is evaluated**, preserving short-circuit behavior.
- This approach is compatible with **nested ternary** structures (each is handled via its own FSM block).

---

## 🧩 Related Constructs

- [`if-else` mapping](../if_else/)
- [`conditional expressions`](../conditionals/)
- [`function call` mapping](../function_calls/)

---

> 📢 For how temporary variables and expression breakdowns are managed internally, see the global [C to UPPAAL Mapping Strategy](../../README.md).