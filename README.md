# 🧠 Modletica C-to-UPPAAL Mapping Repository

This repository contains a curated set of **C code snippets** and their corresponding **UPPAAL models**, automatically extracted using [Modletica](https://github.com/your-modletica-link) — a tool for transforming C programs into formally verifiable **finite state machines (FSMs)** compatible with UPPAAL.

## 🚀 Purpose

Many **legacy safety-critical systems** were developed without formal models or documentation. Modletica bridges that gap by enabling **automatic extraction of UPPAAL models** from C code, accelerating formal verification workflows for systems where correctness is critical.

This repository aims to:

- Showcase Modletica’s mapping strategies from **C code to UPPAAL FSMs**.
- Provide **side-by-side examples** for each language construct.
- Serve as a resource for **developers, researchers, and verification engineers** working on formal model extraction and toolchain integration.

## 📁 Repository Structure

```
📦 modletica-mappings/
├── 📁 datatypes/
├── 📁 statements/
├── 📁 operators/
├── 📁 functions/
├── 📁 function_calls/
├── 📁 loops/
├── 📁 conditionals/
├── 📁 switch_case/
├── 📁 pointers/
├── 📁 examples/
├── README.md
└── ... (coming soon: mapping_readmes/)
```

Each subdirectory contains:
- ✅ **Original C code**
- 🔁 **UPPAAL model file (.xml/.xta)**
- 📷 **UPPAAL diagram screenshot** (optional)
- 📄 **Explanation of the mapping** (in upcoming mapping-specific READMEs)

## 📌 What’s Covered

This repository illustrates how Modletica maps the following C constructs to UPPAAL:

- **Primitive and custom data types** (`int`, `char`, `bool`, `int8_t`, etc.)
- **Statements and expressions** (declarations, assignments, updates)
- **Operators**, including arithmetic, logical, and comparison
- **Function definitions and calls**, with parameters and return values
- **Control structures**:
  - `if`, `else`, `if-else`
  - `for`, `while`, `do-while`
  - `switch-case`
- **Pointers and dereferencing**
- **Nesting and composition of constructs**

## 🧩 Why UPPAAL?

[UPPAAL](https://uppaal.org/) is a leading tool for **model checking and verification** of real-time systems. Modletica’s output is compatible with UPPAAL’s formal model format, making it easier to:

- Perform **reachability and safety checks**
- Analyze **temporal behavior**
- Apply **timing constraints** to software components

## 🛠 How to Use This Repository

1. Browse the folders for your construct of interest.
2. Open the C code to understand the input.
3. Review the UPPAAL model and mapping explanation.
4. Load the `.xml` or `.xta` file in UPPAAL to simulate and verify.

## 📚 Coming Soon

- 📘 **Mapping-specific READMEs** with detailed explanations for each construct
- 🧪 **Test case repository** for benchmark comparisons
- 📊 **Case studies** and performance metrics

## 🤝 Contributions

Feedback, issues, and pull requests are welcome! Please feel free to submit:
- New mapping examples
- Bug reports or improvements
- Suggestions for edge cases

## 📄 License

This repository is open-sourced under the **MIT License**. See [LICENSE](./LICENSE) for more details.