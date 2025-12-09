const SHRINK_DURATION = 50;
export const aimateShrink = async (element, onFinish) => {
    const elementHeight = element.offsetHeight;
    element.animate(
        [
            { maxHeight: `${elementHeight}px`, opacity: 1 },
            { maxHeight: "0px", opacity: 0 },
        ],
        {
            duration: 150 + (SHRINK_DURATION * elementHeight) / 100,
            fill: "forwards",
            easing: "ease-out",
        },

        () => onFinish && onFinish()
    );
};
