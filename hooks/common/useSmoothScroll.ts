type UseSmoothScroll = (
  delay?: number | null,
  behavior?: "auto" | "smooth" | undefined
) => { scrollTo: ScrollTo | null };

type ScrollTo = (ref: React.RefObject<HTMLElement>, offset?: number) => void;

const useSmoothScroll: UseSmoothScroll = (
  delay = null,
  behavior = "smooth"
) => {
  if (typeof window !== "undefined") {
    const scrollTo = (ref: React.RefObject<HTMLElement>, offset?: number) => {
      const element = ref.current;

      if (element != null) {
        window.requestAnimationFrame(() => {
          let offsetTotal = element.offsetTop - (offset ? offset : 0);

          try {
            let bodyRect = document.body.getBoundingClientRect();
            let bodyStyle = window.getComputedStyle(document.body, null);

            // need to handle the padding for the top of the body
            let paddingTop = parseFloat(
              bodyStyle.getPropertyValue("padding-top")
            );

            let elementRect = element.getBoundingClientRect();
            offsetTotal =
              elementRect.top -
              paddingTop -
              bodyRect.top -
              (offset ? offset : 0);
          } catch (err) {
            console.log("oh noes!");
          }

          if (delay) {
            setTimeout(() => {
              window.scrollTo({ top: offsetTotal, left: 0, behavior });
            }, delay);
          } else {
            window.scrollTo({ top: offsetTotal, left: 0, behavior });
          }
        });
      }
    };

    return { scrollTo };
  }

  return { scrollTo: null };
};

export default useSmoothScroll;
