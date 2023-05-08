<script setup name="ButtonTool">
import { ref, onMounted, useSlots, computed, inject, isRef } from "vue";
const slots = useSlots();
const button = ref(null);
const emits = defineEmits(["click"]);
const props = defineProps({
  /**是否被选中
   * @param Boolean
   */
  isSelected: { type: Boolean, default: false },
  /**是否禁用
   * @param Boolean
   */
  isDisabled: { type: Boolean, default: false },
  /**按钮的样式
   * @param String
   * 样式："default"||"primary"||"link"||"subtle"||"subtle-link"||"warning"||"danger"||"dashed"||"primary-g"
   */
  appearance: {
    type: String,
    default: "default",
    validator: value =>
      [
        "default",
        "primary",
        "link",
        "subtle",
        "subtle-link",
        "warning",
        "danger",
        "dashed",
        "primary-g"
      ].includes(value)
  },
  /**是否自动聚焦
   * @param Boolean
   */
  autoFocus: { type: Boolean, default: false },
  /**是否为loading状态
   * @param Boolean
   */
  isLoading: { type: Boolean, default: false },
  /**按钮的大小样式
   * @param String
   * 样式："default"||"small"||"larger"||"none"
   */
  spacing: { type: String, default: "default" },
  /**按钮链接
   * @param String
   */
  href: { type: String, default: "" },
  /**打开链接的方式
   * @param String
   */
  target: { type: String, default: "_blank" },
  /**按钮原生type
   * @param String
   */
  type: { type: String, default: "button" },
  /**是否自动填充容器
   * @param Boolean
   */
  shouldFitContainer: { type: Boolean, default: false }
});

const groupAppearance = inject("groupAppearance", undefined); //获取group传的样式

const finalAppearance = computed(() => {
  const finalAppearanceTemp = groupAppearance
    ? groupAppearance.value
    : props.appearance;
  return isRef(finalAppearanceTemp)
    ? finalAppearanceTemp.value
    : finalAppearanceTemp;
});
const iconColors = {
  primary: "#fff",
  link: "#0052cc",
  default: "#505f79",
  subtle: "#505f79",
  "subtle-link": "#505f79",
  warning: "#172b4d",
  danger: "#fff",
  dashed: "#505f79",
  "primary-g": "#fff"
};
const iconColor = computed(() => {
  return props.isDisabled || props.isSelected
    ? "#fff"
    : iconColors[finalAppearance.value];
});

//判断是否只有图标传入
const isOnlyIcon = computed(() => {
  return !!(
    (slots["icon-before"] && !slots.default && !slots["icon-after"]) ||
    (!slots["icon-before"] && !slots.default && slots["icon-after"])
  );
});

//点击事件
function onClickHandler() {
  if (!props.isDisabled) {
    if (props.href) {
      window.open(props.href, props.target);
    }
    emits("click", button.value);
  }
}

onMounted(() => {
  //添加聚焦事件
  if (props.autoFocus) {
    button.value.focus();
  }
});

//计算加载图标的直径和弧度
const dimensions = computed(() => {
  switch (props.spacing) {
    case "small":
      return {
        px: 14,
        radius: 5
      };
    case "none":
      return {
        px: 14,
        radius: 5
      };
    case "larger":
      return {
        px: 30,
        radius: 10
      };
    default:
    case "default":
      return {
        px: 20,
        radius: 8
      };
  }
});

//计算加载图标的半径
const origin = computed(() => {
  return dimensions.value.px / 2;
});

//button大小
const spacingClasses = {
  larger: "h-10 leading-10 min-w-[3rem]",
  default: "h-8 leading-8 min-h-[2rem]",
  small: "h-6 leading-6 min-h-[1.5rem]",
  none: "h-auto leading-[inherit]"
};

//按钮样式
const appearanceClasses = {
  primary:
    "bg-blue-600 text-[#fff] hover:bg-[#0065ff] active:bg-[#0747a6] focus:shadow-button focus:shadow-[#2684FF] focus:bg-opacity-60",
  link: "bg-none text-[#0052cc] hover:text-[#0065ff] hover:underline active:no-underline active:text-[#0747a6] focus:shadow-button focus:shadow-[#2684FF] focus:bg-opacity-60",
  default:
    "bg-gray-100 text-[#505f79] hover:bg-[#efeff2] active:bg-[#B3D4FF] active:bg-opacity-60 active:text-[#0052cc] focus:shadow-button focus:shadow-[#2684FF] focus:bg-opacity-60",
  subtle:
    "bg-none text-[#505f79] hover:bg-[#091E42] hover:bg-opacity-5  active:bg-[#B3D4FF] active:text-[#0052cc] active:bg-opacity-60 focus:shadow-button focus:shadow-[#2684FF] focus:bg-opacity-60",
  "subtle-link":
    "bg-none text-[#505f79] hover:underline hover:bg-[#091E42] hover:text-[#8993a4] hover:bg-opacity-10 active:no-underline active:bg-[#B3D4FF] active:text-[#505f79] focus:shadow-button focus:shadow-[#2684FF] focus:bg-opacity-60",
  warning:
    "bg-orange-400 text-[#172b4d] focus:shadow-[#ff8b00] focus:shadow-button hover:bg-[#ffc400] active:bg-[#ff991f] active:text-[#172b4d]",
  danger:
    "bg-red-500 text-[#fff] focus:shadow-[#ff8f73] focus:shadow-button hover:bg-[#ff5630] active:bg-[#bf2600]",
  dashed:
    "border-dashed border-2 bg-none text-[#505f79] hover:bg-[#091E42] hover:bg-opacity-5 active:bg-[#B3D4FF] active:text-[#0052cc] active:bg-opacity-60 focus:shadow-button focus:shadow-[#2684FF] focus:bg-opacity-60",
  "primary-g":
    "text-[#fff] bg-primary focus:shadow-[#008053] focus:shadow-button hover:bg-[#006f48] active:bg-[#008053]"
};

