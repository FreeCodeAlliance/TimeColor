const PATTERNS = {
    mobile: {
        reg: /^1\d{10}$/,
        message: '请输入正确的手机号',
    },
    password: {
        reg: /^[A-Za-z0-9_-]{6,12}$/,
        message: '密码长度为6-12位，且只能包含字母、数字、“-”和“_”',
    },
    verify: {
        reg: /^\d{4}$/,
        message: '验证码错误',
    },
    account: {
        reg: /^[A-Za-z0-9_-]{6,12}$/,
        message: '账号长度为6-12位只能包含字母、数字、“-”和“_”',
    },
}

export function validate(name, value) {
    if (PATTERNS[name] && !PATTERNS[name].reg.test(value)) {
        return PATTERNS[name].message;
    }
    return null;
}

export default PATTERNS;