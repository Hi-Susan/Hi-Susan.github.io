// 監聽頁面載入完成事件
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('horizontal-scroll-wrapper');
  const stickySection = document.getElementById('horizontal-scroll');
  const content = document.getElementById('scroll-content');

  if (!wrapper || !stickySection || !content) {
    // 如果頁面上沒有這些元素，就提前終止
    return;
  }

  // --- 核心功能：動態設定高度並監聽滾動 ---

  function setWrapperHeight() {
    // 1. 計算內容的總寬度
    const contentWidth = content.scrollWidth;
    // 2. 將內容寬度設定為 Wrapper 的高度
    // 這創造了一個 1:1 的滾動映射基礎
    wrapper.style.height = `${contentWidth}px`;
  }

  function handleScroll() {
    // 計算 Wrapper 區塊的起始位置
    const wrapperTop = wrapper.offsetTop;
    // 計算總共可以滾動的行程 (Wrapper 的高度減去一個視窗的高度)
    // 這裡的 scrollableDistance 會約等於橫向內容可以移動的距離
    const scrollableDistance = wrapper.offsetHeight - window.innerHeight;

    // 只有當前滾動位置在 Wrapper 區塊內時，才執行計��
    
    if (window.scrollY >= wrapperTop && window.scrollY <= (wrapperTop + scrollableDistance)) {
      // 計算在 Wrapper 內的滾動進度 (0.0 to 1.0)
      const scrollProgress = (window.scrollY - wrapperTop) / scrollableDistance;

      // 計算內容需要橫向移動的總距離
      const maxScrollLeft = content.scrollWidth - 1280;

      // 將滾動進度應用到橫向位移上
      const newTransformX = -scrollProgress * maxScrollLeft;

      console.log(content.scrollWidth, content.offsetWidth)

      // 使用 transform 來移動內容
      content.style.transform = `translateX(${newTransformX}px)`;
    }
  }

  // --- 初始化與事件綁定 ---

  // 首次載入時，設定 Wrapper 的高度
  setWrapperHeight();
  // 首次載入時，也執行一次滾動計算，以防頁面載入時不在頂部
  handleScroll();

  // 監聽整個視窗的滾動事件
  window.addEventListener('scroll', handleScroll);

  // 當視窗尺寸改變時，重新計算 Wrapper 的高度
  // 使用 debounce 技巧防止 resize 事件過於頻繁觸發，提升效能
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setWrapperHeight, 100);
  });
});
