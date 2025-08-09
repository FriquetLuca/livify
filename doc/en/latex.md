##! Mathematics

Writing math using a [LaTeX](https://www.latex-project.org/) variant is possible. For this, we're using [KaTeX](https://katex.org/).
You can write a formula using an inline syntax or block syntax. The inline syntax start with a `$` and end with `$`.

### Example

```md
The formula $a^2+b^2=c^2$ is the most well known formula from the pythagorean theorem.
```

The formula $a^2+b^2=c^2$ is the most well known formula from the pythagorean theorem.

---

For equations, it's better to use the block syntax that enclose the `KaTeX` content with `$$`.

### Example

```md
The equation for a circle is:
$$x^2+y^2=0$$
```

The equation for a circle is:

$$x^2+y^2=0$$

---

It is possible to write down the block syntax while being in an inline block. It won't parse the `KaTeX` code as a block but it will be rendered using `DisplayMode`.

### Example

```md
The formula $$a^2+b^2=c^2$$ is the most well known formula from the pythagorean theorem.
```

The formula $$a^2+b^2=c^2$$ is the most well known formula from the pythagorean theorem.
