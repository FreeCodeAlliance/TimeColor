
const brandPrimary = '#32CDFF';
const brandHighlight = '#FFBE45';
const brandWarning = '#FF6F7F';

const IS_TABLET = true;
const sceneScale = 1.0;

const theme = {

    // 常用属性
    fill_base: '#FFFFFF',
    fill_normal: '#F8F8F8',
    sep_line_color: '#EEEEEE',
    opacity_active: 0.8,

    radius_normal: Math.round(sceneScale * 10),
    radius_small: Math.round(sceneScale * 4),

    // 字体大小
    font_size_nav: 16,
    font_size_nav_text: 16,
    font_size_title: IS_TABLET ? Math.round(sceneScale * 20) : Math.round(sceneScale * 18),
    font_size_xlarge: IS_TABLET ? Math.round(sceneScale * 24) : Math.round(sceneScale * 22),
    font_size_large: IS_TABLET ? Math.round(sceneScale * 18) : Math.round(sceneScale * 16),
    font_size_normal: IS_TABLET ? Math.round(sceneScale * 16) : Math.round(sceneScale * 14),
    font_size_small: IS_TABLET ? Math.round(sceneScale * 14) : Math.round(sceneScale * 12),

    line_height_large: IS_TABLET ? Math.round(sceneScale * 32) : Math.round(sceneScale * 28),
    line_height_normal: IS_TABLET ? Math.round(sceneScale * 28) : Math.round(sceneScale * 24),
    line_height_small: IS_TABLET ? Math.round(sceneScale * 24) : Math.round(sceneScale * 20),

    // 字体加粗
    font_weight_normal: '500',
    font_weight_small: '100',

    // 字体颜色
    text_color_inverse: '#FFFFFF',
    text_color_strong: '#4b4f57',
    text_color_normal: '#676b75',
    text_color_weak: '#CDD0D7',
    text_color_primary: brandPrimary,
    text_color_warning: brandWarning,

    // 按钮属性
    button_bg_inverse: '#FFFFFF',
    button_bg_primary: brandPrimary,
    button_bg_highlight: brandHighlight,
    button_bg_disabled: '#E1E2E3',
    button_height: 50,
    button_height_small: 28,

    // 间距
    space_large: Math.round(sceneScale * 28),
    space_normal: Math.round(sceneScale * 20),
    space_small: Math.round(sceneScale * 10),

    // border
    border_width_sm: sceneScale,
    border_width_md: sceneScale * 2,
    border_color: '#EEEEEE',

    // 左右间距
    space_page: IS_TABLET ? Math.round(sceneScale * 135) : Math.round(sceneScale * 20),

    // status_bar
    status_bar_height: 0,

    // nav_bar
    nav_bar_height: 44,
    nav_icon_width: 40,
    nav_icon_color: '#B7BCBD',

    // tab bar
    tab_bar_height: 52,
    tab_bar_height_tablet: sceneScale * 100,

    // lesson list
    lesson_item_width_pad: sceneScale * 146,
    lesson_chapter_button_width: sceneScale * 144,

    // appointment page
    appointment_page_height: sceneScale * 254,

    // test
    test_nav_bar_height: 55,

    test_radius: Math.round(sceneScale * 8),

    test_text_option_height: IS_TABLET ? sceneScale * 72 : sceneScale * 44,

    test_fontSize_sentence: IS_TABLET ? sceneScale * 22 : sceneScale * 16,
    test_fontSize_answer_title: IS_TABLET ? sceneScale * 30 : sceneScale * 24,
    test_fontSize_xl: IS_TABLET ? sceneScale * 24 : sceneScale * 18,
    test_fontSize_large: IS_TABLET ? sceneScale * 22 : sceneScale * 16,
    test_fontSize_normal: IS_TABLET ? sceneScale * 20 : sceneScale * 14,
    test_fontSize_small: sceneScale * 12,

    // 间距
    test_space_xl: IS_TABLET ? Math.round(sceneScale * 38) : Math.round(sceneScale * 32),
    test_space_large: IS_TABLET ? Math.round(sceneScale * 32) : Math.round(sceneScale * 24),
    test_space_normal: IS_TABLET ? Math.round(sceneScale * 24) : Math.round(sceneScale * 16),
    test_space_small: IS_TABLET ? Math.round(sceneScale * 16) : Math.round(sceneScale * 8),
    test_space_border: IS_TABLET ? Math.round(sceneScale * 30) : Math.round(sceneScale * 20),

    test_catalogue_background_color: brandPrimary,
    test_border_color: '#CACACA',
    test_border_width: sceneScale,
    test_brand_primary: brandPrimary,
    test_background_color: '#F1F1F1',
    test_color_correct: '#8BD466',
    test_color_wrong: '#FF6F7F',
    test_button_color_normal: '#F1F1F1',
    test_button_border_color_select: brandPrimary,
    test_button_color_select: '#DDF7FF',

    test_text_color_normal: '#5F5F5F',
    test_text_color_inverse: '#FFFFFF',

    test_bar_height: IS_TABLET ? sceneScale * 60 : sceneScale * 52,
    test_bar_point_radius: IS_TABLET ? Math.round(sceneScale * 5) : Math.round(sceneScale * 3),
    test_bar_color_normal: '#E1E2E3',
    test_bar_color_correct: '#32CDFF',
    test_bar_color_wrong: '#FF6F7F',

    test_subject_background_color: 'rgba(28, 44, 64, .6)',
    test_subject_fontSize: IS_TABLET ? sceneScale * 22 : sceneScale * 20,

    test_word_item_radius: IS_TABLET ? Math.round(sceneScale * 5) : Math.round(sceneScale * 4),

    test_web_media_width: 1650,
};

export default theme;
