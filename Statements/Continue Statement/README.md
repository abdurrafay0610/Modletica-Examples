# 🔄 Mapping `continue` Statements from C to UPPAAL

This document explains how **Modletica** handles C `continue` statements when translating to **finite state machine (FSM)** structures for UPPAAL.

---

## 📌 Behaviour of `continue` in C

In C, a `continue` statement skips the remainder of the loop body and immediately starts the **next iteration** of the loop:

- **For loops**: Control jumps to the **iteration expression** (e.g., `i++`), and then to the condition check.
- **While and Do-while loops**: Control jumps directly to the **condition check**.

---

## 🧠 Mapping Strategy in Modletica

Modletica models the `continue` statement as a **jump transition** to the correct loop state depending on the type of loop it is inside.

---

### 🔄 Mapping Steps

1. **Locate Target Loop**:
   - Starting from the `continue` statement, Modletica searches its **parent constructs**.
   - The first enclosing loop (`for`, `while`, `do-while`) becomes the **continue target**.

2. **Create Jump Transition**:
   - **For loop**:
     - Transition from the `continue` location directly to the **iteration expression state**.
   - **While / Do-while loops**:
     - Transition from the `continue` location directly to the **condition checking state**.

3. **Preserve Loop Control**:
   - Only the loop containing the `continue` is affected.
   - Outer loops remain unaffected, exactly as in C.

---

### 🖼 Example — Continue in For Loop

**C code:**
```c
for (int i = 0; i < 5; i++) {
    if (i == 2) {
        continue;
    }
    // some code
}
```

**Mapping behaviour in Modletica:**
- When `i == 2`, `continue` jumps directly to the **iteration expression state** (`i++`).
- The loop condition is checked next for the following iteration.

---

### 🖼 Example — Continue in While Loop

**C code:**
```c
while (condition) {
    if (checkSomething()) {
        continue;
    }
    // some code
}
```

**Mapping behaviour in Modletica:**
- If `checkSomething()` is true, `continue` jumps directly to the **condition checking state**.
- If the condition is still true, the next iteration begins immediately.

---

### 🔍 Notes

- **For loops**: `continue` skips remaining body states and jumps to the **iteration expression**.
- **While and Do-while loops**: `continue` skips remaining body states and jumps to the **condition check**.
- **Nested Loops**: `continue` always affects the **innermost enclosing loop**.

---

## 🧩 Related Constructs

- [`for` loop mapping](../../loops/for%20loop/for-mapping.md)
- [`while` loop mapping](../../loops/while/while-mapping.md)
- [`do-while` loop mapping](../../loops/do-while/do-while-mapping.md)
- [`break` statement mapping](../break%20statement%20mapping/break-mapping.md)

---

> 📢 This mapping ensures that the `continue` behaviour in UPPAAL matches C exactly, while keeping the FSM structure clean and composable.