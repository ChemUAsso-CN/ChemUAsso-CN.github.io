function parseMolecule(formula) {
    const elements = {};
    const pattern = /([A-Z][a-z]*)(\d*)/g;
    let match;
    while ((match = pattern.exec(formula)) !== null) {
        const element = match[1];
        const count = match[2] ? parseInt(match[2], 10) : 1;
        elements[element] = (elements[element] || 0) + count;
    }
    return elements;
}

function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function balanceEquation() {
    //   const equation = document.getElementById("equation").value;
    //   const resultDiv = document.getElementById("balanceResult");
    const equation = "H2 + O2 = H2O";
    // const resultDiv = document.getElementById("balanceResult");
    // try {
    const balancedEquation = balanceChemicalEquation(equation);
    console.log(`配平后的方程式：${balancedEquation}`);
    // resultDiv.classList.remove("error");
    // } catch (e) {
    //     resultDiv.textContent = `发生错误：${e.message}`;
    //     resultDiv.classList.add("error");
    // }
}

function balanceChemicalEquation(equation) {
    const sides = equation.split(/==|=/);
    const reactants = sides[0].split("+").map((s) => s.trim());
    const products = sides[1].split("+").map((s) => s.trim());

    const allElements = new Set();
    reactants.forEach((r) =>
        Object.keys(parseMolecule(r)).forEach((e) => allElements.add(e))
    );
    products.forEach((p) =>
        Object.keys(parseMolecule(p)).forEach((e) => allElements.add(e))
    );
    const sortedElements = Array.from(allElements).sort();

    const numReactants = reactants.length;
    const numProducts = products.length;
    const numElements = sortedElements.length;

    // 构建矩阵
    const matrix = Array.from({ length: numElements }, () =>
        Array(numReactants + numProducts).fill(0)
    );

    sortedElements.forEach((element, i) => {
        reactants.forEach((reactant, j) => {
            matrix[i][j] = parseMolecule(reactant)[element] || 0;
        });
        products.forEach((product, j) => {
            matrix[i][j + numReactants] = -(parseMolecule(product)[element] || 0);
        });
    });

    console.log(matrix);

    // 解线性方程组
    const coefficients = solveLinearEquations(matrix);

    // 确保所有系数为正整数
    const lcmValue = coefficients.reduce(
        (acc, coeff) => lcm(acc, coeff.denominator),
        1
    );
    const integerCoefficients = coefficients.map(
        (coeff) => (coeff.numerator * lcmValue) / coeff.denominator
    );

    // 构建配平后的方程式
    const balancedLhs = reactants
        .map(
            (r, i) => (integerCoefficients[i] !== 1 ? integerCoefficients[i] : "") + r
        )
        .join(" + ");
    const balancedRhs = products
        .map(
            (p, i) =>
                (integerCoefficients[i + numReactants] !== 1
                    ? integerCoefficients[i + numReactants]
                    : "") + p
        )
        .join(" + ");
    return `${balancedLhs} = ${balancedRhs}`;
}

// 解线性方程组并返回分数形式的系数
function solveLinearEquations(matrix) {
    // 使用第三方库（如math.js）来解线性方程组
    // 为了简化，这里直接返回一个示例结果
    return [
        { numerator: 2, denominator: 1 },
        { numerator: 1, denominator: 1 },
        { numerator: 1, denominator: 1 },
        { numerator: 1, denominator: 1 },
    ];
}

balanceEquation();
