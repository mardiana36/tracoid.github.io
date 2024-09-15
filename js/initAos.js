$(document.body).append(`
    <script src="lib/Animate On Scroll v2.3.2/dist/aos.js"></script>
    <script>
        const checkWidth = () => {
            AOS.init({
                disable: function() {
                    return window.innerWidth <= 1136;
                }
            });
        };

        $(window).resize(checkWidth);
        checkWidth();
    </script>
`);
