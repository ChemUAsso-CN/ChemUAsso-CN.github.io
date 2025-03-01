import re
import numpy as np
from sympy import symbols, Eq, solve, Rational

def parse_molecule(formula):
    """
    解析分子式，返回元素及其数量的字典。
    例如：H2O -> {'H': 2, 'O': 1}
    """
    elements = {}
    pattern = re.compile(r'([A-Z][a-z]*)(\d*)')
    for match in pattern.finditer(formula):
        element, count = match.groups()
        count = int(count) if count else 1  # 如果没有数字，默认为1
        elements[element] = elements.get(element, 0) + count
    return elements


def balance_chemical_equation(equation):
    """
    配平化学方程式。
    输入：字符串形式的化学方程式，例如 "H2 + O2 == H2O"
    输出：配平后的化学方程式
    """
    # 替换用户输入中的 '==' 为 '='，以便后续处理
    equation = equation.replace("==", "=")

    # 分割反应物和生成物
    lhs, rhs = equation.split('=')
    reactants = [r.strip() for r in lhs.split('+')]
    products = [p.strip() for p in rhs.split('+')]

    # 获取所有元素
    all_elements = set()
    for reactant in reactants:
        all_elements.update(parse_molecule(reactant).keys())
    for product in products:
        all_elements.update(parse_molecule(product).keys())
    all_elements = sorted(all_elements)

    # 构建矩阵
    num_reactants = len(reactants)
    num_products = len(products)
    num_elements = len(all_elements)
    matrix = np.zeros((num_elements, num_reactants + num_products))

    # 填充矩阵
    for i, element in enumerate(all_elements):
        for j, reactant in enumerate(reactants):
            elements = parse_molecule(reactant)
            matrix[i, j] = elements.get(element, 0)
        for j, product in enumerate(products):
            elements = parse_molecule(product)
            matrix[i, j + num_reactants] = -elements.get(element, 0)

    # 解线性方程组
    variables = symbols(' '.join([f'x{i}' for i in range(num_reactants + num_products)]))
    equations = [Eq(sum(matrix[i, j] * variables[j] for j in range(num_reactants + num_products)), 0) for i in range(num_elements)]
    equations.append(Eq(sum(variables), 1))  # 添加归一化方程
    solution = solve(equations, variables)

    # 获取最小整数解
    coefficients = [solution[var] for var in variables]
    coefficients = [Rational(coeff).limit_denominator() for coeff in coefficients]  # 转换为分数形式
    lcm = np.lcm.reduce([coeff.q for coeff in coefficients])  # 计算分母的最小公倍数

    # 将系数转换为整数
    coefficients = [coeff.p * lcm // coeff.q for coeff in coefficients]

    # 构建配平后的方程式
    balanced_lhs = ' + '.join([f'{coeff}{reactant}' if coeff != 1 else reactant for coeff, reactant in zip(coefficients[:num_reactants], reactants)])
    balanced_rhs = ' + '.join([f'{coeff}{product}' if coeff != 1 else product for coeff, product in zip(coefficients[num_reactants:], products)])
    return f"{balanced_lhs} = {balanced_rhs}"


# 使用方法
if __name__ == "__main__":
    # 输入化学方程式
    equation = input("请输入化学方程式（用'=='分隔反应物和生成物，用'+'分隔多个分子）：\n")
    try:
        # 调用函数配平方程式
        balanced_equation = balance_chemical_equation(equation)
        print("\n配平后的方程式：")
        print(balanced_equation)
    except Exception as e:
        print(f"发生错误：{e}")
