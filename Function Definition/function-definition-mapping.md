# 🧩 Function Definition Mapping (C → UPPAAL)

This document explains how **Modletica** maps a **C function definition** to an **UPPAAL template**.

---

## 📌 Overview

- **One function ⇒ one UPPAAL template.**
- Each function owns two synchronization channels:
  - **`_s_<funcName>`** — start channel (callee listens).
  - **`_e_<funcName>`** — end channel (callee signals completion).
- **Global parameters → local parameters:** when the function starts, it copies its **global parameter variables** into **local parameter variables** used inside the template.
- **Returns:** all `return` statements originate from inside the **function body** and perform a **sharp exit** to the **Function End** state. (See the Return Statement mapping for details.)

---

## 🔄 Execution Protocol

1. **Wait for start**  
   The function template idles on a sync **`_s_<funcName>?`** (listening) before execution begins.

2. **Initialize parameters**  
   Upon start, the template **copies global parameter values** to **local parameters** used within the function body.

3. **Run body**  
   Control flows through the body (shown as a **dotted insertion point** in the diagram).  
   - Any `return <expr>;` inside the body:
     - Assigns `<expr>` into the function’s **global return variable** `<funcName>_return`.
     - Performs a **sharp exit** to **Function End**.

4. **Signal completion**  
   At **Function End**, the template sends **`_e_<funcName>!`** to signal completion to any waiting caller.

---

## 🖼 Diagram

📷 **Diagram**: [`Function Definition Mapping.jpg`](./mapping%20diagram/Function%20Definition%20Mapping.jpg)

![Function Definition Mapping](./mapping%20diagram/Function%20Definition%20Mapping.jpg)

---

## 🧠 Parameter & Return Conventions

- **Parameters**
  - Caller writes arguments into **`<funcName>_<param>` global variables**.
  - Callee (on start) copies them into **local** variables for use in the body.

- **Return value**
  - Each function provides a **global return variable**: **`<funcName>_return`**.
  - The body assigns this variable before exiting (typically at `return`).
  - The caller copies `<funcName>_return` into a **local** temp to avoid overwrite before the next call.

---

## ✍️ Minimal Example (Illustrative)

**C:**
```c
int add(int x, int y) {
    return x + y;
}
```

**UPPAAL protocol (sketch):**
- Callee template `add`:
  - Waits on `_s_add?`
  - Copies globals `add_x`, `add_y` → locals `x_local`, `y_local`
  - Body computes and on `return` sets `add_return = x_local + y_local`
  - Signals `_e_add!` at Function End

**Caller template (call site):**
- Sets `add_x = arg1; add_y = arg2;`
- Sends `_s_add!` and waits `_e_add?`
- Copies `tmp = add_return;` (local temp for safe reuse)

---

## 🔗 Related Mappings

- [Function Call Mapping](../function_calls/function-call-mapping.md)
- [Return Statement Mapping](../statements/return%20statement%20mapping/return-mapping.md)

---

> ✅ This mapping guarantees **clear start/end synchronization**, **safe parameter passing**, and **deterministic return handling** while preserving a **single-entry, single-exit** template structure for composability.