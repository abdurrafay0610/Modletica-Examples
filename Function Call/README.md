# 📞 Function Call Mapping (C → UPPAAL)

This document explains how **Modletica** maps **function calls** in C code to UPPAAL timed automata.

---

## 📌 Overview

In C, a function call involves:
1. Passing arguments to the callee.
2. Executing the callee’s code.
3. Returning control and possibly a value to the caller.

In Modletica, this is modeled using:
- **Global parameter variables** for argument passing.
- **Synchronization channels** to signal start and end of execution.
- **Global return variables** for return values.

---

## 🔄 Mapping Steps

### 1️⃣ Parameter Resolution & Passing
- The **caller function** first evaluates all function call arguments.
- The results are stored in the **callee's global parameter variables**.

### 2️⃣ Function Start Signal
- Once parameters are set, the caller sends a **start signal** to the callee using:
```
_s_functionName!
```
This tells the callee to begin execution.

### 3️⃣ Waiting for Completion
- The caller waits for the callee to signal completion using:
```
_e_functionName?
```
This ensures the caller resumes only after the callee finishes.

### 4️⃣ Return Value Handling
- Every function has a **global return variable**:
```
functionName_return
```
- After the callee ends, the caller copies this global return value into a **local variable**:
```
localReturnVar = functionName_return;
```
This prevents overwriting if the callee is called again.

---

## 🖼 Diagram

📷 **Diagram**: [`Function Call Mapping`](/mapping%20diagram/Function%20Call%20Mapping.drawio.png)

![Function Call Mapping](/mapping%20diagram/Function%20Call%20Mapping.drawio.png)

---

## 🔍 Notes
- All **parameters and return values** are handled using **global variables** for simplicity and synchronization.
- **Synchronization channels** (`_s_` and `_e_`) ensure strict start-end sequencing.
- Copying the return value to a local variable ensures **reentrancy safety** — the callee can be invoked again without losing the previous result.

---

## 🧩 Related Constructs
- [Function Definition Mapping](../functions/function-definition-mapping.md)
- [Return Statement Mapping](../statements/return-statement-mapping.md)

---

> 📢 This mapping ensures **clear control flow** between caller and callee while preserving correctness and avoiding race conditions in UPPAAL models.