//spinner颜色
const spinnerClasses = {
  blackSpinnerClass: "text-[#172b4d]",
  whiteSpinnerClass: "text-[#fff]"
};

const appearanceColors = {
  primary: "bg-blue-600", //#0052cc,
  link: "none",
  default: "bg-gray-100", //"#f6f7f8",
  subtle: "none",
  "subtle-link": "none",
  warning: "bg-orange-400", //"#ffab00",
  danger: "bg-red-500", //"#de350b",
  dashed: "none",
  "primary-g": "bg-primary" //"#009a61"
};

const appearanceColor = computed(() => {
  return appearanceColors[finalAppearance.value];
});

//isSelected为true时，各按钮的样式
const selectedClasses = {
  defaultSelectedClass:
    "bg-[#253858] text-[#F4F5F7] no-underline hover:bg-[#253858] hover:text-[#F4F5F7] hover:no-underline active:bg-[#253858] active:text-[#F4F5F7] active:no-underline",
  warning: "bg-[#ff991f] text-[#fff] hover:bg-[#ff991f] hover:text-[#fff]",
  danger: "bg-[#bf2600] text-[#fff] hover:bg-[#bf2600]",
  "primary-g": "bg-[#006f48] text-[#fff] hover:bg-[#006f48]"
};

//获取button的样式
const buttonClasses = computed(() => {
  if (!props.isSelected) {
    return [
      ...(spacingClasses[props.spacing] || "").split(" "),
      ...(appearanceClasses[finalAppearance.value] || "").split(" ")
    ];
  } else {
    const buttonAppearance = ["warning", "danger", "primary-g"].includes(
      finalAppearance.value
    )
      ? finalAppearance.value
      : "defaultSelectedClass";
    return [
      ...(spacingClasses[props.spacing] || "").split(" "),
      ...(selectedClasses[buttonAppearance] || "").split(" ")
    ];
  }
});
//获取loading的spinner的样式
const loadingClasses = computed(() => {
  const spinner = ["primary", "danger", "primary-g"].includes(
    finalAppearance.value
  )
    ? "whiteSpinnerClass"
    : "blackSpinnerClass";
  return [...(spinnerClasses[spinner] || "").split(" ")];
});
</script>

<template>
  <div
    :class="[
      appearanceColor,
      {
        'cursor-not-allowed hover:no-underline hover:border-0 active:shadow-none focus:shadow-none ':
          isDisabled,
        'cursor-pointer': !isDisabled && !props.isLoading,
        'pointer-events-none': props.isLoading,
        'w-full': shouldFitContainer,
        'w-auto': !shouldFitContainer
      }
    ]"
    class="box-border relative inline-block text-[14px] rounded-[3px] items-center not-italic m-0 max-w-full text-center no-underline transition-shadow align-middle whitespace-nowrap outline-none overflow-hidden p-0"
  >
    <button
      ref="button"
      :type="type"
      :class="[
        ...buttonClasses,
        {
          'cursor-not-allowed hover:no-underline hover:border-0 active:shadow-none focus:shadow-none ':
            isDisabled,
          'cursor-pointer': !isDisabled,
          'w-full': shouldFitContainer,
          'w-auto': !shouldFitContainer
        }
      ]"
      @click="onClickHandler"
    >
      <span
        class="_wrapper rounded-[3px] outline-none items-center flex h-full justify-center"
        :class="[
          {
            'bg-[#A5ADBA] text-[#F5F6F8] pointer-events-none': isDisabled,
            'p-0 py-0 ': spacing === 'none',
            'py-1': spacing === 'small' && isOnlyIcon,
            'px-[12px] py-0': ['small', 'larger', 'default'].includes(spacing)
          }
        ]"
        tabindex="-1"
        :icon-is-only-child="isOnlyIcon"
      >
        <div
          v-if="$slots['icon-before']"
          id="icon-before"
          :class="{ 'pl-1': !isOnlyIcon }"
        >
          <slot
            v-if="!isLoading"
            name="icon-before"
            :color="iconColor"
          />
        </div>

        <span
          v-if="slots.default"
          ref="_label"
          class="self-center flex flex-nowrap items-center my-0 mx-[8px] pointer-events-none"
          :class="{ 'opacity-0': isLoading }"
        >
          <slot />
        </span>
        <div
          v-if="$slots['icon-after']"
          id="icon-after"
          :class="!isOnlyIcon ? 'pr-1 ' : ''"
        >
          <slot
            v-if="!isLoading"
            name="icon-after"
            :color="iconColor"
          />
        </div>
      </span>
      <div
        v-if="isLoading"
        role="status"
        class="box-border z-50 flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        :class="loadingClasses"
        :style="{ width: dimensions.px + 'px', height: dimensions.px + 'px' }"
      >
        <svg
          class="absolute top-0 right-0 bottom-0 left-0 animate-spin stroke-current origin-center"
          focusable="false"
          :size="dimensions.px"
          :height="dimensions.px"
          :width="dimensions.px"
          :viewBox="`0 0 ${dimensions.px} ${dimensions.px}`"
          fill="none"
          stroke-linecap="round"
          stroke-dasharray="84px"
          stroke-dashoffset="67.5px"
          stroke-width="3px"
        >
          <circle
            :cx="origin"
            :cy="origin"
            :r="dimensions.radius"
          />
        </svg>
      </div>
    </button>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

span._wrapper #icon-before :deep(svg),
span._wrapper #icon-after :deep(svg) {
  @apply rounded outline-none flex items-center h-5 w-5 justify-center;
}
</style>
