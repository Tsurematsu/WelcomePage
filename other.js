// fetch('https://tsurematsu.github.io/WelcomePage/test.js').then(res => res.text()).then(r=>eval(`(${r})()`))
fetch('https://tsurematsu.github.io/WelcomePage/tool_pdf.js').then(res => res.text()).then(r=>eval(`(${r})()`))

const response = await fetch('https://tsurematsu.github.io/WelcomePage/tool_pdf.js');
    const code = await response.text();
    eval(code);