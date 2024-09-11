import { onBeforeUnmount, onMounted } from "vue";

export function getPageScrollHeight() {
  return document.documentElement.scrollHeight;
}

export function getPageScrollTop() {
  return document.documentElement.scrollTop;
}

export function getPageClientHeight() {
  return document.documentElement.clientHeight;
}

export function isPageScrollAtBottom() {
  const pageHeight = getPageScrollHeight();
  const pageCurrentScroll = getPageScrollTop() + getPageClientHeight();
  const modifier = 200;
  return pageCurrentScroll + modifier > pageHeight;
}

export function handlePageScrollAtBottom(callback: () => void) {
  const onScroll = () => {
    if (isPageScrollAtBottom()) {
      callback();
    }
  };
  onMounted(() => {
    document.addEventListener("scroll", onScroll, { passive: true });
  });
  onBeforeUnmount(() => {
    document.removeEventListener("scroll", onScroll);
  });
}
