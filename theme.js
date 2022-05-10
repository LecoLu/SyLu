window.theme = {};

/**
 * 加载脚本文件
 * @param {string} url 脚本地址
 * @param {string} type 脚本类型
 */
window.theme.loadScript = function (src, type = 'module', async = false, defer = false) {
    let script = document.createElement('script');
    if (type) script.setAttribute('type', type);
    if (async) script.setAttribute('async', true);
    if (defer) script.setAttribute('defer', true);
    script.setAttribute('src', src);
    document.head.appendChild(script);
}

/**
 * 加载样式文件
 * @param {string} url 样式地址
 * @param {string} id 样式 ID
 */
window.theme.loadStyle = function (url, id = null) {
    let style = document.createElement('link');
    if (id) style.setAttribute('id', id);
    style.setAttribute('type', 'text/css');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', url);
    document.head.appendChild(style);
}

/**
 * 更新样式文件
 * @param {string} id 样式文件 ID
 * @param {string} href 样式文件地址
 */
window.theme.updateStyle = function (id, href) {
    let style = document.getElementById(id);
    if (style) {
        style.setAttribute('href', href);
    }
    else {
        window.theme.loadStyle(href, id);
    }
}

window.theme.ID_COLOR_STYLE = 'colorStyle';
window.theme.ID_CUSTOM_STYLE = 'customStyle';

/**
 * 获取主题模式
 * @returns {string} light 或 dark
 */
window.theme.themeMode = (() => {
    /* 根据浏览器主题判断颜色模式 */
    // switch (true) {
    //     case window.matchMedia('(prefers-color-scheme: light)').matches:
    //         return 'light';
    //     case window.matchMedia('(prefers-color-scheme: dark)').matches:
    //         return 'dark';
    //     default:
    //         return null;
    // }
    /* 根据配置选项判断主题 */
    switch (window.siyuan.config.appearance.mode) {
        case 0:
            return 'light';
        case 1:
            return 'dark';
        default:
            return null;
    }
})();

/**
 * 获取客户端模式
 * @returns {string} 'app' 或 'desktop' 或 'mobile'
 */
window.theme.clientMode = (() => {
    let url = new URL(window.location.href);
    switch (true) {
        case url.pathname.startsWith('/stage/build/app'):
            return 'app';
        case url.pathname.startsWith('/stage/build/desktop'):
            return 'desktop';
        case url.pathname.startsWith('/stage/build/mobile'):
            return 'mobile';
        default:
            return null;
    }
})();

/**
 * 获取语言模式
 * @returns {string} 'zh_CN', 'zh_CNT', 'fr_FR', 'en_US'
 */
window.theme.languageMode = (() => window.siyuan.config.lang)();

/**
 * 获取操作系统
 */
window.theme.OS = (() => window.siyuan.config.system.os)();

/**
 * 更换主题模式
 * @param {string} lightStyle 浅色主题配置文件路径
 * @param {string} darkStyle 深色主题配置文件路径
 * @param {string} customLightStyle 浅色主题自定义配置文件路径
 * @param {string} customDarkStyle 深色主题自定义配置文件路径
 */
window.theme.changeThemeMode = function (
    lightStyle,
    darkStyle,
    customLightStyle,
    customDarkStyle,
) {
    let href_color = null;
    let href_custom = null;
    switch (window.theme.themeMode) {
        case 'light':
            href_color = lightStyle;
            href_custom = customLightStyle;
            break;
        case 'dark':
        default:
            href_color = darkStyle;
            href_custom = customDarkStyle;
            break;
    }
    window.theme.updateStyle(window.theme.ID_COLOR_STYLE, href_color);
    window.theme.updateStyle(window.theme.ID_CUSTOM_STYLE, href_custom);
}


/* 加载 HTML 块中使用的小工具 */
window.theme.loadScript("/appearance/themes/SyLu/script/module/html.js", "text/javascript");

/* 加载主题功能 */
window.theme.loadScript("/appearance/themes/SyLu/script/module/window.js");