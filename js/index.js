$(function () {
  let alertInProgress = false;
  const alertError = (time, textAlert) => {
    if (alertInProgress) {
      return;
    }
    alertInProgress = true;
    let body = $("body");
    $(".containerAlert").remove();
    let alertElement = `
      <div class='containerAlert'>
        <i class='bx bxs-error iconError'></i>
        <p>${textAlert}</p>
        <i class='bx bx-x closeAlert'></i>
        <div class="timeAlert"></div>
        <div class="timeAlert2"></div>
      </div>`;
    body.prepend(alertElement);
    $(".timeAlert").css({
      width: "100%"
    });
    $(".containerAlert")
      .hide()
      .slideDown(500, function () {
        $(".timeAlert").animate({
          width: "0%"
        }, time, "linear", function () {
          $(".containerAlert").slideUp(500, function () {
            $(this).remove();
            alertInProgress = false;
          });
        });
      });
    $(".closeAlert").on("click", function () {
      $(".timeAlert").stop(true, true);
      $(".containerAlert").slideUp(500, function () {
        $(this).remove();
        alertInProgress = false;
      });
    });
  };

  // navbar
  const dropDownNav = (container, icon) => {
    $(container).hover(function () {
      $(icon).toggleClass("bx-chevron-down bx-chevron-up");
    });
  };
  dropDownNav("#dropDown", "#iconDown");
  dropDownNav("#dropDown2", "#iconDown2");

  //darkmode
  const updateDarkModeUI = (isDarkMode) => {
    let contentOffset = isDarkMode ? "65%" : "0px";
    if ($(window).width() <= 600) {
      contentOffset = isDarkMode ? "28%" : "0px";
    }
    const iconClass = isDarkMode ? "bxs-moon" : "bxs-sun";
    const textColor = isDarkMode ? "#ffffff" : "#478CCF";
    const textPosition = isDarkMode ? "-40px" : "0px";
    const backgroundColor = isDarkMode ? "#1d3751" : "#478bcf34";
    const textContent = isDarkMode ? "Mode Gelap" : "Mode Terang";
    if (isDarkMode) {
      $("body").addClass("bodyDarkmode");
    } else {
      $("body").removeClass("bodyDarkmode");
    }

    $("#contentDarkmode").stop().animate({
      left: contentOffset
    }, 500);
    $("#iconDarkmode").removeClass("bxs-sun bxs-moon").addClass(iconClass);
    $("#textDarkmode")
      .stop()
      .animate({
        left: textPosition
      }, 500)
      .css("color", textColor)
      .text(textContent);
    $("#toggleDarkmode").css("background", backgroundColor);
  };

  const darkMode = () => {
    let isDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    updateDarkModeUI(isDarkMode);
    $("#toggleDarkmode").click(function () {
      isDarkMode = !isDarkMode;
      updateDarkModeUI(isDarkMode);
      localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    });
  };
  $(window).resize(darkMode);
  darkMode();

  const navMobile = (iconNav, containerNav) => {
    const updateInit = () => {
      let icon = $(iconNav);
      let container = $(containerNav);
      let sizeWindow = $(window).width();
      $(icon).removeClass("bx-x").addClass("bx-menu");
      icon.off("click");
      if (sizeWindow <= 1135) {
        container.hide();
        icon.on("click", function () {
          if (!container.is(":visible")) {
            container.slideDown(500);
            icon.remove("bx-x");
            icon.addClass("bx-menu");
          } else {
            container.slideUp(500);
          }
          $(this).toggleClass("bx-menu bx-x");
        });
      } else if (sizeWindow > 1135) {
        if (!container.is(":visible")) {
          container.show();
        }
      }
    };
    $(window).resize(function () {
      updateInit();
    });
    updateInit();
  };
  navMobile("#iconNavResponsif", "#divNavResponsif");

  // autoScroll UP or Down (Home)
  const autoScroll = (contentScroll, item, scrolTo = "left", time) => {
    let content, itemWidth, totalWidth, itemHeight, totalHeight;
    const updateInit = () => {
      content = $(contentScroll);
      itemWidth = content.find(item).outerWidth(true);
      totalWidth = itemWidth * content.find(item).length;
      itemHeight = content.find(item).outerHeight(true);
      totalHeight = itemHeight * content.find(item).length;
      content.append(content.children().clone());
      const animateScroll = () => {
        content
          .stop()
          .animate({
            left: "-=" + itemWidth
          }, time, "linear", () => {
            if (Math.abs(parseFloat(content.css("left"))) >= totalWidth) {
              content.css("left", 0);
            }
            animateScroll();
          });
      };
      const animateScrollUp = () => {
        content
          .stop()
          .animate({
            top: "-=" + itemHeight
          }, time, "linear", () => {
            if (Math.abs(parseFloat(content.css("top"))) >= totalHeight) {
              content.css("top", 0);
            }
            animateScrollUp();
          });
      };
      scrolTo == "left" ? animateScroll() : animateScrollUp();
    };
    $(window).resize(function () {
      content.stop(true, true);
      content
        .children()
        .slice(content.find(item).length / 2)
        .remove();
      updateInit();
    });
    updateInit();
  };
  autoScroll(".contentScrollUp", ".cardScrollUp", "up", 4000);
  autoScroll(".contentScroll", ".item", "left", 2000);
  autoScroll(".textMainDhd23", ".spanTextDhd23", "left", 10000);

  // Testimonial, NewTraining (Home)
  const Slide = (
    contentSlide,
    cardSlide,
    btnLeft,
    btnRight,
    pagination = null,
    loop = false,
    animation = 0,
    contentOutSide = null
  ) => {
    let content = $(contentSlide);
    let card = $(cardSlide);
    let btnL = $(btnLeft);
    let btnR = $(btnRight);
    let cardWidth = Math.round(content.find(card).outerWidth(true));
    let totalWidth = Math.round(cardWidth * content.find(card).length);
    let currentLeft = 0;
    let page = 0;
    let totalPage = content.find(card).length;
    let loopTimeout;
    let mouseHover = $(contentOutSide);

    const updateInit = () => {
      cardWidth = Math.round(content.find(card).outerWidth(true));
      totalWidth = Math.round(cardWidth * content.find(card).length);
      currentLeft = 0;
      page = 0;
      totalPage = content.find(card).length;
      content.css("left", currentLeft);
      paginationScroll(page, totalPage);
    };

    const animationScroll = (animation, animationElement) => {
      if (animation) {
        animationElement.stop().fadeOut(500, function () {
          animationElement.css("left", currentLeft);
          animationElement.stop().fadeIn(500);
        });
      } else {
        animationElement.stop().animate({
          left: currentLeft
        }, 1000, "linear");
      }
    };

    const paginationScroll = (page, totalPage) => {
      if (pagination) {
        let containerPage = $(pagination);
        containerPage.empty();
        let contentPage = $("<div></div>")
          .text("{ " + (page + 1) + "/" + totalPage + " }")
          .addClass("contentPagination");
        containerPage.append(contentPage);
      }
    };

    const scrollContent = (action) => {
      cardWidth = Math.round(content.find(card).outerWidth(true));
      totalWidth = Math.round(cardWidth * content.find(card).length);
      let tranfrom = action == "left" ? +cardWidth : -cardWidth;
      let newLeft = Math.round(currentLeft + tranfrom);
      if (newLeft <= 0 && Math.abs(newLeft) < totalWidth) {
        currentLeft = newLeft;
        animationScroll(animation, content);
        if (action == "left") {
          page = page - 1;
        } else {
          page = page + 1;
        }
        paginationScroll(page, totalPage);
      }
    };

    const looping = () => {
      content.append(content.children().clone());
      const startLoop = () => {
        let newScoll = Math.round(currentLeft - cardWidth);
        currentLeft = newScoll;
        if (Math.abs(newScoll) >= totalWidth) {
          currentLeft = 0;
        }
        animationScroll(animation, content);
        page = page < totalPage - 1 ? page + 1 : 0;
        paginationScroll(page, totalPage);
        loopTimeout = setTimeout(startLoop, 8000);
      };

      const stopLoop = () => {
        clearTimeout(loopTimeout);
      };
      mouseHover
        .mouseenter(function () {
          stopLoop();
        })
        .mouseleave(function () {
          if (loop) {
            startLoop();
          }
        });
      startLoop();
    };

    $(window).resize(function () {
      updateInit();
    });

    if (loop) {
      looping();
    }

    btnL.click(() => scrollContent("left"));
    btnR.click(() => scrollContent("right"));
  };
  Slide(".contentSlide", ".cardSlide", ".buttonLeftSlide", ".buttonRightSlide");
  Slide(
    ".contentTestimonial",
    ".cardTestimonial",
    ".btnLeftTestimonial",
    ".btnRightTestimonial",
    ".paginationTestimonial",
    true,
    1,
    ".contentMain7"
  );

  // section excess tracoid (Home)
  const dropCategory = (btn, sub, icon, img = null) => {
    let button = $(btn);
    let subcategory = $(sub);
    let iconDrop = $(icon);
    subcategory.hide();

    const changeImg = (image, index) => {
      $(image).fadeOut(500, function () {
        if (index == 1) {
          $(image).attr("src", "assets/instruktur.png");
        } else if (index == 2) {
          $(image).attr("src", "assets/learning.png");
        } else if (index == 3) {
          $(image).attr("src", "assets/effectiveLearning.png");
        } else if (index == 4) {
          $(image).attr("src", "assets/HelpingPartner.png");
        } else {
          $(image).attr("src", "assets/upToDate.png");
        }
        $(image).fadeIn(500);
      });
    };

    subcategory
      .eq(0)
      .slideDown(500)
      .closest("li")
      .find(icon)
      .removeClass("bxs-chevron-down")
      .addClass("bxs-chevron-up");
    button.each(function (index) {
      $(this).click(function () {
        subcategory.slideUp(500);
        iconDrop.removeClass("bxs-chevron-up").addClass("bxs-chevron-down");
        let targetSub = $(this).closest("li").find(sub);
        if (targetSub.is(":visible")) {
          targetSub.slideUp(500);
        } else {
          targetSub.slideDown(500);
          if (img != null) {
            changeImg(img, index);
          }
          $(this).find(icon).toggleClass("bxs-chevron-down bxs-chevron-up");
        }
      });
    });
  };
  dropCategory(
    ".btnShowHideDropList",
    ".showHideDropList",
    ".iconDropList",
    ".imgDropList"
  );

  // Login, regis, token
  const inputLogin = ({
    inputs,
    cIcon
  }) => {
    const setupInput = (inputSelector, cIconSelector) => {
      let input = $(inputSelector);
      let icon = input.closest("div").find(cIconSelector + " i");

      icon.on("click", function () {
        input.focus();
        if (input.attr("key") == "password") {
          if ($(input).attr("type") == "password") {
            $(input).attr("type", "text");
          } else {
            $(input).attr("type", "password");
          }
          $(this).toggleClass("bxs-lock bxs-lock-open");
        }
      });

      input.on("focus", function () {
        let getLabel = $(`label[for="${input.attr("id")}"]`);
        if (getLabel.length > 0) {
          getLabel.stop().animate({
            bottom: -5
          }, function () {
            $(this).addClass("addFocus");
          });
        }
      });

      input.on("focusout", function () {
        let getLabel = $(`label[for="${input.attr("id")}"]`);
        if ($(this).val().length == 0) {
          getLabel.stop().animate({
            bottom: -36
          }, function () {
            $(this).removeClass("addFocus");
          });
        }
      });
    };

    inputs.forEach((input) => {
      setupInput(input, cIcon);
    });
  };
  inputLogin({
    inputs: [
      "#emailRegis",
      "#passwordRegis",
      "#userName",
      "#emailLogin",
      "#passwordLogin",
      "#token",
    ],
    cIcon: ".divIconLogin",
  });

  // regis, login
  const checkStatusPassword = (containerPw, inputPw, form) => {
    let container = $(containerPw);
    let input = $(inputPw);
    let fromPw = $(form);
    let allContentP = $(containerPw + " div p");

    allContentP.hide();
    input.focus(function () {
      container.stop().animate({
        bottom: "-15px"
      }, 600, "linear");
    });
    $(input).focusout(function () {
      container.stop().animate({
        bottom: "40px"
      }, 600, "linear");
    });

    input.on("input", function () {
      let valueInput = $(this).val();
      const hasNumber = /\d/.test(valueInput);
      const hasUppercase = /[A-Z]/.test(valueInput);
      const hasLowercase = /[a-z]/.test(valueInput);
      const hasSymbol = /[^\w\s]/.test(valueInput);

      let targetIndex;
      if (
        valueInput.length >= 8 &&
        hasLowercase &&
        hasNumber &&
        hasSymbol &&
        hasUppercase
      ) {
        targetIndex = 3;
      } else if (
        valueInput.length >= 8 &&
        hasLowercase &&
        hasNumber &&
        hasUppercase
      ) {
        targetIndex = 2;
      } else if (valueInput.length >= 8 && hasLowercase && hasNumber) {
        targetIndex = 1;
      } else {
        targetIndex = 0;
      }
      if (
        !allContentP.eq(targetIndex).is(":visible") &&
        valueInput.length != 0
      ) {
        allContentP.slideUp(500);
        allContentP.closest("div").css({
          backgroundColor: "#ffffff68"
        });
        allContentP
          .eq(targetIndex)
          .closest("div")
          .css({
            backgroundColor: "#ffffff"
          });
        allContentP.eq(targetIndex).slideDown(500);
      } else if (valueInput.length == 0) {
        allContentP.closest("div").css({
          backgroundColor: "#ffffff68"
        });
        allContentP.slideUp(500);
      }
    });

    fromPw.submit(function (e) {
      let finallValue = input.val();
      let hasNumber = /\d/.test(finallValue);
      let hasLowercase = /[a-z]/.test(finallValue);
      if (finallValue.length < 8 || !hasLowercase || !hasNumber) {
        e.preventDefault();
        alertError(
          10000,
          "Password minimal terdiri dari huruf kecil, angka, dan 8 karakter!"
        );
      }
    });
  };
  checkStatusPassword("#checkPassword", ".statusActive", ".formRegis");

  // navTraining
  const ScrollLeftT = (containerScr, btnLeft, btnRight) => {
    let container = $(containerScr);
    let btnL = $(btnLeft);
    let btnR = $(btnRight);
    const updateInit = () => {
      let currentScroll = 0;
      let scrollWidth =
        container.length != 0 ? container.get(0).scrollWidth : 0;
      let widthContainer =
        container.length != 0 ? Math.round(container.get(0).clientWidth) : 0;
      let maxScroll = Math.round(scrollWidth - widthContainer);
      btnL.hide();
      container.scrollLeft(0);

      let cekPositionScroll = () => {
        if (currentScroll <= 0) {
          currentScroll = 0;
          btnL.hide();
        } else {
          btnL.show();
        }
        if (currentScroll >= maxScroll) {
          currentScroll = maxScroll;
          btnR.hide();
        } else {
          btnR.show();
        }
      };
      let goScroll = (action) => {
        let scrollTo = action == "left" ? -widthContainer : +widthContainer;
        currentScroll += scrollTo;
        cekPositionScroll();
        container.stop().animate({
          scrollLeft: currentScroll
        }, 500, "linear");
      };
      btnL.click(() => goScroll("left"));
      btnR.click(() => goScroll("right"));
      container.on("scroll", function () {
        currentScroll = Math.round($(this).scrollLeft());
        cekPositionScroll();
      });
    };
    $(window).resize(function () {
      container.stop(true, true);
      updateInit();
    });
    updateInit();
  };
  ScrollLeftT(".containerSlideT", ".btnLeftT", ".btnRightT");

  // detailTraining
  const showMore = (element, button) => {
    let elementShow = $(element);
    let btn = $(button);

    btn.on("click", function () {
      if (elementShow.css("-webkit-box-orient") == "vertical") {
        elementShow.css("-webkit-box-orient", "unset");
        btn.find("span").text("Lebih sedikit");
      } else {
        elementShow.css("-webkit-box-orient", "vertical");
        btn.find("span").text("Selengkapnya");
      }
      btn.find("i").toggleClass("bxs-chevron-down bxs-chevron-up");
    });
  };
  showMore(".pDescriptionDT2", ".btnShowMoreDT2");

  const dropDownSyllabus = (contentSyllabus, subContentSyllabus, iconDrop) => {
    let content = $(contentSyllabus);
    let subContent = $(subContentSyllabus);
    subContent.hide();
    content.each(function () {
      $(this).on("click", function () {
        let targetSub = $(this).find(subContentSyllabus);
        if (!targetSub.is(":visible")) {
          targetSub.slideDown(500);
        } else {
          targetSub.slideUp(500);
        }
        $(this).find(iconDrop).toggleClass("bx-chevron-down bx-chevron-up");
      });
    });
  };
  dropDownSyllabus(".contentDropDT2", ".UlSubCategoryDT2", ".iconDropDT");

  const navDT = (linkNav, classSection) => {
    let link = $(linkNav);
    let section = $(classSection);
    const updateScroll = () => {
      let positionScrollTop = $(window).scrollTop();
      let windowHeight = $(window).height();
      section.each(function () {
        let topSection = $(this).offset().top;
        let bottomSection = topSection + $(this).outerHeight();
        if (
          positionScrollTop + windowHeight > topSection &&
          positionScrollTop < bottomSection
        ) {
          let idSection = $(this).attr("id");
          link.removeClass("activeDT2");
          $(linkNav + `[href="#${idSection}"]`).addClass("activeDT2");
        }
      });
      link.on("click", function (e) {
        e.preventDefault();
        let href = $(this).attr("href").replace("#", "");
        let target = section.filter(function () {
          return $(this).attr("id") === href;
        });
        console.log(target);
        console.log(href);
        if (target.length) {
          $("html")
            .stop()
            .animate({
              scrollTop: target.offset().top - windowHeight + 250
            },
              500
            );
        }
      });
    };
    $(window).on("scroll", updateScroll);
    updateScroll();
  };
  navDT(".navLinkTD2", ".sectionDiv");

  // Sidbar Academy
  const sidebarLearn = (
    containerSidebar,
    iconSize,
    iconSidebar,
    logoSidebar
  ) => {
    const updateInit = () => {
      let container = $(containerSidebar);
      let icon1 = $(iconSize);
      let icon2 = $(iconSidebar);
      let logo = $(logoSidebar);
      let smallSidebar = 120;
      let bigSidebar = 250;
      if ($(window).width() <= 600) {
        smallSidebar = 60;
        bigSidebar = 200;
        logo.fadeOut(300, function () {
          icon2.closest("a").find("span").fadeOut(300);
          container.stop().animate({
            minWidth: smallSidebar
          }, 500);
          icon1.removeClass("bxs-chevrons-left").addClass("bxs-chevrons-right");
        });
      } else {
        container.stop().animate({
          minWidth: bigSidebar
        }, 500, function () {
          logo.fadeIn(300);
          icon2.closest("a").find("span").fadeIn(300);
          icon1.removeClass("bxs-chevrons-right").addClass("bxs-chevrons-left");
        });
      }
      icon1.on("click", function () {
        if (logo.is(":visible")) {
          logo.fadeOut(300, function () {
            icon2.closest("a").find("span").fadeOut(300);
            container.stop().animate({
              minWidth: smallSidebar
            }, 500);
            icon1
              .removeClass("bxs-chevrons-left")
              .addClass("bxs-chevrons-right");
          });
        } else {
          container.stop().animate({
            minWidth: bigSidebar
          }, 500, function () {
            logo.fadeIn(300);
            icon2.closest("a").find("span").fadeIn(300);
            icon1
              .removeClass("bxs-chevrons-right")
              .addClass("bxs-chevrons-left");
          });
        }
      });
    };
    $(window).resize(function () {
      updateInit();
    });
    updateInit();
  };
  sidebarLearn(
    ".containerSidebar",
    ".iconSidebarSize",
    ".iconSidebar",
    ".logoSideBar"
  );

  // learning
  const menuLearningProgress = (button1, button2, contentBtn1, contentBtn2) => {
    let btn1 = $(button1);
    let btn2 = $(button2);
    let content1 = $(contentBtn1);
    let content2 = $(contentBtn2);
    content2.hide();
    btn1.on("click", function () {
      content1.fadeIn(500);
      content2.hide();
      $(this).addClass("activeBtn1");
      btn2.removeClass("activeBtn1");
    });
    btn2.on("click", function () {
      content2.fadeIn(500);
      content1.hide();
      $(this).addClass("activeBtn1");
      btn1.removeClass("activeBtn1");
    });
  };
  menuLearningProgress(".btn1", ".btn2", ".contentButton1", ".contentButton2");

  const customRange = (range) => {
    let rg = $(range);
    rg.each(function () {
      let totalRange = $(this).next().text();
      $(this).css({
        width: totalRange
      });
      if (totalRange == "100%") {
        $(this)
          .next()
          .css({
            backgroundColor: "var(--Blue)",
            color: "var(--white)"
          });
      }
    });
  };
  customRange(".range");

  // SubsFee
  const customSelect = (Einput, containerCheckbox) => {
    let input = $(Einput);
    let container = $(containerCheckbox);
    let checkbox = container.children().find("input");
    let icon = input.prev();
    let valueCheckboxs = [];
    icon.hide();
    checkbox.each(function () {
      $(this).on("change", function () {
        if ($(this).is(":checked")) {
          if (!valueCheckboxs.includes($(this).val())) {
            valueCheckboxs.push($(this).val());
          }
          input.val(valueCheckboxs.join(", "));
          icon.show();
        } else {
          let valueUnchecked = $(this).val();
          valueCheckboxs = valueCheckboxs.filter(function (value) {
            return value != valueUnchecked;
          });
          input.val(valueCheckboxs.join(", "));
          if (input.val() === "") {
            icon.hide();
          }
        }
      });
    });
    icon.on("click", function () {
      input.val("");
      valueCheckboxs = [];
      checkbox.each(function () {
        $(this).prop("checked", false);
      });
      icon.hide();
    });
  };
  customSelect("#allTTech", ".checkboxAllTTech");
  customSelect("#allTLevel", ".checkboxAllTLevel");

  // exampleLogin
  const exampleWhenLogin = (btnSubmit, btnlogout, navLogin, navLogout) => {
    let login = JSON.parse(localStorage.getItem("login")) || false;
    $(btnSubmit).on("click", function (e) {
      e.preventDefault();
      login = true;
      localStorage.setItem("login", JSON.stringify(login));
      window.location.href = "../index.html";
    });
    $(btnlogout).on("click", function (e) {
      e.preventDefault();
      login = false;
      localStorage.setItem("login", JSON.stringify(login));
      window.location.href = "../index.html";
    });

    if (login) {
      $(navLogin).show();
      $(navLogout).hide();
    } else {
      $(navLogin).hide();
      $(navLogout).show();
    }
  };
  exampleWhenLogin("#btnSubmit", "#logout", ".onLogin", ".onLogout");
});
