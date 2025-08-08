# ⛔ Mapping `break` Statements from C to UPPAAL

This document explains how **Modletica** handles C `break` statements when translating to **finite state machine (FSM)** structures for UPPAAL.

---

## 📌 Behaviour of `break` in C

In C, a `break` statement immediately terminates the **innermost enclosing loop** (`for`, `while`, `do-while`) or `switch` statement, transferring control to the statement immediately following it.

---

## 🧠 Mapping Strategy in Modletica

In Modletica, a `break` statement is modeled as a **sharp exit** transition from the current loop or switch body directly to the **end state** of that loop or switch.

---

### 🔄 Mapping Steps

1. **Locate Target Construct**:
   - Starting from the `break` statement, Modletica searches its **parent constructs**.
   - The first enclosing **loop** (`for`, `while`, `do-while`) or **switch** becomes the **break target**.

2. **Create Sharp Exit Transition**:
   - A direct transition is drawn from the `break` location to the **end state** of the target loop or switch.
   - This bypasses all remaining body states and iteration logic.

3. **Preserve Enclosing Structure**:
   - Only the **target construct** is exited.
   - Outer loops or switches remain intact, preserving the control flow semantics of C.

---

### 🖼 Example — Break in Loops

**C code:**
```c
for (int i = 0; i < 5; i++) {
    while (condition1) {
        break;
    }
}
```

**Mapping behaviour in Modletica:**
- The `break` inside the `while` exits **only** the `while` loop.
- Control moves directly to the `while end` state.
- The `for` loop continues its iteration as usual.

---

### 🖼 Example — Break in Switch

**C code:**
```c
switch (x) {
    case 1:
        // some code
        break;
    case 2:
        // other code
}
```

**Mapping behaviour in Modletica:**
- The `break` exits **only** the `switch` in which it is contained.
- Control moves directly to the `switch end` state.
- More details of `break` handling in `switch` are documented in the [Switch Statement Mapping](../conditionals/Switch mapping/).

---

### 🔍 Notes

- **Loops**: Supported constructs for `break` are `for`, `while`, and `do-while`.
- **Switch Statements**: `break` exits directly to the `switch end` state.
- **Sharp Exit**: No intermediate states between the `break` statement and the construct’s end state.
- **Nested Constructs**: `break` always affects the **innermost enclosing loop or switch**.

---

## 🧩 Related Constructs

- [`for` loop mapping](../for/)
- [`while` loop mapping](../while/)
- [`do-while` loop mapping](../do_while/)
- [`switch` statement mapping](../switch/)

---

> 📢 This mapping ensures that the behaviour of `break` in UPPAAL models is consistent with standard C semantics while maintaining a **clear single-entry, single-exit FSM structure** for all constructs.